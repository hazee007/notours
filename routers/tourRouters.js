const express = require('express');
const tourController = require('../controllers/tourController');

const tourRouter = express.Router();

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
} = tourController;

tourRouter.route('/top-5-tours').get(aliasTopTours, getAllTours);
tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = tourRouter;
