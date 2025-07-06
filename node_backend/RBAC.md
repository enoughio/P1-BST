# BST Backend - Role-Based Access Control (RBAC) Documentation

## Overview

This document outlines the comprehensive Role-Based Access Control (RBAC) implementation in the BST Node.js backend. The system ensures that users can only access resources and perform actions appropriate to their role.

## User Roles

### 1. Member (Level 1)
- **Description**: Basic authenticated club members
- **Access Level**: Limited to own resources and public data
- **Typical Users**: Club members, participants

### 2. Admin (Level 2) 
- **Description**: Club administrators with management capabilities
- **Access Level**: Can manage club resources and members
- **Typical Users**: Club presidents, secretaries, coordinators

### 3. SuperAdmin (Level 3)
- **Description**: System administrators with full access
- **Access Level**: Complete system access and user management
- **Typical Users**: System administrators, platform managers

## RBAC Implementation

### Middleware Functions

#### `auth` - Base Authentication
- **Purpose**: Validates JWT token and loads user data
- **Usage**: Required on all protected routes
- **Adds**: `req.user` with role and permissions

#### `memberAuth` - Member Access
- **Purpose**: Ensures user is authenticated member
- **Usage**: Routes requiring basic member access
- **Minimum Role**: Member

#### `adminAuth` - Admin Access  
- **Purpose**: Restricts access to admins and superadmins
- **Usage**: Management routes, CRUD operations
- **Minimum Role**: Admin

#### `superAdminAuth` - SuperAdmin Access
- **Purpose**: Restricts access to superadmins only
- **Usage**: System-level operations, user management
- **Minimum Role**: SuperAdmin

#### `roleAuth([roles])` - Multiple Role Access
- **Purpose**: Allows multiple specific roles
- **Usage**: Routes with flexible access requirements
- **Example**: `roleAuth([USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN])`

#### `ownerOrAdminAuth()` - Resource Ownership
- **Purpose**: User can access own resources OR admin can access any
- **Usage**: Profile updates, personal data access
- **Logic**: Owner access OR admin/superadmin access

#### `clubMemberAuth` - Club Membership
- **Purpose**: User must belong to same club OR be admin
- **Usage**: Club-specific resources and meetings
- **Logic**: Same club membership OR admin/superadmin access

## Route Protection Details

### Authentication Routes (`/api/auth`)
| Endpoint | Method | Protection | Allowed Roles | Notes |
|----------|--------|------------|---------------|-------|
| `/login` | POST | None | Public | Public login |
| `/logout` | POST | `auth` | All authenticated | Token invalidation |
| `/me` | GET | `auth` | All authenticated | User profile |
| `/members/create` | POST | None | Public | Member registration |
| `/admins/create` | POST | `auth + superAdminAuth` | SuperAdmin | Admin creation |
| `/change-password` | PUT | `auth` | All authenticated | Password change |

### User Management (`/api/users`)
| Endpoint | Method | Protection | Allowed Roles | Notes |
|----------|--------|------------|---------------|-------|
| `/` | GET | `auth + adminAuth` | Admin, SuperAdmin | List all users |
| `/:id` | GET | `auth + ownerOrAdminAuth` | Owner, Admin, SuperAdmin | View user profile |
| `/:id` | PUT | `auth + ownerOrAdminAuth` | Owner, Admin, SuperAdmin | Update user profile |
| `/:id` | DELETE | `auth + superAdminAuth` | SuperAdmin | Delete user |

### Club Management (`/api/bst/clubs`)
| Endpoint | Method | Protection | Allowed Roles | Notes |
|----------|--------|------------|---------------|-------|
| `/` | GET | `auth` | All authenticated | List clubs |
| `/:id` | GET | `auth` | All authenticated | Club details |
| `/` | POST | `auth + adminAuth` | Admin, SuperAdmin | Create club |
| `/:id` | PUT | `auth + adminAuth` | Admin, SuperAdmin | Update club |
| `/:id` | DELETE | `auth + superAdminAuth` | SuperAdmin | Delete club |

### Member Management (`/api/bst/members`)
| Endpoint | Method | Protection | Allowed Roles | Notes |
|----------|--------|------------|---------------|-------|
| `/` | GET | `auth + roleAuth([ADMIN, SUPER_ADMIN])` | Admin, SuperAdmin | List members |
| `/:id` | GET | `auth + ownerOrAdminAuth` | Owner, Admin, SuperAdmin | Member details |
| `/dashboard` | GET | `auth` | All authenticated | Own dashboard |
| `/:id` | PUT | `auth + ownerOrAdminAuth` | Owner, Admin, SuperAdmin | Update member |
| `/request-removal` | POST | `auth` | All authenticated | Request removal |
| `/request-removal/:id` | PUT | `auth + adminAuth` | Admin, SuperAdmin | Handle removal request |

### Event Management (`/api/bst/events`)
| Endpoint | Method | Protection | Allowed Roles | Notes |
|----------|--------|------------|---------------|-------|
| `/` | GET | `auth` | All authenticated | List events |
| `/:id` | GET | `auth` | All authenticated | Event details |
| `/` | POST | `auth + adminAuth` | Admin, SuperAdmin | Create event |
| `/:id` | PUT | `auth + adminAuth` | Admin, SuperAdmin | Update event |
| `/:id` | DELETE | `auth + adminAuth` | Admin, SuperAdmin | Delete event |
| `/:id/register` | POST | `auth` | All authenticated | Register for event |
| `/:id/register` | DELETE | `auth` | All authenticated | Cancel registration |

### Meeting Management (`/api/bst/meetings`)
| Endpoint | Method | Protection | Allowed Roles | Notes |
|----------|--------|------------|---------------|-------|
| `/` | GET | `auth` | All authenticated | List meetings |
| `/:id` | GET | `auth` | All authenticated | Meeting details |
| `/` | POST | `auth + adminAuth` | Admin, SuperAdmin | Create meeting |
| `/:id` | PUT | `auth + adminAuth` | Admin, SuperAdmin | Update meeting |
| `/:id` | DELETE | `auth + adminAuth` | Admin, SuperAdmin | Delete meeting |
| `/:id/attendance` | POST | `auth` | All authenticated | Mark attendance |

### Project Management (`/api/bst/projects`)
| Endpoint | Method | Protection | Allowed Roles | Notes |
|----------|--------|------------|---------------|-------|
| `/` | GET | `auth` | All authenticated | List projects |
| `/:id` | GET | `auth` | All authenticated | Project details |
| `/` | POST | `auth + adminAuth` | Admin, SuperAdmin | Create project |
| `/:id` | PUT | `auth + adminAuth` | Admin, SuperAdmin | Update project |
| `/:id` | DELETE | `auth + adminAuth` | Admin, SuperAdmin | Delete project |
| `/:id/assign` | POST | `auth + adminAuth` | Admin, SuperAdmin | Assign member |
| `/:id/assign/:memberId` | DELETE | `auth + adminAuth` | Admin, SuperAdmin | Remove assignment |

### Award Management (`/api/bst/awards`)
| Endpoint | Method | Protection | Allowed Roles | Notes |
|----------|--------|------------|---------------|-------|
| `/` | GET | `auth` | All authenticated | List awards |
| `/:id` | GET | `auth` | All authenticated | Award details |
| `/` | POST | `auth + adminAuth` | Admin, SuperAdmin | Create award |
| `/:id` | PUT | `auth + adminAuth` | Admin, SuperAdmin | Update award |
| `/:id` | DELETE | `auth + adminAuth` | Admin, SuperAdmin | Delete award |
| `/assign` | POST | `auth + adminAuth` | Admin, SuperAdmin | Assign award |

### Initiative Management (`/api/bst/initiatives`)
| Endpoint | Method | Protection | Allowed Roles | Notes |
|----------|--------|------------|---------------|-------|
| `/` | GET | `auth` | All authenticated | List initiatives |
| `/:id` | GET | `auth` | All authenticated | Initiative details |
| `/` | POST | `auth + adminAuth` | Admin, SuperAdmin | Create initiative |
| `/:id` | PUT | `auth + adminAuth` | Admin, SuperAdmin | Update initiative |
| `/:id` | DELETE | `auth + adminAuth` | Admin, SuperAdmin | Delete initiative |

### Membership Management (`/api/bst/membership`)
| Endpoint | Method | Protection | Allowed Roles | Notes |
|----------|--------|------------|---------------|-------|
| `/` | GET | `auth` | All authenticated | List memberships |
| `/:id` | GET | `auth` | All authenticated | Membership details |
| `/` | POST | `auth + adminAuth` | Admin, SuperAdmin | Create membership |
| `/:id` | PUT | `auth + adminAuth` | Admin, SuperAdmin | Update membership |
| `/:id` | DELETE | `auth + adminAuth` | Admin, SuperAdmin | Delete membership |
| `/assign` | POST | `auth + adminAuth` | Admin, SuperAdmin | Assign membership |

### Executive Committee (`/api/bst/executive-committee`)
| Endpoint | Method | Protection | Allowed Roles | Notes |
|----------|--------|------------|---------------|-------|
| `/` | GET | `auth` | All authenticated | List executive members |
| `/:id` | GET | `auth` | All authenticated | Executive member details |
| `/` | POST | `auth + adminAuth` | Admin, SuperAdmin | Add to committee |
| `/:id` | PUT | `auth + adminAuth` | Admin, SuperAdmin | Update executive member |
| `/:id` | DELETE | `auth + adminAuth` | Admin, SuperAdmin | Remove from committee |
| `/club/:clubId` | GET | `auth` | All authenticated | Club executive committee |
| `/history/:memberId` | GET | `auth` | All authenticated | Executive history |
| `/transfer/:id` | POST | `auth + superAdminAuth` | SuperAdmin | Transfer role |

### Payment Management (`/api/payments`)
| Endpoint | Method | Protection | Allowed Roles | Notes |
|----------|--------|------------|---------------|-------|
| `/` | GET | `auth + adminAuth` | Admin, SuperAdmin | List all payments |
| `/:id` | GET | `auth + adminAuth` | Admin, SuperAdmin | Payment details |
| `/` | POST | `auth` | All authenticated | Create payment |
| `/:id` | PUT | `auth + adminAuth` | Admin, SuperAdmin | Update payment |
| `/user/:userId` | GET | `auth + ownerOrAdminAuth` | Owner, Admin, SuperAdmin | User payments |

### Razorpay Integration (`/api/razorpay`)
| Endpoint | Method | Protection | Allowed Roles | Notes |
|----------|--------|------------|---------------|-------|
| `/order/create` | POST | `auth` | All authenticated | Create order |
| `/order/complete` | POST | `auth` | All authenticated | Complete payment |
| `/webhook` | POST | None | Public | Webhook handler |
| `/payment/:paymentId` | GET | `auth + adminAuth` | Admin, SuperAdmin | Payment details |
| `/refund` | POST | `auth + superAdminAuth` | SuperAdmin | Process refund |

## Permission Matrix

### Member Permissions
```javascript
{
  canRead: true,
  canWrite: false,
  canDelete: false,
  canManageUsers: false,
  canManageClubs: false,
  canManageMembers: false,
  canManagePayments: false,
  canManageExecutiveCommittee: false
}
```

### Admin Permissions
```javascript
{
  canRead: true,
  canWrite: true,
  canDelete: true,
  canManageUsers: false,
  canManageClubs: true,
  canManageMembers: true,
  canManagePayments: true,
  canManageExecutiveCommittee: true
}
```

### SuperAdmin Permissions
```javascript
{
  canRead: true,
  canWrite: true,
  canDelete: true,
  canManageUsers: true,
  canManageClubs: true,
  canManageMembers: true,
  canManagePayments: true,
  canManageExecutiveCommittee: true
}
```

## Security Considerations

### JWT Token Security
- Tokens expire after 30 days
- Include user ID and role information
- Validated on every protected request
- Stored securely by client (HttpOnly cookies recommended)

### Role Validation
- Roles determined from database relationships
- Hierarchical permission system (SuperAdmin > Admin > Member)
- Real-time role checking on each request
- No role caching to prevent privilege escalation

### Resource Protection
- Ownership validation for personal resources
- Club membership validation for club resources
- Admin override for management operations
- Audit trail for sensitive operations

### Error Handling
- Consistent error responses for unauthorized access
- No information leakage in error messages
- Proper HTTP status codes (401, 403, etc.)
- Detailed logging for security events

## Testing RBAC

### Test Scenarios

1. **Member Access**
   ```bash
   # Should succeed - view own profile
   curl -H "Authorization: Bearer <member_token>" GET /api/users/123
   
   # Should fail - view all users
   curl -H "Authorization: Bearer <member_token>" GET /api/users
   ```

2. **Admin Access**
   ```bash
   # Should succeed - manage club events
   curl -H "Authorization: Bearer <admin_token>" POST /api/bst/events
   
   # Should fail - create admin accounts
   curl -H "Authorization: Bearer <admin_token>" POST /api/auth/admins/create
   ```

3. **SuperAdmin Access**
   ```bash
   # Should succeed - all operations
   curl -H "Authorization: Bearer <superadmin_token>" DELETE /api/users/123
   ```

### Test Users (From seed data)
- **SuperAdmin**: admin@bst.org / admin123
- **Member**: john@example.com / user123

## Migration Notes

This RBAC system replaces the Django permission system with:
- More granular role-based access control
- Resource ownership validation
- Hierarchical permission inheritance
- Real-time permission checking
- Enhanced security middleware

All existing API endpoints maintain compatibility while adding proper authorization layers.
