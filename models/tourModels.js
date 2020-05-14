const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A toure must have a name '],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    require: [true, 'A toure must have a duration '],
  },
  maxGroupSize: {
    type: Number,
    require: [true, 'A toure must have a group size'],
  },
  difficulty: {
    type: String,
    require: [true, 'A toure must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    require: [true, 'A toure must have a price'],
  },
  proceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    require: [true, 'A toure must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    require: [true, 'A toure must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: new Date(),
    select: false,
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
