import express from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../config/database.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/bst/awards
// @desc    Get all awards with pagination (matches Django AwardAPIView - no permission_classes)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [awards, total] = await Promise.all([
      prisma.award.findMany({
        include: {
          members: {
            include: {
              member: {
                include: {
                  user: {
                    select: {
                      id: true,
                      username: true,
                      firstName: true,
                      lastName: true,
                      email: true
                    }
                  }
                }
              }
            }
          },
          _count: {
            select: {
              members: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { date: 'desc' }
      }),
      prisma.award.count()
    ]);

    res.json({
      success: true,
      data: {
        awards,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('Get awards error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/bst/awards
// @desc    Create a new award (matches Django AwardAPIView - no permission_classes)
// @access  Public
router.post('/', [
  body('title').notEmpty().trim(),
  body('type').optional().trim()
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

    const { title, type, date } = req.body;

    const award = await prisma.award.create({
      data: {
        title,
        type: type || null,
        date: date ? new Date(date) : new Date()
      }
    });

    res.status(201).json({
      success: true,
      message: 'Award created successfully',
      data: { award }
    });

  } catch (error) {
    console.error('Create award error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/bst/awards/:id
// @desc    Get award by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const award = await prisma.award.findUnique({
      where: { id: parseInt(id) },
      include: {
        members: {
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
                    avatar: true,
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
        }
      }
    });

    if (!award) {
      return res.status(404).json({
        success: false,
        message: 'Award not found'
      });
    }

    res.json({
      success: true,
      data: { award }
    });

  } catch (error) {
    console.error('Get award error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/bst/awards/:id
// @desc    Update award
// @access  Private (Admin only)
router.put('/:id', [
  auth,
  adminAuth,
  body('title').optional().notEmpty().trim(),
  body('type').optional().trim()
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

    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }

    const award = await prisma.award.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json({
      success: true,
      message: 'Award updated successfully',
      data: { award }
    });

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Award not found'
      });
    }
    console.error('Update award error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/bst/awards/:id
// @desc    Delete award
// @access  Private (Admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.award.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Award deleted successfully'
    });

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Award not found'
      });
    }
    console.error('Delete award error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/bst/awards/:id/assign
// @desc    Assign award to member
// @access  Private (Admin only)
router.post('/:id/assign', [
  auth,
  adminAuth,
  body('memberId').notEmpty()
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
    const { memberId } = req.body;

    // Check if award exists
    const award = await prisma.award.findUnique({
      where: { id: parseInt(id) }
    });

    if (!award) {
      return res.status(404).json({
        success: false,
        message: 'Award not found'
      });
    }

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

    // Check if assignment already exists
    const existingAssignment = await prisma.memberAward.findUnique({
      where: {
        memberId_awardId: {
          memberId: memberId,
          awardId: parseInt(id)
        }
      }
    });

    if (existingAssignment) {
      return res.status(400).json({
        success: false,
        message: 'Award already assigned to this member'
      });
    }

    // Create assignment
    await prisma.memberAward.create({
      data: {
        memberId: memberId,
        awardId: parseInt(id)
      }
    });

    res.status(201).json({
      success: true,
      message: `Award "${award.title}" assigned to ${member.user.firstName} ${member.user.lastName} successfully`
    });

  } catch (error) {
    console.error('Assign award error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/bst/awards/:id/unassign
// @desc    Unassign award from member
// @access  Private (Admin only)
router.delete('/:id/unassign', [
  auth,
  adminAuth,
  body('memberId').notEmpty()
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
    const { memberId } = req.body;

    await prisma.memberAward.delete({
      where: {
        memberId_awardId: {
          memberId: memberId,
          awardId: parseInt(id)
        }
      }
    });

    res.json({
      success: true,
      message: 'Award unassigned successfully'
    });

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Award assignment not found'
      });
    }
    console.error('Unassign award error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
