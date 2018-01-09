var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = 3200;
var config = require('./config/database'); 
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var user = require('./routes/user');
var socket = require('socket.io');
var user1 = require('./models/user');
var server=app.listen(port,()=>{
	console.log('connected to port = '+port);
});

mongoose.connect(config.database);

mongoose.connection.on('connected',()=>{
	console.log('connected to database');

});

mongoose.connection.on('error',()=>
{
	console.log('error connecting to database');
});

app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});
app.use(cors());
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended : false}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/user',user);
var io=socket(server);

/*io.on('connection',function(socket){
console.log('made socket connection',socket.id);

	socket.on('bid',function(data)
	{
		io.sockets.emit('bid',data);
	});

});
*/
var currentPrice =0;
io.on('connection', function (socket) {
	console.log('here');
	socket.emit('priceUpdate',currentPrice);
	socket.on('bid', function (data) {
	console.log('here1');

		currentPrice = parseInt(data);
		socket.emit('priceUpdate2',currentPrice);
		socket.broadcast.emit('priceUpdate2',currentPrice);
	});
});