const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModels');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, { for local connection
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection established! 👍'));

// ReadJson File 😃 ,
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8')
);

// Import data to database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Date created successfully 😃');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete Previous data from database
const deleteAllData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Deleted 💥');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteAllData();
}

console.log(process.argv);
