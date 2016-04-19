var twitter = require('ntwitter');

var client = new twitter({
  consumer_key: 'kwnaib2ckiRMeXW86429p9Y2I',
  consumer_secret: 'B9DU85zbBSXF6B1jSRzgNKz64WG9ZP0H1GvVWnIELpAGT5LerG',
  access_token_key: '454411264-xm4HQI2sKAFOwou5d02oeJRJIv4qcf9wxnw9GYbL',
  access_token_secret: 'rc5guWUrjSs8f9Sgf9Qgp9ZIc2kbpDh2GtQbQiTo6LdIU'
});

client.verifyCredentials(function(error, data){
  if(error){
    io.emit('chat message', "AUTHENTICATION ERROR!");
  } else {
    client.stream('statuses/filter', {'track': 'dilma'}, function(stream){
      stream.on('data', function(data){
        console.log("TWEET:", data);
      });

      stream.on('error', function(error){
        console.log('chat message', "ERROR: " + error);
      });

      stream.on('destroy', function(response){
        console.log('chat message', "DESTROYED: " + response)
      });

      setTimeout(stream.destroy, 5000);
    });
  }
});
