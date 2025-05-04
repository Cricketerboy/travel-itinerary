const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const itineraryRoutes = require('./routes/itineraries');
const mcpRoutes = require('./mcp/recommend');

const app = express();
app.use(bodyParser.json());

app.use('/itineraries', itineraryRoutes);
app.use('/recommend', mcpRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
