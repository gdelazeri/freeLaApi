/* Dependencies */
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

/* Routes */
const clientRoutes = require('./routes/client');
const professionalRoutes = require('./routes/professional');
const loginRoutes = require('./routes/login');
const projectRoutes = require('./routes/project');

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
app.use('/professional', professionalRoutes);
app.use('/login', loginRoutes);
app.use('/project', projectRoutes);

/* Startup */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API started on port ${port}`);
});
