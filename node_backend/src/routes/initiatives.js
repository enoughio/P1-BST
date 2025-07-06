import express from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../config/database.js';
import { auth, adminAuth, superAdminAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/bst/initiatives
// @desc    Get all initiatives (matches Django InitiativeListAPIView)
// @access  Private (SuperAdmin only)
router.get('/', [auth, superAdminAuth], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [initiatives, total] = await Promise.all([
      prisma.initiative.findMany({
        include: {
          membership: {
            select: {
              id: true,
              name: true,
              fee: true,
              durationInMonths: true
            }
          },
          clubs: {
            select: {
              clubId: true,
              clubName: true,
              city: true,
              state: true
            }
          },
          _count: {
            select: {
              clubs: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { id: 'desc' }
      }),
      prisma.initiative.count()
    ]);

    res.json({
      success: true,
      data: {
        initiatives,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('Get initiatives error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/bst/initiatives/create
// @desc    Create a new initiative (matches Django InitiativeCreateAPIView)
// @access  Private (SuperAdmin only)
router.post('/create', [
  auth,
  superAdminAuth,
  body('title').notEmpty().trim(),
  body('description').optional().trim(),
  body('eligibleAge').optional().trim(),
  body('maxClubSize').optional().isInt({ min: 0 })
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

    const { title, description, eligibleAge, maxClubSize, membershipId } = req.body;

    // Validate membership if provided
    if (membershipId) {
      const membership = await prisma.membership.findUnique({
        where: { id: membershipId }
      });

      if (!membership) {
        return res.status(400).json({
          success: false,
          message: 'Invalid membership ID'
        });
      }
    }

    const initiative = await prisma.initiative.create({
      data: {
        title,
        description: description || null,
        eligibleAge: eligibleAge || null,
        maxClubSize: maxClubSize ? parseInt(maxClubSize) : 0,
        membershipId: membershipId || null
      },
      include: {
        membership: {
          select: {
            id: true,
            name: true,
            fee: true,
            durationInMonths: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Initiative created successfully',
      data: { initiative }
    });

  } catch (error) {
    console.error('Create initiative error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/bst/initiatives/:id
// @desc    Get initiative by ID (equivalent to Django InitiativeRetrieveUpdateDestroyAPIViewAPIView - GET)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const initiative = await prisma.initiative.findUnique({
      where: { id: parseInt(id) },
      include: {
        membership: {
          select: {
            id: true,
            name: true,
            fee: true,
            durationInMonths: true
          }
        },
        clubs: {
          select: {
            clubId: true,
            clubName: true,
            city: true,
            state: true,
            country: true,
            meetingTime: true,
            description: true,
            _count: {
              select: {
                users: true,
                events: true
              }
            }
          }
        }
      }
    });

    if (!initiative) {
      return res.status(404).json({
        success: false,
        message: 'Initiative not found'
      });
    }

    res.json({
      success: true,
      data: { initiative }
    });

  } catch (error) {
    console.error('Get initiative error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/bst/initiatives/:id
// @desc    Update initiative (matches Django InitiativeRetrieveUpdateDestroyAPIViewAPIView)
// @access  Private (SuperAdmin only)
router.put('/:id', [
  auth,
  superAdminAuth,
  body('title').optional().notEmpty().trim(),
  body('description').optional().trim(),
  body('eligibleAge').optional().trim(),
  body('maxClubSize').optional().isInt({ min: 0 })
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

    // Remove undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    // Validate membership if provided
    if (updateData.membershipId) {
      const membership = await prisma.membership.findUnique({
        where: { id: updateData.membershipId }
      });

      if (!membership) {
        return res.status(400).json({
          success: false,
          message: 'Invalid membership ID'
        });
      }
    }

    if (updateData.maxClubSize) {
      updateData.maxClubSize = parseInt(updateData.maxClubSize);
    }

    const initiative = await prisma.initiative.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        membership: {
          select: {
            id: true,
            name: true,
            fee: true,
            durationInMonths: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Initiative updated successfully',
      data: { initiative }
    });

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Initiative not found'
      });
    }
    console.error('Update initiative error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/bst/initiatives/:id
// @desc    Delete initiative (matches Django InitiativeRetrieveUpdateDestroyAPIViewAPIView)
// @access  Private (SuperAdmin only)
router.delete('/:id', [auth, superAdminAuth], async (req, res) => {
  try {
    const { id } = req.params;

    // Check if initiative has associated clubs
    const clubsCount = await prisma.club.count({
      where: { initiativeId: parseInt(id) }
    });

    if (clubsCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete initiative. ${clubsCount} club(s) are associated with this initiative.`
      });
    }

    await prisma.initiative.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Initiative deleted successfully'
    });

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Initiative not found'
      });
    }
    console.error('Delete initiative error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/bst/initiatives/:id/clubs
// @desc    Get clubs by initiative
// @access  Public
router.get('/:id/clubs', async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Check if initiative exists
    const initiative = await prisma.initiative.findUnique({
      where: { id: parseInt(id) }
    });

    if (!initiative) {
      return res.status(404).json({
        success: false,
        message: 'Initiative not found'
      });
    }

    const [clubs, total] = await Promise.all([
      prisma.club.findMany({
        where: { initiativeId: parseInt(id) },
        include: {
          _count: {
            select: {
              users: true,
              events: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { clubName: 'asc' }
      }),
      prisma.club.count({
        where: { initiativeId: parseInt(id) }
      })
    ]);

    res.json({
      success: true,
      data: {
        initiative: {
          id: initiative.id,
          title: initiative.title
        },
        clubs,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('Get initiative clubs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
