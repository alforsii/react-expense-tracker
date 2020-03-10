const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.MONGODB_URI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(x =>
    console.log(`Connected to Mongo Database: ${x.connections[0].name}`.cyan)
  )
  .catch(err => console.log(`Error while trying to connect to mongoDB ${err}`));
