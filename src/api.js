/* Dependencies */
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

/* Routes */
const clientRoutes = require('./routes/client');

/* Express initialization */
const app = express();

/* Express utilites */
app.use(cors());
app.use(bodyParser.json({
  limit: process.env.BODY_LIMIT,
}));

/* Status endpoint */
app.get('/status', (req, res) => {
  res.send('API Online');
});

/* Routes */
app.use('/client', clientRoutes);

/* Startup */
const port = 3000 | process.env.PORT;
app.listen(port, () => {
  console.log(`API started on port ${port}`);
});
