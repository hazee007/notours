const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');

const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routers/tourRouters');
const userRouter = require('./routers/userRouters');

const app = express();
app.use(express.json());

// Global Middlewares
// Set Security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/app', limiter);

// Body passer, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitizationagainst XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//Serving Static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use('/app/v1/tours', tourRouter);
app.use('/app/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
