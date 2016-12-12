var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs'),
  xmlServer=require('./xmlServer').XMLServer;

  
var __port=3300;
app.listen(__port);

console.log('server listening on localhost:'+__port);

// load scores.html page on startup
function handler(req, res) {
  fs.readFile(__dirname + '/scores.html', function(err, data) {
    if (err) {
      console.log(err);
      res.writeHead(500);
      return res.end('Error loading scores.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}



// creating  a new websocket
io.sockets.on('connection', function(socket) {
	this.srv= new xmlServer(socket);
	this.srv.connect();
});