import express from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../config/database.js';
import { auth, adminAuth, superAdminAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects with pagination (matches Django ProjectAPIView)
// @access  Private (SuperAdmin only)
router.get('/', [auth, superAdminAuth], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        include: {
          assignments: {
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
          },
          _count: {
            select: {
              assignments: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { projectId: 'desc' }
      }),
      prisma.project.count()
    ]);

    res.json({
      success: true,
      data: {
        projects,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Additional routes for project management

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { projectId: parseInt(id) },
      include: {
        assignments: {
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
        }
      }
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: { project }
    });

  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/projects
// @desc    Create a new project (matches Django ProjectAPIView)
// @access  Private (SuperAdmin only)
router.post('/', [
  auth,
  superAdminAuth,
  body('title').trim().isLength({ min: 1 }),
  body('description').optional().trim(),
  body('projectType').optional().isIn(['COMMUNITY_SERVICE', 'FUNDRAISING', 'EDUCATIONAL', 'OTHER']),
  body('dueDate').optional().isISO8601().toDate()
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

    const { title, description, projectType, dueDate, status } = req.body;

    const project = await prisma.project.create({
      data: {
        title,
        description: description || null,
        projectType: projectType || 'OTHER',
        dueDate: dueDate ? new Date(dueDate) : null,
        status: status || 'PLANNED'
      }
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: { project }
    });

  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private (Admin only)
router.put('/:id', [
  auth,
  adminAuth,
  body('title').optional().trim().isLength({ min: 1 }),
  body('description').optional().trim(),
  body('projectType').optional().isIn(['COMMUNITY_SERVICE', 'FUNDRAISING', 'EDUCATIONAL', 'OTHER']),
  body('dueDate').optional().isISO8601().toDate(),
  body('status').optional().isIn(['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'])
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

    // Convert date string to Date object if provided
    if (updateData.dueDate) {
      updateData.dueDate = new Date(updateData.dueDate);
    }

    const project = await prisma.project.update({
      where: { projectId: parseInt(id) },
      data: updateData,
      include: {
        assignments: {
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
        }
      }
    });

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: { project }
    });

  } catch (error) {
    console.error('Update project error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private (Admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: { projectId: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error('Delete project error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/projects/:id/assign
// @desc    Assign a member to a project
// @access  Private (Admin only)
router.post('/:id/assign', [
  auth,
  adminAuth,
  body('memberId').isInt(),
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

    const { id } = req.params;
    const { memberId, role } = req.body;

    // Check if assignment already exists
    const existingAssignment = await prisma.projectAssignment.findUnique({
      where: {
        projectId_memberId: {
          projectId: parseInt(id),
          memberId: parseInt(memberId)
        }
      }
    });

    if (existingAssignment) {
      return res.status(400).json({
        success: false,
        message: 'Member is already assigned to this project'
      });
    }

    const assignment = await prisma.projectAssignment.create({
      data: {
        projectId: parseInt(id),
        memberId: parseInt(memberId),
        role: role || 'Participant'
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
        project: {
          select: {
            projectId: true,
            title: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Member assigned to project successfully',
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

// @route   DELETE /api/projects/:id/assign/:memberId
// @desc    Remove a member from a project
// @access  Private (Admin only)
router.delete('/:id/assign/:memberId', [auth, adminAuth], async (req, res) => {
  try {
    const { id, memberId } = req.params;

    await prisma.projectAssignment.delete({
      where: {
        projectId_memberId: {
          projectId: parseInt(id),
          memberId: parseInt(memberId)
        }
      }
    });

    res.json({
      success: true,
      message: 'Member removed from project successfully'
    });

  } catch (error) {
    console.error('Remove project assignment error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Assignment not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
