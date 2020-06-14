const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingsController = require('../controllers/bookingsController');

const viewRouter = express.Router();

viewRouter.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);

viewRouter.get(
  '/',
  bookingsController.createBookingCheckOut,
  authController.isLoggedIn,
  viewController.getOverview
);
viewRouter.get('/me', authController.protect, viewController.getAccount);
viewRouter.get('/my-tours', authController.protect, viewController.getMyTour);

viewRouter.use(authController.isLoggedIn);
viewRouter.get('/tour/:slug', viewController.getTour);
viewRouter.get('/login', viewController.getLoginForm);

module.exports = viewRouter;
