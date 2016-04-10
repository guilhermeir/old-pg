var twitter = require('ntwitter');

const L = 45000;
const N = 900000;

var testController = {}
var client = new twitter({
  consumer_key: 'kwnaib2ckiRMeXW86429p9Y2I',
  consumer_secret: 'B9DU85zbBSXF6B1jSRzgNKz64WG9ZP0H1GvVWnIELpAGT5LerG',
  access_token_key: '454411264-xm4HQI2sKAFOwou5d02oeJRJIv4qcf9wxnw9GYbL',
  access_token_secret: 'rc5guWUrjSs8f9Sgf9Qgp9ZIc2kbpDh2GtQbQiTo6LdIU'
});

testController.index = function(req, res, next) {
  client.verifyCredentials(function(error, data){
    if(error){
      console.log("ERROR: ", error);
    }
    client.stream('statuses/filter', {'track': 'trump'}, function(stream){
      console.log("MONITORING TWITTER FOR 'TRUMP'...");
      var control = 0;

      stream.on('data', function(data){
        control = control + 1;
        console.log("TWIT #", control, ": ", data.text);
      });
      stream.on('error', function(msg, code){
        console.log("ERROR ", code, ": ", msg );
        control = 0;
      });
      stream.on('destroy', function(response){
        console.log("YOU REACH YOUT RATE LIMIT: ", response);
        control = 0;
      });

      if(control<L){
        stream.destroy;
      }
      //setTimeout(stream.destroy, N);
    });
  });
}

module.exports = testController;
