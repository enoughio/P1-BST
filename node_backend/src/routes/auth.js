import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { prisma } from '../config/database.js';
import { auth, adminAuth, superAdminAuth } from '../middleware/auth.js';

const router = express.Router();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Handle trailing slash for Django compatibility
// router.get('/login/', (req, res) => res.redirect('/api/accounts/login'));
// router.post('/login/', (req, res) => res.redirect(307, '/api/accounts/login'));

// @route   GET /api/auth/login
// @desc    Login endpoint info (for compatibility)
// @access  Public
router.get('/login', (req, res) => {
  res.status(405).json({
    success: false,
    message: 'Method not allowed. Use POST to login.',
    allowedMethods: ['POST'],
    example: {
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'user@example.com',
        password: 'password'
      }
    }
  });
});

// @route   POST /api/auth/login
// @desc    Login user (equivalent to Django LoginAPIView)
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').exists()
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

    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
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
        },
        admins: {
          select: {
            id: true,
            role: true
          }
        }
      }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    // Generate token
    const token = generateToken(user.id);

    // Set secure HTTP-only cookie
    const cookieOptions = {
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === 'production', // HTTPS in production
      sameSite: 'lax', // CSRF protection
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/' // Available across the entire domain
    };

    res.cookie('authToken', token, cookieOptions);

    // Remove password from response
    const { password: userPassword, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword
        // Note: We don't send the token in response anymore for security
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (equivalent to Django LogoutAPIView)
// @access  Private
router.post('/logout', auth, async (req, res) => {
  try {
    // Clear the auth cookie
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during logout'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user (equivalent to Django get_current_user)
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
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
        isStaff: true,
        isSuperuser: true,
        dateJoined: true,
        lastLogin: true,
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
        },
        members: {
          select: {
            id: true,
            role: true,
            occupation: true
          }
        },
        admins: {
          select: {
            id: true,
            role: true
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

// @route   POST /api/auth/members/create
// @desc    Register a new member (equivalent to Django RegisterMemberAPIView)
// @access  Public
router.post('/members/create', [
  body('email').isEmail().normalizeEmail(),
  body('username').isLength({ min: 3 }).trim(),
  body('password').isLength({ min: 6 }),
  body('firstName').optional().trim(),
  body('lastName').optional().trim()
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
      email, username, password, firstName, lastName, 
      mobile, gender, dob, clubId, occupation, address 
    } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user and member in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          firstName: firstName || null,
          lastName: lastName || null,
          mobile: mobile || null,
          gender: gender || 'MALE',
          dob: dob ? new Date(dob) : new Date(),
          clubId: clubId || null,
          address: address || null
        }
      });

      // Create member record
      const member = await tx.member.create({
        data: {
          userId: user.id,
          role: 'Member',
          occupation: occupation || 'STUDENT'
        }
      });

      return { user, member };
    });

    // Get complete user data for response
    const userData = await prisma.user.findUnique({
      where: { id: result.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        mobile: true,
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

    // Generate token
    const token = generateToken(result.user.id);

    // Set secure HTTP-only cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/'
    };

    res.cookie('authToken', token, cookieOptions);

    res.status(201).json({
      success: true,
      message: 'Member registered successfully',
      data: {
        user: userData
        // Note: Token is now in HTTP-only cookie
      }
    });

  } catch (error) {
    console.error('Member registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/admins/create
// @desc    Register a new admin (equivalent to Django RegisterAdminAPIView)
// @access  Private (SuperAdmin only)
router.post('/admins/create', [
  auth,
  superAdminAuth,
  body('email').isEmail().normalizeEmail(),
  body('username').isLength({ min: 3 }).trim(),
  body('password').isLength({ min: 6 }),
  body('firstName').optional().trim(),
  body('lastName').optional().trim()
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
      email, username, password, firstName, lastName, 
      mobile, gender, dob, clubId, role 
    } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user and admin in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          firstName: firstName || null,
          lastName: lastName || null,
          mobile: mobile || null,
          gender: gender || 'MALE',
          dob: dob ? new Date(dob) : new Date(),
          clubId: clubId || null,
          isStaff: true
        }
      });

      // Create admin record
      const admin = await tx.admin.create({
        data: {
          userId: user.id,
          role: role || 'ADMIN'
        }
      });

      return { user, admin };
    });

    // Get complete user data for response
    const userData = await prisma.user.findUnique({
      where: { id: result.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        mobile: true,
        gender: true,
        dob: true,
        isActive: true,
        isStaff: true,
        dateJoined: true,
        club: {
          select: {
            clubId: true,
            clubName: true,
            city: true,
            state: true
          }
        },
        admins: {
          select: {
            id: true,
            role: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      data: {
        user: userData
      }
    });

  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/refresh
// @desc    Refresh authentication token
// @access  Private
router.post('/refresh', auth, async (req, res) => {
  try {
    // Generate new token
    const newToken = generateToken(req.user.id);

    // Set new secure HTTP-only cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/'
    };

    res.cookie('authToken', newToken, cookieOptions);

    res.json({
      success: true,
      message: 'Token refreshed successfully'
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during token refresh'
    });
  }
});

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', [
  auth,
  body('currentPassword').exists(),
  body('newPassword').isLength({ min: 6 })
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

    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword }
    });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
