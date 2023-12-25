const { Sequelize } = require('sequelize');
const db = require('./db');

async function syncDatabase() {
  try {
    await db.sync();
    console.log('Database synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing the database:', error.message);
  }
}

module.exports = syncDatabase;
