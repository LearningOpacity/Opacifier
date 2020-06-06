const express = require('express');
const Reciever = require('./Receiver');

const app = express();

app.use(Reciever.processRequest);
