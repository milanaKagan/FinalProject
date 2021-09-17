const express = require('express');
const authRoutes = require('./routes/authRoutes');
const anonRoutes = require('./routes/anonRoutes');
const adminRoutes = require('./routes/adminRoutes');
const airlineRoutes = require('./routes/airlineRoutes');
const customerRoutes = require('./routes/customerRoutes');
const cookieParser = require('cookie-parser');
const { requireAuthAdmin,requireAuthCustomer, requireAuthAirline, checkUser } = require('./middleware/authMiddleware');


const app = express();
const port = 8080;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


// view engine
app.set('view engine', 'ejs');


// routes
app.get('*', checkUser);
app.get('/', checkUser,(req, res) => res.render('home'));
app.get('/anonim', checkUser,(req, res) => res.render('anon'));
app.get('/admin', requireAuthAdmin, (req, res) => res.render('admin'));
app.get('/airline', requireAuthAirline, (req, res) => res.render('airline'));
app.get('/customer', requireAuthCustomer, (req, res) => res.render('customer'));

app.use(authRoutes);
app.use(anonRoutes);
app.use(adminRoutes);
app.use(airlineRoutes);
app.use(customerRoutes);

app.listen(port, () => console.log(`Listening to port ${port}`));
