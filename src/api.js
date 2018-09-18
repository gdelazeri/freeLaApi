/* Dependencies */
const cors = require('cors');
const bodyParser = require('body-parser');

/* Routes */
const userRoutes = require('./routes/user');

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
app.use('/user', userRoutes);

/* Startup */
app.listen(process.env.PORT, () => {
  console.log(`API started on port ${process.env.PORT}`);
});
