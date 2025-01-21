// const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables from .env

// Extract database credentials from .env
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT || 5432; // Default to 5432 if DB_PORT is not set
const dbSSL = process.env.DB_SSL === "true"; // Convert to boolean

// PostgreSQL configuration with Sequelize
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "postgres",
  dialectOptions: {
    ssl: dbSSL
      ? {
          require: true, // Ensure SSL is required
          rejectUnauthorized: false, // Allow self-signed certificates (set to true if using a trusted certificate)
        }
      : false, // Disable SSL if DB_SSL is set to false
  },
  logging: process.env.NODE_ENV === "development" ? console.log : false, // Log SQL queries only in development mode
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    acquire: 30000, // Maximum time (in ms) to try to connect before throwing an error
    idle: 10000, // Maximum time (in ms) a connection can be idle before being released
  },
});

// Test the connection to the database
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Optional: Synchronize database tables with models
const synchronizeDB = async () => {
  try {
    await sequelize.sync({ force: true }); // WARNING: force: true drops all tables and recreates them
    console.log("Database synchronized successfully.");
  } catch (err) {
    console.error("Error synchronizing the database:", err);
  }
};

// Uncomment the following line to synchronize the database (use with caution in production)
// synchronizeDB();

module.exports = sequelize;
