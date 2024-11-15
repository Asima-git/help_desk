const dotenv = require("dotenv").config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToMongo = require('./dbConfig');
const authRoute = require('./routes/authRoute');
const ticketRoute = require('./routes/ticketRoute');
connectToMongo();
const port = process.env.HOST

const app = express();
app.use(cookieParser());

app.use(cors({
  origin: 'https://help-desk-psi-eight.vercel.app', 
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma"
  ],
  credentials: true
}));
app.use(cors({
  origin: 'https://help-desk-psi-eight.vercel.app/', 
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma"
  ],
  credentials: true
}));
// app.use(cookieParser());
app.use(express.json());
//Routes
app.use('/api/auth',authRoute)
app.use('/api/ticket',ticketRoute)



app.listen(process.env.HOST, () => {
    console.log(`Help Desk app listening on port ${port}`)
  })