const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const viewRouter = express.Router();

viewRouter.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);

viewRouter.get('/me', authController.protect, viewController.getAccount);

viewRouter.use(authController.isLoggedIn);
viewRouter.get('/', viewController.getOverview);
viewRouter.get('/tour/:slug', viewController.getTour);
viewRouter.get('/login', viewController.getLoginForm);

module.exports = viewRouter;
