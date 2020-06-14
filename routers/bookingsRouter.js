const express = require('express');
const authController = require('../controllers/authController');
const bookingsController = require('../controllers/bookingsController');

const bookingsRouter = express.Router();

const { protect, restrictTo } = authController;
const {
  createBooking,
  getAllBookings,
  getBooking,
  deleteBooking,
  updateBooking,
} = bookingsController;

bookingsRouter.use(protect);

bookingsRouter.get(
  '/checkout-session/:tourID',
  bookingsController.getCheckoutSession
);

bookingsRouter.use(restrictTo('admin', 'lead-guide'));

bookingsRouter.route('/').get(getAllBookings).post(createBooking);

bookingsRouter
  .route('/:id')
  .get(getBooking)
  .patch(updateBooking)
  .delete(deleteBooking);

module.exports = bookingsRouter;
