// import express from 'express';
// import Razorpay from 'razorpay';
// import crypto from 'crypto';
// import { body, validationResult } from 'express-validator';
// import { prisma } from '../config/database.js';
// import { auth } from '../middleware/auth.js';

// const router = express.Router();

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // @route   POST /api/razorpay/order/create
// // @desc    Create Razorpay order (equivalent to Django RazorpayOrderAPIView)
// // @access  Private
// router.post('/order/create', [
//   auth,
//   body('amount').isFloat({ min: 1 }),
//   body('currency').optional().isIn(['INR', 'USD']),
//   body('registrationId').optional().isInt(),
//   body('eventId').optional().isInt()
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors: errors.array()
//       });
//     }

//     const { amount, currency = 'INR', registrationId, eventId } = req.body;

//     // Convert amount to paisa (smallest currency unit)
//     const amountInPaisa = Math.round(amount * 100);

//     const options = {
//       amount: amountInPaisa,
//       currency,
//       receipt: `receipt_${Date.now()}`,
//       payment_capture: 1
//     };

//     const order = await razorpay.orders.create(options);

//     // Store order details in database if needed
//     if (registrationId) {
//       await prisma.payment.create({
//         data: {
//           registrationId: parseInt(registrationId),
//           amount: parseFloat(amount),
//           paymentMethod: 'ONLINE',
//           status: 'PENDING',
//           transactionId: order.id,
//           paymentGateway: 'RAZORPAY'
//         }
//       });
//     }

//     res.json({
//       success: true,
//       message: 'Order created successfully',
//       data: {
//         orderId: order.id,
//         amount: order.amount,
//         currency: order.currency,
//         key: process.env.RAZORPAY_KEY_ID
//       }
//     });

//   } catch (error) {
//     console.error('Create Razorpay order error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to create order',
//       error: error.message
//     });
//   }
// });

// // @route   POST /api/razorpay/order/complete
// // @desc    Complete Razorpay payment (equivalent to Django TransactionAPIView)
// // @access  Private
// router.post('/order/complete', [
//   auth,
//   body('razorpay_order_id').exists(),
//   body('razorpay_payment_id').exists(),
//   body('razorpay_signature').exists()
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors: errors.array()
//       });
//     }

//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       registrationId
//     } = req.body;

//     // Verify payment signature
//     const body = razorpay_order_id + '|' + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest('hex');

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: 'Payment verification failed'
//       });
//     }

//     // Fetch payment details from Razorpay
//     const payment = await razorpay.payments.fetch(razorpay_payment_id);

//     if (payment.status === 'captured') {
//       // Update payment record in database
//       const updatedPayment = await prisma.payment.updateMany({
//         where: {
//           transactionId: razorpay_order_id,
//           status: 'PENDING'
//         },
//         data: {
//           status: 'COMPLETED',
//           notes: `Payment ID: ${razorpay_payment_id}`
//         }
//       });

//       // Update registration status if applicable
//       if (registrationId) {
//         await prisma.registration.update({
//           where: { id: parseInt(registrationId) },
//           data: { paymentStatus: 'PAID' }
//         });
//       }

//       res.json({
//         success: true,
//         message: 'Payment completed successfully',
//         data: {
//           paymentId: razorpay_payment_id,
//           orderId: razorpay_order_id,
//           amount: payment.amount / 100, // Convert back to rupees
//           status: payment.status
//         }
//       });
//     } else {
//       // Update payment as failed
//       await prisma.payment.updateMany({
//         where: {
//           transactionId: razorpay_order_id,
//           status: 'PENDING'
//         },
//         data: {
//           status: 'FAILED',
//           notes: `Payment failed. Status: ${payment.status}`
//         }
//       });

//       res.status(400).json({
//         success: false,
//         message: 'Payment was not successful',
//         data: {
//           status: payment.status
//         }
//       });
//     }

//   } catch (error) {
//     console.error('Complete Razorpay payment error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to complete payment',
//       error: error.message
//     });
//   }
// });

// // @route   POST /api/razorpay/webhook
// // @desc    Handle Razorpay webhooks
// // @access  Public (but verified)
// router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
//   try {
//     const signature = req.headers['x-razorpay-signature'];
//     const body = req.body;

//     // Verify webhook signature
//     const expectedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
//       .update(body)
//       .digest('hex');

//     if (signature !== expectedSignature) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid webhook signature'
//       });
//     }

//     const event = JSON.parse(body);
    
//     switch (event.event) {
//       case 'payment.captured':
//         // Handle successful payment
//         const paymentEntity = event.payload.payment.entity;
//         await prisma.payment.updateMany({
//           where: {
//             transactionId: paymentEntity.order_id,
//             status: 'PENDING'
//           },
//           data: {
//             status: 'COMPLETED',
//             notes: `Webhook - Payment ID: ${paymentEntity.id}`
//           }
//         });
//         break;

//       case 'payment.failed':
//         // Handle failed payment
//         const failedPayment = event.payload.payment.entity;
//         await prisma.payment.updateMany({
//           where: {
//             transactionId: failedPayment.order_id,
//             status: 'PENDING'
//           },
//           data: {
//             status: 'FAILED',
//             notes: `Webhook - Payment failed: ${failedPayment.error_description}`
//           }
//         });
//         break;

//       default:
//         console.log('Unhandled webhook event:', event.event);
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Webhook processed successfully'
//     });

//   } catch (error) {
//     console.error('Razorpay webhook error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Webhook processing failed'
//     });
//   }
// });

// // @route   GET /api/razorpay/payment/:paymentId
// // @desc    Get payment details from Razorpay
// // @access  Private (Admin only)
// router.get('/payment/:paymentId', auth, async (req, res) => {
//   try {
//     const { paymentId } = req.params;

//     const payment = await razorpay.payments.fetch(paymentId);

//     res.json({
//       success: true,
//       data: {
//         id: payment.id,
//         amount: payment.amount / 100, // Convert to rupees
//         currency: payment.currency,
//         status: payment.status,
//         method: payment.method,
//         captured: payment.captured,
//         created_at: payment.created_at
//       }
//     });

//   } catch (error) {
//     console.error('Get Razorpay payment error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch payment details'
//     });
//   }
// });

// // @route   POST /api/razorpay/refund
// // @desc    Process refund through Razorpay
// // @access  Private (Admin only)
// router.post('/refund', [
//   auth,
//   body('paymentId').exists(),
//   body('amount').optional().isFloat({ min: 1 })
// ], async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors: errors.array()
//       });
//     }

//     const { paymentId, amount } = req.body;

//     // Check if user is admin
//     if (!req.user.isStaff) {
//       return res.status(403).json({
//         success: false,
//         message: 'Access denied. Admin privileges required.'
//       });
//     }

//     const refundOptions = {
//       payment_id: paymentId
//     };

//     if (amount) {
//       refundOptions.amount = Math.round(amount * 100); // Convert to paisa
//     }

//     const refund = await razorpay.payments.refund(paymentId, refundOptions);

//     // Update payment status in database
//     await prisma.payment.updateMany({
//       where: {
//         notes: {
//           contains: paymentId
//         }
//       },
//       data: {
//         status: 'REFUNDED',
//         notes: `Refunded: ${refund.id}`
//       }
//     });

//     res.json({
//       success: true,
//       message: 'Refund processed successfully',
//       data: {
//         refundId: refund.id,
//         amount: refund.amount / 100,
//         status: refund.status
//       }
//     });

//   } catch (error) {
//     console.error('Razorpay refund error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to process refund'
//     });
//   }
// });


import express from 'express'

const router = express.Router();
router.get('/', (req, res) => {
    res.send("hello from razorpay")
})

export default router;
