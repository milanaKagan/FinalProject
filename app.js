const express = require('express');
const authRoutes = require('./routes/authRoutes');
const anonRoutes = require('./routes/anonRoutes');
const adminRoutes = require('./routes/adminRoutes');
const airlineRoutes = require('./routes/airlineRoutes');
const customerRoutes = require('./routes/customerRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const { requireAuthAdmin, requireAuthCustomer, requireAuthAirline, checkUser } = require('./middleware/authMiddleware');
const swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "Flights Project Library API",
    },
    servers: [
      {
        url: "http://localhost:8080/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};


const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://milana:milana89@cluster0.wiq3z.mongodb.net/node-auth';


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

const app = express();
const port = 8080;

app.options('*', cors());

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
// view engine
app.set('view engine', 'ejs');


// routes
app.get('*', checkUser);
app.get('/', checkUser, (req, res) => res.render('home'));
app.get('/anonim', checkUser, (req, res) => res.render('anon'));
app.get('/admin', requireAuthAdmin, (req, res) => res.render('admin'));
app.get('/airline', requireAuthAirline, (req, res) => res.render('airline'));
app.get('/customer', requireAuthCustomer, (req, res) => res.render('customer'));


app.use(authRoutes);
app.use(anonRoutes);
app.use(adminRoutes);
app.use(airlineRoutes);
app.use(customerRoutes);

app.listen(port, () => console.log(`Listening to port ${port}`));


