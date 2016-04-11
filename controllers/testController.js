var twitter = require('ntwitter');
var readable = require('stream').Readable;

var testController = {}
var client = new twitter({
  consumer_key: 'kwnaib2ckiRMeXW86429p9Y2I',
  consumer_secret: 'B9DU85zbBSXF6B1jSRzgNKz64WG9ZP0H1GvVWnIELpAGT5LerG',
  access_token_key: '454411264-xm4HQI2sKAFOwou5d02oeJRJIv4qcf9wxnw9GYbL',
  access_token_secret: 'rc5guWUrjSs8f9Sgf9Qgp9ZIc2kbpDh2GtQbQiTo6LdIU'
});

testController.index = function(req, res, next) {
  var rs = readable();
  var phrase = req.query.phrase;
  var control = 0;

  if(phrase){
    rs._read = function(){
      client.verifyCredentials(function(error, data){
        if(error){
          rs.push("AUTH ERROR: " + error + "\n");
        }
        client.stream('statuses/filter', {'track': phrase}, function(stream){
          rs.push("MONITORING TWITTER FOR '"+phrase+"'...\n");

          stream.on('data', function(data){
            control = control + 1;
            rs.push("TWIT # " + control + ": " + data.text + "\n");
          });
          stream.on('error', function(msg, code){
            control = control + 1;
            rs.push("ERROR #" + control + ": " + error + "\n");
            control = 0;
            stream.destroy;
          });
          stream.on('destroy', function(response){
            rs.push("EOF: ", response);
            control = 0;
          });
        });
      });
    };

    rs.pipe(process.stdout).pipe(res);
  } else {
    res.status(404).send("You need to set a phrase!");
  }
}

module.exports = testController;
