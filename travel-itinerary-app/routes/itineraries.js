const express = require('express');
const router = express.Router();
const { Itinerary, Hotel, Transfer, Activity } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { name, nights, hotels, transfers, activities } = req.body;
    const itinerary = await Itinerary.create({ name, nights });

    await Promise.all([
      ...hotels.map(h => Hotel.create({ ...h, ItineraryId: itinerary.id })),
      ...transfers.map(t => Transfer.create({ ...t, ItineraryId: itinerary.id })),
      ...activities.map(a => Activity.create({ ...a, ItineraryId: itinerary.id })),
    ]);

    res.status(201).json({ message: 'Itinerary created', itinerary });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/', async (req, res) => {
  const itineraries = await Itinerary.findAll({
    include: [Hotel, Transfer, Activity]
  });
  res.json(itineraries);
});

module.exports = router;
