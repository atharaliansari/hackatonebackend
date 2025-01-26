const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoutes');
const crudRoute = require('./routes/crudRoutes');
const businessRoute = require('./routes/BusinessRoutes');
const ConstructionRoute = require('./routes/ConstructionRoutes');
const EducationRoute = require('./routes/EducationRoutes');
const WeddingRoute = require('./routes/WeddingRoutes');
require('dotenv').config();
const App = express();
const cors = require('cors');

// Middleware
App.use(cors());
App.use(express.json());

App.get('/', (req, res) => {
    res.send('Welcome to the Backend API!');
});

// Routes
App.use('/auth', authRoute);
App.use('/crud', crudRoute);
App.use('/api', ConstructionRoute);
App.use('/api', businessRoute);
App.use('/api', EducationRoute);
App.use('/api', WeddingRoute);

mongoose.connect(process.env.MONGO_URI)
    .then((res) => {
        App.listen(5000, () => {
            console.log('Mongo Db COnnected and Server started')
        })
    })
    .catch((err) => {
        console.log(err, 'erro')
    })