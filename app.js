var express = require('express');
var bodyParser = require('body-parser')
var twitter = require('./routes/twitter')
var pug = require('pug');
var app = express();

const port = 3000;

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', __dirname+'/views')
app.use('/static', express.static('public'));


app.get('/', function(req, res) {
  		
      var info = twitter(res);
  });
  
  

app.listen(port, function() {
	console.log(`Frontend server is running on localhost://${port}, press CTRL+C twice to eliminate`)
	
});