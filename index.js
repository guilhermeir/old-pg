var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var twitter = require('ntwitter');

var client = new twitter({
  consumer_key: 'kwnaib2ckiRMeXW86429p9Y2I',
  consumer_secret: 'B9DU85zbBSXF6B1jSRzgNKz64WG9ZP0H1GvVWnIELpAGT5LerG',
  access_token_key: '454411264-xm4HQI2sKAFOwou5d02oeJRJIv4qcf9wxnw9GYbL',
  access_token_secret: 'rc5guWUrjSs8f9Sgf9Qgp9ZIc2kbpDh2GtQbQiTo6LdIU'
});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('set phrase', function(_phrase){
    console.log('INCREMENT');
    var phrase = _phrase;

    io.emit('increment', phrase);
  });
  // socket.on('chat message', function(msg){
  //   client.verifyCredentials(function(error, data){
  //     if(error){
  //       io.emit('chat message', "AUTHENTICATION ERROR!");
  //     } else {
  //       client.stream('statuses/filter', {'track': msg}, function(stream){
  //         stream.on('data', function(data){
  //           io.emit('chat message', "TWIT: " + data.text);
  //         });
  //
  //         stream.on('error', function(error){
  //           io.emit('chat message', "ERROR: " + error);
  //         });
  //
  //         stream.on('destroy', function(response){
  //           io.emit('chat message', "DESTROYED: " + response)
  //         });
  //
  //         setTimeout(stream.destroy, 5000);
  //       });
  //     }
  //   })
  //});

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
