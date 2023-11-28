const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
const authRoute = require('./routes/auth/auth');
const profileRoute = require('./routes/profile/profile');
const uploadImage = require('./routes/image/image')
const bodyParser = require('body-parser');
const connectDB = require('./db')
require('dotenv').config();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());

app.use(cors(
    {
        origin: 'http://localhost:5173',
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    }
))

app.use('/auth', authRoute)
app.use('/profile', profileRoute)
app.use('/upload', uploadImage)





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})