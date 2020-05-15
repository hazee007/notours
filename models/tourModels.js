const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'A toure must have a name '],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour must have at most 40 characters'],
      minlength: [10, 'A tour must have at least 10 characters'],
      // validate: [validator.isAlpha, 'Tour name must only contain characters'],
    },
    slug: String,
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Ratings must be above 1'],
      max: [5, 'Ratings must be below 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      require: [true, 'A toure must have a price'],
    },
    proceDiscount: {
      type: Number,
      validate: {
        validator: function (value) {
          // this will not work on updating, only works on new documents creation,
          return value < this.price;
        },
        message: 'Discount price ({VALUE}) must be below regular price',
      },
    },
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
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

tourSchema.virtual('durationInWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before the save() and create() only
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lowercase: true });
  next();
});

// QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (doc, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
