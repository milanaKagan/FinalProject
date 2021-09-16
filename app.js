const express = require('express');
const authRoutes = require('./routes/authRoutes');
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
app.get('/', checkUser,(req, res) => res.render('home-anon'));
app.get('/admin', requireAuthAdmin, (req, res) => res.render('admin'));
app.get('/airline', requireAuthAirline, (req, res) => res.render('airline'));
app.get('/customer', requireAuthCustomer, (req, res) => res.render('customer'));

app.use(authRoutes);

app.listen(port, () => console.log(`Listening to port ${port}`));
