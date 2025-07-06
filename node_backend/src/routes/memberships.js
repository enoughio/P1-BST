import express from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../config/database.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/memberships
// @desc    Get all membership types (equivalent to Django MembershipAPIView)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const memberships = await prisma.membership.findMany({
      include: {
        _count: {
          select: {
            initiatives: true,
            membershipHistory: true
          }
        }
      },
      orderBy: { fee: 'asc' }
    });

    res.json({
      success: true,
      data: { memberships }
    });

  } catch (error) {
    console.error('Get memberships error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/memberships
// @desc    Create new membership type (matches Django MembershipAPIView - no permission_classes)
// @access  Public
router.post('/', [
  body('name').notEmpty().trim(),
  body('fee').isNumeric(),
  body('durationInMonths').isInt({ min: 1 })
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

    const { name, fee, durationInMonths } = req.body;

    const membership = await prisma.membership.create({
      data: {
        name,
        fee: parseFloat(fee),
        durationInMonths: parseInt(durationInMonths)
      }
    });

    res.status(201).json({
      success: true,
      message: 'Membership type created successfully',
      data: { membership }
    });

  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'Membership type with this name already exists'
      });
    }
    console.error('Create membership error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/memberships/:id
// @desc    Get membership by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const membership = await prisma.membership.findUnique({
      where: { id },
      include: {
        initiatives: {
          select: {
            id: true,
            title: true,
            description: true
          }
        },
        membershipHistory: {
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
          },
          orderBy: {
            startDate: 'desc'
          }
        }
      }
    });

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: 'Membership type not found'
      });
    }

    res.json({
      success: true,
      data: { membership }
    });

  } catch (error) {
    console.error('Get membership error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/memberships/:username/create-membership
// @desc    Create membership for user (equivalent to Django MembershipCreateRetrieveAPIView)
// @access  Private (Admin only)
router.post('/:username/create-membership', [
  auth,
  adminAuth,
  body('membershipTypeId').notEmpty(),
  body('startDate').optional().isISO8601()
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
    const { membershipTypeId, startDate } = req.body;

    // Find member by username
    const member = await prisma.member.findFirst({
      where: {
        user: { username }
      },
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
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    // Check if membership type exists
    const membershipType = await prisma.membership.findUnique({
      where: { id: membershipTypeId }
    });

    if (!membershipType) {
      return res.status(404).json({
        success: false,
        message: 'Membership type not found'
      });
    }

    // Create membership history
    const membershipHistory = await prisma.membershipHistory.create({
      data: {
        memberId: member.id,
        membershipTypeId,
        startDate: startDate ? new Date(startDate) : new Date()
      },
      include: {
        membershipType: true,
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

    res.status(201).json({
      success: true,
      message: 'Membership created successfully',
      data: { membershipHistory }
    });

  } catch (error) {
    console.error('Create membership error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/memberships/:username/membership
// @desc    Get member's current membership (equivalent to Django MembershipDetailAPIView)
// @access  Private
router.get('/:username/membership', auth, async (req, res) => {
  try {
    const { username } = req.params;

    // Check if user can access this data
    if (req.user.username !== username && !req.user.admins?.length && !req.user.isSuperuser) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const membershipHistory = await prisma.membershipHistory.findFirst({
      where: {
        member: {
          user: { username }
        }
      },
      include: {
        membershipType: true,
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
      },
      orderBy: {
        startDate: 'desc'
      }
    });

    if (!membershipHistory) {
      return res.status(404).json({
        success: false,
        message: 'No membership found for this member'
      });
    }

    // Check if membership is active
    const isActive = membershipHistory.endDate ? new Date() <= membershipHistory.endDate : true;

    res.json({
      success: true,
      data: {
        membershipHistory,
        isActive
      }
    });

  } catch (error) {
    console.error('Get membership error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/memberships/:username/membership-history
// @desc    Get member's membership history (equivalent to Django MembershipHistoryListAPIView)
// @access  Private
router.get('/:username/membership-history', auth, async (req, res) => {
  try {
    const { username } = req.params;

    // Check if user can access this data
    if (req.user.username !== username && !req.user.admins?.length && !req.user.isSuperuser) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const membershipHistory = await prisma.membershipHistory.findMany({
      where: {
        member: {
          user: { username }
        }
      },
      include: {
        membershipType: true
      },
      orderBy: {
        startDate: 'desc'
      }
    });

    res.json({
      success: true,
      data: { membershipHistory }
    });

  } catch (error) {
    console.error('Get membership history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
