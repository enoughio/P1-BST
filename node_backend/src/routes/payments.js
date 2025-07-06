import express from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../config/database.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/payments
// @desc    Get all payments with pagination
// @access  Private (Admin only)
router.get('/', [auth, adminAuth], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status;

    let whereClause = {};

    if (status) {
      whereClause.status = status;
    }

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where: whereClause,
        include: {
          registration: {
            include: {
              event: {
                select: {
                  eventId: true,
                  title: true,
                  date: true
                }
              }
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.payment.count({ where: whereClause })
    ]);

    res.json({
      success: true,
      data: {
        payments,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Additional routes for payment management

// @route   GET /api/payments/:id
// @desc    Get payment by ID
// @access  Private (Admin only)
router.get('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(id) },
      include: {
        registration: {
          include: {
            event: {
              select: {
                eventId: true,
                title: true,
                date: true,
                registrationFee: true
              }
            },
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
        }
      }
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      data: { payment }
    });

  } catch (error) {
    console.error('Get payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/payments
// @desc    Create a new payment record
// @access  Private
router.post('/', [
  auth,
  body('registrationId').isInt(),
  body('amount').isFloat({ min: 0 }),
  body('paymentMethod').isIn(['ONLINE', 'CASH', 'CARD', 'UPI']),
  body('status').optional().isIn(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'])
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
      registrationId,
      amount,
      paymentMethod,
      status,
      transactionId,
      paymentGateway,
      notes
    } = req.body;

    const payment = await prisma.payment.create({
      data: {
        registrationId: parseInt(registrationId),
        amount: parseFloat(amount),
        paymentMethod,
        status: status || 'PENDING',
        transactionId: transactionId || null,
        paymentGateway: paymentGateway || null,
        notes: notes || null
      },
      include: {
        registration: {
          include: {
            event: {
              select: {
                eventId: true,
                title: true
              }
            }
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Payment record created successfully',
      data: { payment }
    });

  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/payments/:id
// @desc    Update payment status
// @access  Private (Admin only)
router.put('/:id', [
  auth,
  adminAuth,
  body('status').isIn(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED']),
  body('transactionId').optional().trim(),
  body('notes').optional().trim()
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

    const payment = await prisma.payment.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        registration: {
          include: {
            event: {
              select: {
                eventId: true,
                title: true
              }
            }
          }
        }
      }
    });

    res.json({
      success: true,
      message: 'Payment updated successfully',
      data: { payment }
    });

  } catch (error) {
    console.error('Update payment error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/payments/user/:userId
// @desc    Get payments for a specific user
// @access  Private
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Check if user is accessing their own payments or is admin
    if (req.user.id !== parseInt(userId) && !req.user.isStaff) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where: {
          registration: {
            member: {
              userId: parseInt(userId)
            }
          }
        },
        include: {
          registration: {
            include: {
              event: {
                select: {
                  eventId: true,
                  title: true,
                  date: true
                }
              }
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.payment.count({
        where: {
          registration: {
            member: {
              userId: parseInt(userId)
            }
          }
        }
      })
    ]);

    res.json({
      success: true,
      data: {
        payments,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('Get user payments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
