import express from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../config/database.js';
import { auth, adminAuth, superAdminAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/bst/executive-committee
// @desc    Get executive committee members (matches Django ExecutiveCommitteeRetrieveUpdateDestroyAPIViewAPIView)
// @access  Private (Admin only)
router.get('/', [auth, adminAuth], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const clubId = req.query.clubId;
    const role = req.query.role;

    let whereClause = {};

    if (clubId) {
      whereClause.member = {
        user: {
          clubId: parseInt(clubId)
        }
      };
    }

    if (role) {
      whereClause.role = role;
    }

    const [executiveMembers, total] = await Promise.all([
      prisma.executiveCommittee.findMany({
        where: whereClause,
        include: {
          member: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                  mobile: true,
                  avatar: true,
                  club: {
                    select: {
                      clubId: true,
                      clubName: true,
                      city: true,
                      state: true
                    }
                  }
                }
              }
            }
          }
        },
        skip,
        take: limit,
        orderBy: [
          { startDate: 'desc' },
          { role: 'asc' }
        ]
      }),
      prisma.executiveCommittee.count({ where: whereClause })
    ]);

    res.json({
      success: true,
      data: {
        executiveMembers,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('Get executive committee error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/bst/executive-committee/:id
// @desc    Get executive committee member by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const executiveMember = await prisma.executiveCommittee.findUnique({
      where: { id: parseInt(id) },
      include: {
        member: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                email: true,
                mobile: true,
                avatar: true,
                address: true,
                club: {
                  select: {
                    clubId: true,
                    clubName: true,
                    city: true,
                    state: true,
                    country: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!executiveMember) {
      return res.status(404).json({
        success: false,
        message: 'Executive committee member not found'
      });
    }

    res.json({
      success: true,
      data: { executiveMember }
    });

  } catch (error) {
    console.error('Get executive member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/bst/executive-committee
// @desc    Add member to executive committee
// @access  Private (Admin only)
router.post('/', [
  auth,
  adminAuth,
  body('memberId').isInt(),
  body('role').isIn(['PRESIDENT', 'VICE_PRESIDENT', 'SECRETARY', 'TREASURER', 'MEMBER']),
  body('startDate').isISO8601().toDate(),
  body('endDate').optional().isISO8601().toDate()
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

    const { memberId, role, startDate, endDate, responsibilities } = req.body;

    // Check if member already has an active executive role
    const existingRole = await prisma.executiveCommittee.findFirst({
      where: {
        memberId: parseInt(memberId),
        OR: [
          { endDate: null },
          { endDate: { gte: new Date() } }
        ]
      }
    });

    if (existingRole) {
      return res.status(400).json({
        success: false,
        message: 'Member already has an active executive committee role'
      });
    }

    // For certain roles, ensure only one person holds the role at a time
    if (['PRESIDENT', 'VICE_PRESIDENT', 'SECRETARY', 'TREASURER'].includes(role)) {
      const member = await prisma.member.findUnique({
        where: { id: parseInt(memberId) },
        include: { user: { select: { clubId: true } } }
      });

      if (member?.user?.clubId) {
        const existingRoleHolder = await prisma.executiveCommittee.findFirst({
          where: {
            role,
            member: {
              user: {
                clubId: member.user.clubId
              }
            },
            OR: [
              { endDate: null },
              { endDate: { gte: new Date() } }
            ]
          }
        });

        if (existingRoleHolder) {
          return res.status(400).json({
            success: false,
            message: `Another member already holds the ${role} position in this club`
          });
        }
      }
    }

    const executiveMember = await prisma.executiveCommittee.create({
      data: {
        memberId: parseInt(memberId),
        role,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        responsibilities: responsibilities || null
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
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Member added to executive committee successfully',
      data: { executiveMember }
    });

  } catch (error) {
    console.error('Add executive member error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/bst/executive-committee/:id
// @desc    Update executive committee member
// @access  Private (Admin only)
router.put('/:id', [
  auth,
  adminAuth,
  body('role').optional().isIn(['PRESIDENT', 'VICE_PRESIDENT', 'SECRETARY', 'TREASURER', 'MEMBER']),
  body('startDate').optional().isISO8601().toDate(),
  body('endDate').optional().isISO8601().toDate(),
  body('responsibilities').optional().trim()
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
    const updateData = { ...req.body };

    // Convert date strings to Date objects
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate);
    }

    const executiveMember = await prisma.executiveCommittee.update({
      where: { id: parseInt(id) },
      data: updateData,
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
        }
      }
    });

    res.json({
      success: true,
      message: 'Executive committee member updated successfully',
      data: { executiveMember }
    });

  } catch (error) {
    console.error('Update executive member error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Executive committee member not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/bst/executive-committee/:id
// @desc    Remove member from executive committee
// @access  Private (Admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const { id } = req.params;

    // Instead of deleting, set end date to today
    const executiveMember = await prisma.executiveCommittee.update({
      where: { id: parseInt(id) },
      data: { endDate: new Date() }
    });

    res.json({
      success: true,
      message: 'Member removed from executive committee successfully'
    });

  } catch (error) {
    console.error('Remove executive member error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Executive committee member not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/bst/executive-committee/club/:clubId
// @desc    Get current executive committee for a specific club
// @access  Private
router.get('/club/:clubId', auth, async (req, res) => {
  try {
    const { clubId } = req.params;

    const executiveMembers = await prisma.executiveCommittee.findMany({
      where: {
        member: {
          user: {
            clubId: parseInt(clubId)
          }
        },
        OR: [
          { endDate: null },
          { endDate: { gte: new Date() } }
        ]
      },
      include: {
        member: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                email: true,
                mobile: true,
                avatar: true
              }
            }
          }
        }
      },
      orderBy: [
        { role: 'asc' },
        { startDate: 'desc' }
      ]
    });

    // Group by role for easier frontend consumption
    const groupedByRole = executiveMembers.reduce((acc, member) => {
      if (!acc[member.role]) {
        acc[member.role] = [];
      }
      acc[member.role].push(member);
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        executiveMembers,
        groupedByRole,
        totalMembers: executiveMembers.length
      }
    });

  } catch (error) {
    console.error('Get club executive committee error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/bst/executive-committee/history/:memberId
// @desc    Get executive committee history for a member
// @access  Private
router.get('/history/:memberId', auth, async (req, res) => {
  try {
    const { memberId } = req.params;

    const history = await prisma.executiveCommittee.findMany({
      where: { memberId: parseInt(memberId) },
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
                    clubId: true,
                    clubName: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: { startDate: 'desc' }
    });

    res.json({
      success: true,
      data: { history }
    });

  } catch (error) {
    console.error('Get executive history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/bst/executive-committee/transfer/:id
// @desc    Transfer executive role to another member
// @access  Private (SuperAdmin only)
router.post('/transfer/:id', [
  auth,
  superAdminAuth,
  body('newMemberId').isInt(),
  body('transferDate').optional().isISO8601().toDate()
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
    const { newMemberId, transferDate = new Date() } = req.body;

    const result = await prisma.$transaction(async (tx) => {
      // Get current executive member
      const currentExecutive = await tx.executiveCommittee.findUnique({
        where: { id: parseInt(id) }
      });

      if (!currentExecutive) {
        throw new Error('Executive committee member not found');
      }

      // End current member's term
      await tx.executiveCommittee.update({
        where: { id: parseInt(id) },
        data: { endDate: new Date(transferDate) }
      });

      // Create new executive member
      const newExecutive = await tx.executiveCommittee.create({
        data: {
          memberId: parseInt(newMemberId),
          role: currentExecutive.role,
          startDate: new Date(transferDate),
          responsibilities: currentExecutive.responsibilities
        },
        include: {
          member: {
            include: {
              user: {
                select: {
                  username: true,
                  firstName: true,
                  lastName: true,
                  email: true
                }
              }
            }
          }
        }
      });

      return newExecutive;
    });

    res.json({
      success: true,
      message: 'Executive role transferred successfully',
      data: { executiveMember: result }
    });

  } catch (error) {
    console.error('Transfer executive role error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
});

export default router;
