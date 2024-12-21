const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config.json'); // Import the config.json file

// Get the environment (development, test, production)
const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];  // Get the config for the current environment

// Set up Sequelize with the correct configuration
const sequelize = new Sequelize(
  configEnv.use_env_variable ? 
  process.env[configEnv.use_env_variable] :
  `mysql://${configEnv.username}:${configEnv.password}@${configEnv.host}:3306/${configEnv.database}`,
  configEnv
);

const models = {};  // To store models

// Dynamically import all models in the models folder
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    models[model.name] = model;  // Add model to the models object
  });

// Optionally, you can set up associations here (e.g., models.User.hasMany(models.Post))

/*Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});
*/

models.sequelize = sequelize;  // Export sequelize instance as well
models.Sequelize = Sequelize;

module.exports = models;
