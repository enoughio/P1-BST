import express from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../config/database.js';
import { auth, adminAuth, superAdminAuth, roleAuth, USER_ROLES } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/bst/clubs
// @desc    Get all clubs with pagination
// @access  Public (matches Django ClubListAPIView - no permission_classes)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    const whereClause = search ? {
      OR: [
        { clubName: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { state: { contains: search, mode: 'insensitive' } }
      ]
    } : {};

    const [clubs, total] = await Promise.all([
      prisma.club.findMany({
        where: whereClause,
        include: {
          initiative: {
            select: {
              id: true,
              title: true,
              eligibleAge: true
            }
          },
          _count: {
            select: {
              users: true,
              events: true,
              meetings: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { clubName: 'asc' }
      }),
      prisma.club.count({ where: whereClause })
    ]);

    res.json({
      success: true,
      data: {
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
    console.error('Get clubs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/bst/clubs/:id
// @desc    Get club by ID
// @access  Public (matches Django ClubRetrieveUpdateDestroyAPIView - permission_classes commented out)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const club = await prisma.club.findUnique({
      where: { clubId: id },
      include: {
        initiative: {
          select: {
            id: true,
            title: true,
            description: true,
            eligibleAge: true,
            maxClubSize: true,
            membership: {
              select: {
                id: true,
                name: true,
                fee: true,
                durationInMonths: true
              }
            }
          }
        },
        users: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
            dateJoined: true,
            members: {
              select: {
                id: true,
                role: true,
                occupation: true
              }
            }
          },
          where: { isActive: true }
        },
        events: {
          select: {
            eventId: true,
            title: true,
            date: true,
            time: true,
            image: true,
            highlighted: true,
            attendees: true,
            maxCapacity: true
          },
          orderBy: { date: 'desc' },
          take: 5
        },
        meetings: {
          select: {
            meetingId: true,
            title: true,
            date: true,
            startTime: true,
            meetingType: true
          },
          orderBy: { date: 'desc' },
          take: 5
        }
      }
    });

    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found'
      });
    }

    res.json({
      success: true,
      data: { club }
    });

  } catch (error) {
    console.error('Get club error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/bst/clubs
// @desc    Create a new club
// @access  Public (matches Django ClubCreateAPIView - permission_classes commented out)
router.post('/', [
  body('clubName').notEmpty().trim(),
  body('city').notEmpty().trim(),
  body('state').notEmpty().trim(),
  body('country').notEmpty().trim(),
  body('postalCode').notEmpty().trim()
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
      clubName,
      street,
      city,
      state,
      postalCode,
      country,
      meetingTime,
      map,
      image,
      description,
      email,
      mobile,
      initiativeId
    } = req.body;

    const club = await prisma.club.create({
      data: {
        clubName,
        street: street || null,
        city,
        state,
        postalCode,
        country,
        meetingTime: meetingTime || 'Tuesdays, 6:30 PM',
        map: map || null,
        image: image || null,
        description: description || null,
        email: email || null,
        mobile: mobile || null,
        initiativeId: initiativeId || null
      },
      include: {
        initiative: {
          select: {
            id: true,
            title: true,
            description: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Club created successfully',
      data: { club }
    });

  } catch (error) {
    console.error('Create club error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/bst/clubs/:id
// @desc    Update club
// @access  Public (matches Django ClubRetrieveUpdateDestroyAPIView - permission_classes commented out)
router.put('/:id', [
  body('clubName').optional().notEmpty().trim(),
  body('city').optional().notEmpty().trim(),
  body('state').optional().notEmpty().trim(),
  body('country').optional().notEmpty().trim()
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

    const club = await prisma.club.update({
      where: { clubId: id },
      data: updateData,
      include: {
        initiative: {
          select: {
            id: true,
            title: true,
            description: true
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Club updated successfully',
      data: { club }
    });

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Club not found'
      });
    }
    console.error('Update club error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/bst/clubs/:id
// @desc    Delete club
// @access  Public (matches Django ClubRetrieveUpdateDestroyAPIView - permission_classes commented out)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.club.delete({
      where: { clubId: id }
    });

    res.json({
      success: true,
      message: 'Club deleted successfully'
    });

  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Club not found'
      });
    }
    console.error('Delete club error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
