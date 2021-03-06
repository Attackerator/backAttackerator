'use strict';

const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connection.db || mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once('open', () => {console.log('mongo connected');});
mongoose.connection.on('error', (err) => {console.log(err);});
