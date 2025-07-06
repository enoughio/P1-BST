import express from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../config/database.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/meetings
// @desc    Get all meetings with pagination (matches Django MeetingListAPIView)
// @access  Private (Admin only)
router.get('/', [auth, adminAuth], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const clubId = req.query.clubId;
    const meetingType = req.query.meetingType;

    let whereClause = {};

    if (clubId) {
      whereClause.clubId = clubId;
    }

    if (meetingType) {
      whereClause.meetingType = meetingType;
    }

    const [meetings, total] = await Promise.all([
      prisma.meeting.findMany({
        where: whereClause,
        include: {
          club: {
            select: {
              clubId: true,
              clubName: true
            }
          },
          moc: {
            select: {
              id: true,
              user: {
                select: {
                  username: true,
                  firstName: true,
                  lastName: true
                }
              }
            }
          },
          president: {
            select: {
              id: true,
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
        orderBy: { date: 'desc' }
      }),
      prisma.meeting.count({ where: whereClause })
    ]);

    res.json({
      success: true,
      data: {
        meetings,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('Get meetings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Additional routes for meeting management

// @route   GET /api/meetings/:id
// @desc    Get meeting by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    const meeting = await prisma.meeting.findUnique({
      where: { id: parseInt(id) },
      include: {
        club: {
          select: {
            clubId: true,
            clubName: true,
            city: true,
            state: true
          }
        },
        moc: {
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
        },
        president: {
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
        },
        vicePresident: {
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
        },
        attendances: {
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

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: 'Meeting not found'
      });
    }

    res.json({
      success: true,
      data: { meeting }
    });

  } catch (error) {
    console.error('Get meeting error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/meetings
// @desc    Create a new meeting
// @access  Private (Admin only)
router.post('/', [
  auth,
  adminAuth,
  body('date').isISO8601().toDate(),
  body('time').exists(),
  body('venue').optional().trim(),
  body('meetingType').isIn(['CLUB', 'AREA', 'DIVISION', 'DISTRICT']),
  body('clubId').optional().isInt()
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

    const {
      date,
      time,
      venue,
      meetingType,
      clubId,
      mocId,
      presidentId,
      vicePresidentId,
      description
    } = req.body;

    const meeting = await prisma.meeting.create({
      data: {
        date: new Date(date),
        time,
        venue: venue || null,
        meetingType,
        clubId: clubId || null,
        mocId: mocId || null,
        presidentId: presidentId || null,
        vicePresidentId: vicePresidentId || null,
        description: description || null
      },
      include: {
        club: {
          select: {
            clubId: true,
            clubName: true
          }
        },
        moc: {
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
      message: 'Meeting created successfully',
      data: { meeting }
    });

  } catch (error) {
    console.error('Create meeting error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/meetings/:id
// @desc    Update a meeting
// @access  Private (Admin only)
router.put('/:id', [
  auth,
  adminAuth,
  body('date').optional().isISO8601().toDate(),
  body('time').optional(),
  body('venue').optional().trim(),
  body('meetingType').optional().isIn(['CLUB', 'AREA', 'DIVISION', 'DISTRICT'])
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
    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }

    const meeting = await prisma.meeting.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        club: {
          select: {
            clubId: true,
            clubName: true
          }
        },
        moc: {
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

    res.json({
      success: true,
      message: 'Meeting updated successfully',
      data: { meeting }
    });

  } catch (error) {
    console.error('Update meeting error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Meeting not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/meetings/:id
// @desc    Delete a meeting
// @access  Private (Admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.meeting.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Meeting deleted successfully'
    });

  } catch (error) {
    console.error('Delete meeting error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Meeting not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/meetings/:id/attendance
// @desc    Mark attendance for a meeting
// @access  Private
router.post('/:id/attendance', [
  auth,
  body('memberId').isInt(),
  body('present').isBoolean()
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
    const { memberId, present } = req.body;

    // Check if attendance already exists
    const existingAttendance = await prisma.attendance.findUnique({
      where: {
        meetingId_memberId: {
          meetingId: parseInt(id),
          memberId: parseInt(memberId)
        }
      }
    });

    let attendance;
    if (existingAttendance) {
      // Update existing attendance
      attendance = await prisma.attendance.update({
        where: {
          meetingId_memberId: {
            meetingId: parseInt(id),
            memberId: parseInt(memberId)
          }
        },
        data: { present },
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
    } else {
      // Create new attendance
      attendance = await prisma.attendance.create({
        data: {
          meetingId: parseInt(id),
          memberId: parseInt(memberId),
          present
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
    }

    res.json({
      success: true,
      message: 'Attendance marked successfully',
      data: { attendance }
    });

  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
