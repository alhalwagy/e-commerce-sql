const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const db = require('./DB/db');

const port = process.env.PORT || 3000;

const app = require('./app');

db.authenticate()
  .then(() => {
    console.log(`Database has successfuly connected.`);
  })
  .catch((error) => {
    console.log('DB Faild to connect.', error);
  });

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
