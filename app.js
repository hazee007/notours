const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routers/tourRouters');
const userRouter = require('./routers/userRouters');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  console.log('right here :smile');
  next();
});

app.use('/app/v1/tours', tourRouter);
app.use('/app/v1/users', userRouter);

module.exports = app;
