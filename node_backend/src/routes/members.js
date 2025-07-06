import express from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../config/database.js';
import { 
  auth, 
  adminAuth, 
  superAdminAuth, 
  roleAuth, 
  ownerOrAdminAuth,
  USER_ROLES 
} from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/bst/members
// @desc    Get all members with pagination (Admin/SuperAdmin only)
// @access  Private (Admin/SuperAdmin)
router.get('/', [
  auth, 
  roleAuth([USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN])
], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const clubId = req.query.club_id;
    const search = req.query.search || '';

    let whereClause = {};

    if (clubId) {
      whereClause.user = {
        clubId: clubId
      };
    }

    if (search) {
      whereClause.OR = [
        {
          user: {
            username: { contains: search, mode: 'insensitive' }
          }
        },
        {
          user: {
            firstName: { contains: search, mode: 'insensitive' }
          }
        },
        {
          user: {
            lastName: { contains: search, mode: 'insensitive' }
          }
        },
        {
          user: {
            email: { contains: search, mode: 'insensitive' }
          }
        }
      ];
    }

    const [members, total] = await Promise.all([
      prisma.member.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              username: true,
              firstName: true,
              lastName: true,
              mobile: true,
              avatar: true,
              gender: true,
              dob: true,
              dateJoined: true,
              isActive: true,
              club: {
                select: {
                  clubId: true,
                  clubName: true,
                  city: true,
                  state: true
                }
              }
            }
          },
          awards: {
            include: {
              award: true
            }
          },
          membershipHistory: {
            include: {
              membershipType: true
            },
            orderBy: {
              startDate: 'desc'
            },
            take: 1
          },
          _count: {
            select: {
              projectAssignments: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: {
          user: {
            dateJoined: 'desc'
          }
        }
      }),
      prisma.member.count({ where: whereClause })
    ]);

    res.json({
      success: true,
      data: {
        members,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/members/:username/dashboard
// @desc    Get member dashboard (equivalent to Django MemberRetriveAPIView)
// @access  Private
// @route   GET /api/bst/members/:username/dashboard
// @desc    Get member dashboard data (Own profile only, unless admin)
// @access  Private (Owner or Admin)
router.get('/:username/dashboard', [
  auth, 
  ownerOrAdminAuth('username')
], async (req, res) => {
  try {
    const { username } = req.params;

    // Check if user can access this data
    if (req.user.username !== username && !req.user.admins?.length && !req.user.isSuperuser) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const member = await prisma.member.findFirst({
      where: {
        user: { username }
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            firstName: true,
            lastName: true,
            mobile: true,
            avatar: true,
            address: true,
            gender: true,
            dob: true,
            dateJoined: true,
            isActive: true,
            club: {
              select: {
                clubId: true,
                clubName: true,
                city: true,
                state: true,
                country: true,
                meetingTime: true,
                email: true,
                mobile: true
              }
            }
          }
        },
        awards: {
          include: {
            award: true
          }
        },
        membershipHistory: {
          include: {
            membershipType: true
          },
          orderBy: {
            startDate: 'desc'
          }
        },
        projectAssignments: {
          include: {
            project: true
          },
          where: {
            deadline: {
              gte: new Date()
            }
          }
        },
        executiveCommittee: true
      }
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json({
      success: true,
      data: { member }
    });

  } catch (error) {
    console.error('Get member dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/members/:username/basic
// @desc    Update member basic info (equivalent to Django MemberUpdateBasicInfoAPIView)
// @access  Private
router.put('/:username/basic', [
  auth,
  body('firstName').optional().trim(),
  body('lastName').optional().trim(),
  body('mobile').optional().isLength({ max: 10 }),
  body('gender').optional().isIn(['MALE', 'FEMALE', 'OTHER'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { username } = req.params;

    // Check if user can update this data
    if (req.user.username !== username && !req.user.admins?.length && !req.user.isSuperuser) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const { firstName, lastName, mobile, gender, dob } = req.body;

    const updateData = {};
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (mobile !== undefined) updateData.mobile = mobile;
    if (gender !== undefined) updateData.gender = gender;
    if (dob !== undefined) updateData.dob = new Date(dob);

    const user = await prisma.user.update({
      where: { username },
      data: updateData,
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        mobile: true,
        gender: true,
        dob: true,
        members: {
          select: {
            id: true,
            role: true,
            occupation: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Basic information updated successfully',
      data: { user }
    });

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }
    console.error('Update member basic info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/members/:username/additional-info
// @desc    Update member additional info (equivalent to Django MemberUpdateAdditionalInfoAPIView)
// @access  Private
router.put('/:username/additional-info', [
  auth,
  body('address').optional().trim(),
  body('occupation').optional().isIn(['STUDENT', 'EMPLOYEE', 'BUSINESS', 'SELF_EMPLOYED'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { username } = req.params;

    // Check if user can update this data
    if (req.user.username !== username && !req.user.admins?.length && !req.user.isSuperuser) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const { address, occupation } = req.body;

    const updatePromises = [];

    // Update user address if provided
    if (address !== undefined) {
      updatePromises.push(
        prisma.user.update({
          where: { username },
          data: { address }
        })
      );
    }

    // Update member occupation if provided
    if (occupation !== undefined) {
      updatePromises.push(
        prisma.member.updateMany({
          where: { user: { username } },
          data: { occupation }
        })
      );
    }

    await Promise.all(updatePromises);

    // Get updated member data
    const member = await prisma.member.findFirst({
      where: { user: { username } },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            address: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Additional information updated successfully',
      data: { member }
    });

  } catch (error) {
    console.error('Update member additional info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/members/assign-project
// @desc    Assign project to member (equivalent to Django MemberProjectAssignAPIView)
// @access  Private (Admin only)
router.post('/assign-project', [
  auth,
  adminAuth,
  body('memberId').notEmpty(),
  body('projectId').isInt(),
  body('deadline').optional().isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { memberId, projectId, deadline } = req.body;

    // Check if member exists
    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: {
        user: {
          select: {
            username: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { projectId: parseInt(projectId) }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Create project assignment
    const assignment = await prisma.projectAssignment.create({
      data: {
        memberId,
        projectId: parseInt(projectId),
        assignedDate: new Date(),
        deadline: deadline ? new Date(deadline) : null
      },
      include: {
        member: {
          include: {
            user: {
              select: {
                username: true,
                firstName: true,
                lastName: true
              }
            }
          }
        },
        project: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Project assigned successfully',
      data: { assignment }
    });

  } catch (error) {
    console.error('Assign project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/members/:username
// @desc    Get member details (equivalent to Django MemberRetrieveUpdateAPIView)
// @access  Private (Admin)
// @route   GET /api/bst/members/:username
// @desc    Get member by username (Admin/SuperAdmin only)
// @access  Private (Admin/SuperAdmin)
router.get('/:username', [
  auth, 
  roleAuth([USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN])
], async (req, res) => {
  try {
    const { username } = req.params;

    const member = await prisma.member.findFirst({
      where: {
        user: { username }
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            firstName: true,
            lastName: true,
            mobile: true,
            avatar: true,
            address: true,
            gender: true,
            dob: true,
            dateJoined: true,
            isActive: true,
            club: {
              select: {
                clubId: true,
                clubName: true,
                city: true,
                state: true
              }
            }
          }
        },
        awards: {
          include: {
            award: true
          }
        },
        membershipHistory: {
          include: {
            membershipType: true
          },
          orderBy: {
            startDate: 'desc'
          }
        },
        projectAssignments: {
          include: {
            project: true
          }
        },
        executiveCommittee: true
      }
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json({
      success: true,
      data: { member }
    });

  } catch (error) {
    console.error('Get member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/members/:username
// @desc    Update member (equivalent to Django MemberRetrieveUpdateAPIView)
// @access  Private (Admin)
router.put('/:username', [
  auth,
  adminAuth,
  body('firstName').optional().trim(),
  body('lastName').optional().trim(),
  body('mobile').optional().isLength({ max: 10 }),
  body('occupation').optional().isIn(['STUDENT', 'EMPLOYEE', 'BUSINESS', 'SELF_EMPLOYED']),
  body('role').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { username } = req.params;
    const { firstName, lastName, mobile, address, gender, occupation, role, clubId } = req.body;

    // Update user data
    const userUpdateData = {};
    if (firstName !== undefined) userUpdateData.firstName = firstName;
    if (lastName !== undefined) userUpdateData.lastName = lastName;
    if (mobile !== undefined) userUpdateData.mobile = mobile;
    if (address !== undefined) userUpdateData.address = address;
    if (gender !== undefined) userUpdateData.gender = gender;
    if (clubId !== undefined) userUpdateData.clubId = clubId;

    // Update member data
    const memberUpdateData = {};
    if (occupation !== undefined) memberUpdateData.occupation = occupation;
    if (role !== undefined) memberUpdateData.role = role;

    const updatePromises = [];

    if (Object.keys(userUpdateData).length > 0) {
      updatePromises.push(
        prisma.user.update({
          where: { username },
          data: userUpdateData
        })
      );
    }

    if (Object.keys(memberUpdateData).length > 0) {
      updatePromises.push(
        prisma.member.updateMany({
          where: { user: { username } },
          data: memberUpdateData
        })
      );
    }

    await Promise.all(updatePromises);

    // Get updated member data
    const member = await prisma.member.findFirst({
      where: { user: { username } },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            firstName: true,
            lastName: true,
            mobile: true,
            address: true,
            gender: true,
            dob: true,
            isActive: true,
            club: {
              select: {
                clubId: true,
                clubName: true
              }
            }
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Member updated successfully',
      data: { member }
    });

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }
    console.error('Update member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/members/:username
// @desc    Delete member (equivalent to Django MemberRetrieveUpdateDestroyAPIView)
// @access  Private (SuperAdmin only)
router.delete('/:username', [auth, superAdminAuth], async (req, res) => {
  try {
    const { username } = req.params;

    // Find and delete member (this will also delete user due to cascade)
    const member = await prisma.member.findFirst({
      where: { user: { username } },
      include: { user: true }
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    // Delete the user (member will be deleted due to cascade)
    await prisma.user.delete({
      where: { id: member.userId }
    });

    res.json({
      success: true,
      message: 'Member deleted successfully'
    });

  } catch (error) {
    console.error('Delete member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/members/create-removal-request
// @desc    Create member removal request (equivalent to Django MemberRemovalRequestCreateAPIView)
// @access  Private (Admin only)
router.post('/create-removal-request', [
  auth,
  adminAuth,
  body('memberId').notEmpty(),
  body('reason').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { memberId, reason } = req.body;

    // Check if member exists
    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: {
        user: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
            club: {
              select: {
                clubName: true
              }
            }
          }
        }
      }
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    // Get admin record
    const admin = await prisma.admin.findFirst({
      where: { userId: req.user.id }
    });

    if (!admin) {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    // Check if there's already a pending request for this member
    const existingRequest = await prisma.memberRemovalRequest.findFirst({
      where: {
        memberId,
        status: 'PENDING'
      }
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: 'A pending removal request already exists for this member'
      });
    }

    // Create removal request
    const removalRequest = await prisma.memberRemovalRequest.create({
      data: {
        memberId,
        requestedById: admin.id,
        reason: reason || null,
        status: 'PENDING'
      },
      include: {
        member: {
          include: {
            user: {
              select: {
                username: true,
                firstName: true,
                lastName: true,
                club: {
                  select: {
                    clubName: true
                  }
                }
              }
            }
          }
        },
        requestedBy: {
          include: {
            user: {
              select: {
                username: true,
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Removal request created successfully',
      data: { removalRequest }
    });

  } catch (error) {
    console.error('Create removal request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/members/pending-removal-requests
// @desc    Get pending removal requests (equivalent to Django PendingRemovalRequestsView)
// @access  Private (Admin only)
// @route   GET /api/bst/members/pending-removal-requests
// @desc    Get pending member removal requests (Admin/SuperAdmin only)
// @access  Private (Admin/SuperAdmin)
router.get('/pending-removal-requests', [
  auth, 
  roleAuth([USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN])
], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [requests, total] = await Promise.all([
      prisma.memberRemovalRequest.findMany({
        where: {
          status: 'PENDING'
        },
        include: {
          member: {
            include: {
              user: {
                select: {
                  username: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                  club: {
                    select: {
                      clubId: true,
                      clubName: true
                    }
                  }
                }
              }
            }
          },
          requestedBy: {
            include: {
              user: {
                select: {
                  username: true,
                  firstName: true,
                  lastName: true
                }
              }
            }
          }
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.memberRemovalRequest.count({
        where: { status: 'PENDING' }
      })
    ]);

    res.json({
      success: true,
      data: {
        requests,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('Get pending removal requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/members/approve-reject-request/:id
// @desc    Approve or reject removal request (equivalent to Django ApproveRejectRequestView)
// @access  Private (SuperAdmin only)
router.put('/approve-reject-request/:id', [
  auth,
  superAdminAuth,
  body('status').isIn(['APPROVED', 'REJECTED']),
  body('reason').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { status, reason } = req.body;

    // Find the removal request
    const removalRequest = await prisma.memberRemovalRequest.findUnique({
      where: { id: parseInt(id) },
      include: {
        member: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    if (!removalRequest) {
      return res.status(404).json({
        success: false,
        message: 'Removal request not found'
      });
    }

    if (removalRequest.status !== 'PENDING') {
      return res.status(400).json({
        success: false,
        message: 'Request has already been processed'
      });
    }

    // Update the request status
    const updatedRequest = await prisma.memberRemovalRequest.update({
      where: { id: parseInt(id) },
      data: {
        status,
        reason,
        updatedAt: new Date()
      },
      include: {
        member: {
          include: {
            user: {
              select: {
                username: true,
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    // If approved, deactivate the member's user account
    if (status === 'APPROVED') {
      await prisma.user.update({
        where: { id: removalRequest.member.userId },
        data: { isActive: false }
      });
    }

    res.json({
      success: true,
      message: `Request ${status.toLowerCase()} successfully`,
      data: { removalRequest: updatedRequest }
    });

  } catch (error) {
    console.error('Approve/reject request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
