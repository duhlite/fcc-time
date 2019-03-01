// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment');
var app = express();

app.set('port',process.env.PORT || 8080);
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
  var date = req.params.date_string;
  var unixDate;
  var utcDate;
  console.log(!isNaN(date));
  
  if(moment.utc(date, 'YYYY-M-D', true).isValid()) {
    unixDate = Math.floor(new Date().getTime()/1000.0);
    utcDate = new Date(date).toUTCString();
     res.json ({ unix: unixDate, utc: utcDate});
  } else if(!isNaN(date)) {
    unixDate = date;
    utcDate = new Date(date * 1000).toUTCString();
     res.json ({ unix: unixDate, utc: utcDate});
  } else if(date === undefined) {
    unixDate = new Date().getTime();
    utcDate = new Date().toUTCString();
     res.json ({ unix: unixDate, utc: utcDate});
  } else {
    res.json({error: 'Invalid Date'});}
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});