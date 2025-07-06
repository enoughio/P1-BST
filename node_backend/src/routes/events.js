import express from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../config/database.js';
import { auth, adminAuth, superAdminAuth, roleAuth, USER_ROLES } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/bst/events
// @desc    Get all events with pagination (matches Django EventListAPIView - no permissions)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const clubId = req.query.club_id;
    const highlighted = req.query.highlighted === 'true';

    let whereClause = {};

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (clubId) {
      whereClause.clubId = clubId;
    }

    if (highlighted) {
      whereClause.highlighted = true;
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where: whereClause,
        include: {
          club: {
            select: {
              clubId: true,
              clubName: true,
              city: true,
              state: true
            }
          },
          speakers: {
            include: {
              speaker: {
                select: {
                  id: true,
                  name: true,
                  role: true
                }
              }
            }
          },
          _count: {
            select: {
              registrations: true,
              speakers: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { date: 'desc' }
      }),
      prisma.event.count({ where: whereClause })
    ]);

    res.json({
      success: true,
      data: {
        events,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/events
// @desc    Create new event (matches Django EventListCreateAPIView - permission_classes commented out)
// @access  Public
router.post('/', [
  body('title').notEmpty().trim(),
  body('date').isISO8601(),
  body('clubId').notEmpty(),
  body('maxCapacity').optional().isInt({ min: 0 }),
  body('ticketPrice').optional().trim()
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
      title,
      description,
      date,
      time,
      location,
      image,
      highlighted,
      clubId,
      maxCapacity,
      ticketPrice,
      categories
    } = req.body;

    const event = await prisma.event.create({
      data: {
        title,
        description: description || null,
        date: new Date(date),
        time: time ? new Date(`1970-01-01T${time}:00Z`) : new Date(),
        location: location || null,
        image: image || null,
        highlighted: highlighted || false,
        clubId,
        maxCapacity: maxCapacity || 0,
        ticketPrice: ticketPrice || '0',
        categories: categories || null
      },
      include: {
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

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: { event }
    });

  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/events/:id
// @desc    Get event by ID (equivalent to Django EventRetrieveUpdateDestroyAPIView)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { eventId: id },
      include: {
        club: {
          select: {
            clubId: true,
            clubName: true,
            city: true,
            state: true,
            country: true,
            email: true,
            mobile: true
          }
        },
        speakers: {
          include: {
            speaker: true
          }
        },
        scheduleItems: {
          include: {
            scheduleItem: true
          }
        },
        photos: {
          include: {
            eventPhoto: true
          }
        },
        registrations: {
          select: {
            regId: true,
            name: true,
            email: true,
            phoneNumber: true,
            gender: true,
            occupation: true,
            fee: true
          }
        },
        _count: {
          select: {
            registrations: true
          }
        }
      }
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      data: { event }
    });

  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/events/:id
// @desc    Update event (matches Django EventRetrieveUpdateDestroyAPIView - permission_classes commented out)
// @access  Public
router.put('/:id', [
  body('title').optional().notEmpty().trim(),
  body('date').optional().isISO8601(),
  body('maxCapacity').optional().isInt({ min: 0 })
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

    // Remove undefined values and handle special fields
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }

    if (updateData.time) {
      updateData.time = new Date(`1970-01-01T${updateData.time}:00Z`);
    }

    const event = await prisma.event.update({
      where: { eventId: id },
      data: updateData,
      include: {
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

    res.json({
      success: true,
      message: 'Event updated successfully',
      data: { event }
    });

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    console.error('Update event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event (matches Django EventRetrieveUpdateDestroyAPIView - permission_classes commented out)
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.event.delete({
      where: { eventId: id }
    });

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    console.error('Delete event error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/events/:id/register
// @desc    Register for event (equivalent to Django EventRegisterAPIView)
// @access  Public
router.post('/:id/register', [
  body('name').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('phoneNumber').isLength({ min: 10, max: 10 }),
  body('gender').optional().isIn(['MALE', 'FEMALE', 'OTHER']),
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

    const { id } = req.params;
    const { name, email, phoneNumber, address, gender, occupation } = req.body;

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { eventId: id },
      select: {
        eventId: true,
        title: true,
        date: true,
        maxCapacity: true,
        ticketPrice: true,
        _count: {
          select: {
            registrations: true
          }
        }
      }
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Check if event is full
    if (event.maxCapacity > 0 && event._count.registrations >= event.maxCapacity) {
      return res.status(400).json({
        success: false,
        message: 'Event is full'
      });
    }

    // Check if user is already registered
    const existingRegistration = await prisma.eventRegistration.findFirst({
      where: {
        eventId: id,
        email: email
      }
    });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this event'
      });
    }

    // Create registration
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: id,
        name,
        email,
        phoneNumber,
        address: address || null,
        gender: gender || 'MALE',
        occupation: occupation || 'STUDENT',
        fee: parseFloat(event.ticketPrice) || 0.00
      },
      include: {
        event: {
          select: {
            eventId: true,
            title: true,
            date: true,
            time: true,
            location: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { registration }
    });

  } catch (error) {
    console.error('Event registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
