const express = require('express');
const router = express.Router();
const { Itinerary } = require('../models');

router.get('/:nights', async (req, res) => {
  const nights = parseInt(req.params.nights);
  const recommendation = await Itinerary.findOne({
    where: { nights },
    include: ['Hotels', 'Transfers', 'Activities']
  });

  if (!recommendation) {
    return res.status(404).json({ message: 'No itinerary found for that duration' });
  }

  res.json(recommendation);
});

module.exports = router;
