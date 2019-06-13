const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const postRoute = require('./routes/post');
// returing us an express app
const config = require('./utils/config');
const app = express();
const PORT = process.env.PORT || 3001;
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

// writing to our database in the mongodb and is name:first

app.use(bodyParser.json({
  limit: '15mb',
  extended: true,
}));

app.use(bodyParser.urlencoded({
  limit: '15mb',
  extended: true,
}));

console.log(`app: Setting up cors with options ${JSON.stringify(config[env].cors)}`);
app.use(cors(config[env].cors));
app.use('/admin/posts', postRoute);
app.listen(PORT, () => {
  console.log(`connected to server on PORT ${PORT}`);
});


module.exports = app;
