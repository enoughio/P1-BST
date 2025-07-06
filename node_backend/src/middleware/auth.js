import jwt from 'jsonwebtoken';
import { prisma } from '../config/database.js';

// User roles constants
export const USER_ROLES = {
  MEMBER: 'MEMBER',
  ADMIN: 'ADMIN', 
  SUPER_ADMIN: 'SUPER_ADMIN'
};

// Helper function to determine user role
const getUserRole = (user) => {
  if (user.isSuperuser) {
    return USER_ROLES.SUPER_ADMIN;
  }
  
  if (user.isStaff || (user.admins && user.admins.length > 0)) {
    return USER_ROLES.ADMIN;
  }
  
  if (user.members && user.members.length > 0) {
    return USER_ROLES.MEMBER;
  }
  
  return USER_ROLES.MEMBER; // Default to member
};

// Helper function to check if user has required role
const hasRequiredRole = (userRole, requiredRole) => {
  const roleHierarchy = {
    [USER_ROLES.MEMBER]: 1,
    [USER_ROLES.ADMIN]: 2,
    [USER_ROLES.SUPER_ADMIN]: 3
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

// Base authentication middleware
export const auth = async (req, res, next) => {
  try {
    // Check for token in cookies first, then Authorization header
    let token = req.cookies?.authToken;
    
    if (!token) {
      token = req.header('Authorization')?.replace('Bearer ', '');
    }

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided, authorization denied' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        members: {
          select: {
            id: true,
            role: true,
            occupation: true
          }
        },
        admins: {
          select: {
            id: true,
            role: true
          }
        },
        club: {
          select: {
            clubId: true,
            clubName: true,
            city: true,
            state: true
          }
        }
      }
    });

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token is not valid' 
      });
    }

    if (!user.isActive) {
      return res.status(401).json({ 
        success: false, 
        message: 'User account is deactivated' 
      });
    }

    // Add role information to user object
    user.role = getUserRole(user);
    user.permissions = {
      canRead: true,
      canWrite: user.role !== USER_ROLES.MEMBER,
      canDelete: user.role === USER_ROLES.SUPER_ADMIN || user.role === USER_ROLES.ADMIN,
      canManageUsers: user.role === USER_ROLES.SUPER_ADMIN,
      canManageClubs: user.role !== USER_ROLES.MEMBER,
      canManageMembers: user.role !== USER_ROLES.MEMBER,
      canManagePayments: user.role !== USER_ROLES.MEMBER,
      canManageExecutiveCommittee: user.role !== USER_ROLES.MEMBER
    };

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ 
      success: false, 
      message: 'Token is not valid' 
    });
  }
};

// Middleware to check if user is a member (basic authenticated user)
export const memberAuth = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    if (!hasRequiredRole(req.user.role, USER_ROLES.MEMBER)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Member access required' 
      });
    }

    next();
  } catch (error) {
    console.error('Member auth middleware error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Middleware to check if user is admin
export const adminAuth = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    if (!hasRequiredRole(req.user.role, USER_ROLES.ADMIN)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Admin access required' 
      });
    }

    next();
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Middleware to check if user is super admin
export const superAdminAuth = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    if (!hasRequiredRole(req.user.role, USER_ROLES.SUPER_ADMIN)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Super admin access required' 
      });
    }

    next();
  } catch (error) {
    console.error('Super admin auth middleware error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Middleware for role-based access control with multiple allowed roles
export const roleAuth = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ 
          success: false, 
          message: 'Authentication required' 
        });
      }

      const userRole = req.user.role;
      const hasAccess = allowedRoles.some(role => hasRequiredRole(userRole, role));

      if (!hasAccess) {
        return res.status(403).json({ 
          success: false, 
          message: `Access denied. Required roles: ${allowedRoles.join(', ')}` 
        });
      }

      next();
    } catch (error) {
      console.error('Role auth middleware error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Server error' 
      });
    }
  };
};

// Middleware to check resource ownership or admin access
export const ownerOrAdminAuth = (resourceUserIdField = 'userId') => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ 
          success: false, 
          message: 'Authentication required' 
        });
      }

      // Allow if user is admin or super admin
      if (hasRequiredRole(req.user.role, USER_ROLES.ADMIN)) {
        return next();
      }

      // Check if user owns the resource
      const resourceUserId = req.params.userId || req.body[resourceUserIdField] || req.query.userId;
      
      if (resourceUserId && parseInt(resourceUserId) === req.user.id) {
        return next();
      }

      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. You can only access your own resources.' 
      });

    } catch (error) {
      console.error('Owner or admin auth middleware error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Server error' 
      });
    }
  };
};

// Middleware to check club membership for club-specific resources
export const clubMemberAuth = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    // Allow if user is admin or super admin
    if (hasRequiredRole(req.user.role, USER_ROLES.ADMIN)) {
      return next();
    }

    // Check if user belongs to the club
    const clubId = req.params.clubId || req.body.clubId || req.query.clubId;
    
    if (clubId && req.user.clubId && parseInt(clubId) === req.user.clubId) {
      return next();
    }

    return res.status(403).json({ 
      success: false, 
      message: 'Access denied. You can only access resources from your club.' 
    });

  } catch (error) {
    console.error('Club member auth middleware error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

// Export all middlewares for easy import
export default {
  auth,
  memberAuth,
  adminAuth,
  superAdminAuth,
  roleAuth,
  ownerOrAdminAuth,
  clubMemberAuth,
  USER_ROLES
};
