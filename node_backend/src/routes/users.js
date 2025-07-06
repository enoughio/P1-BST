import express from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../config/database.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Private
router.get('/', [auth, adminAuth], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          mobile: true,
          gender: true,
          isActive: true,
          dateJoined: true,
          club: {
            select: {
              clubId: true,
              clubName: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { dateJoined: 'desc' }
      }),
      prisma.user.count()
    ]);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Users can only access their own data unless they're admin
    if (req.user.id !== id && !req.user.admins?.length && !req.user.isSuperuser) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id },
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
        isActive: true,
        dateJoined: true,
        club: {
          select: {
            clubId: true,
            clubName: true,
            city: true,
            state: true
          }
        },
        members: {
          select: {
            id: true,
            role: true,
            occupation: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { user }
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
