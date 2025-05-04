const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './db.sqlite' });

const Itinerary = sequelize.define('Itinerary', {
  name: DataTypes.STRING,
  nights: DataTypes.INTEGER,
});

const Hotel = sequelize.define('Hotel', {
  name: DataTypes.STRING,
  location: DataTypes.STRING,
  day: DataTypes.INTEGER,
});

const Transfer = sequelize.define('Transfer', {
  from: DataTypes.STRING,
  to: DataTypes.STRING,
  day: DataTypes.INTEGER,
});

const Activity = sequelize.define('Activity', {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  day: DataTypes.INTEGER,
});

// Relations
Itinerary.hasMany(Hotel);
Hotel.belongsTo(Itinerary);

Itinerary.hasMany(Transfer);
Transfer.belongsTo(Itinerary);

Itinerary.hasMany(Activity);
Activity.belongsTo(Itinerary);

module.exports = {
  sequelize,
  Itinerary,
  Hotel,
  Transfer,
  Activity
};
