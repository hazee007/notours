const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const reviewRouter = express.Router({ mergeParams: true });

const {
  createReview,
  getAllReviews,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = reviewController;
const { protect, restrictTo } = authController;

reviewRouter.use(protect);

reviewRouter
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourUserIds, createReview);

reviewRouter
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('admin', 'user'), deleteReview);
module.exports = reviewRouter;
