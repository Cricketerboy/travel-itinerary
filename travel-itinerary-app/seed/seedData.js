const { sequelize, Itinerary, Hotel, Transfer, Activity } = require('../models');

async function seed() {
  await sequelize.sync({ force: true });

  const itinerary = await Itinerary.create({ name: 'Phuket-Krabi Special', nights: 5 });

  await Hotel.bulkCreate([
    { name: 'Phuket Hotel', location: 'Phuket', day: 1, ItineraryId: itinerary.id },
    { name: 'Krabi Resort', location: 'Krabi', day: 3, ItineraryId: itinerary.id },
  ]);

  await Transfer.bulkCreate([
    { from: 'Phuket', to: 'Krabi', day: 3, ItineraryId: itinerary.id },
  ]);

  await Activity.bulkCreate([
    { name: 'Island Tour', description: 'Visit Phi Phi Island', day: 2, ItineraryId: itinerary.id },
    { name: 'Beach Relax', description: 'Krabi Beach Time', day: 4, ItineraryId: itinerary.id },
  ]);

  console.log('Database seeded');
}

seed();
