var sentiment = require('sentiment');
var twitter = require('ntwitter');
var readable = require('stream').Readable;

const L = 45000;
const N = 900000;

var mainController = {}
var client = new twitter({
  consumer_key: 'kwnaib2ckiRMeXW86429p9Y2I',
  consumer_secret: 'B9DU85zbBSXF6B1jSRzgNKz64WG9ZP0H1GvVWnIELpAGT5LerG',
  access_token_key: '454411264-xm4HQI2sKAFOwou5d02oeJRJIv4qcf9wxnw9GYbL',
  access_token_secret: 'rc5guWUrjSs8f9Sgf9Qgp9ZIc2kbpDh2GtQbQiTo6LdIU'
});

mainController.index = function(req, res, next){
  var rs = readable();
  var phrase = req.query.phrase;

  if(phrase){
    rs._read = function(){
      client.verifyCredentials(function(error, data){
        if(error){
          console.log("AUTHENTICATION ERROR: ", error);
          //return res.status(500).send("Authentication problem!");
        } else {
          client.stream('statuses/filter', {'track': 'trump'}, function(stream){
            console.log("MONITORING TWITTER FOR 'TRUMP'...");
            var control = 0;

            stream.on('data', function(data){
              control = control + 1;
              rs.push("TWIT # " + control + ": " + data.text + "\n");
            });
            stream.on('error', function(msg, code){
              console.log("ERROR ", code, ": ", msg );
              control = 0;
              return res.status(500).send("Error: " + msg);
            });
            stream.on('destroy', function(response){
              console.log("YOU REACH YOUT RATE LIMIT: ", response);
              control = 0;
              return res.status(400).send("You have reached your rate limit");
            });

            if(control<L){
              stream.destroy;
            }
            setTimeout(stream.destroy, N);
          });
        }
      });
    };
    rs.pipe(process.stdout).pipe(res);
  } else {
    console.log("FAILED: CONNECTION ATTEMPT WITH NO PHRASE.");
    return res.status(404).send("You must set a phrase!");
  }
}
// mainController.index = function(req, res, next) {
//   var phrase = req.query.phrase;
//   if(phrase) {
//     var stream;
//     var monitor = {}
//     var rs = readable();
//     var client = new twitter({
//       consumer_key: '5fUQ1QzaQynWuYUpVFz1ulHlq',
//       consumer_secret: 'NsiYYfT5gkCuBrQZyIkq4GVaP5qvNZRznDWP83c1QWkMjpJEQ0',
//       access_token_key: '	454411264-swtJNTWrVqj5y8gK78HhCgEQYpRBkFrDCIRKRkl3',
//       access_token_secret: 'fMfHp7dZSjfxyIjDASa278l6zKLsrSCR7zqohMeygTzyK'
//     });
//
//     rs._read = function(){
//       console.log("uhuuul");
//       client.stream('statuses/filter', {track: phrase}, function(stream){
//         console.log("Got here");
//         stream.on('data', function(tweet){
//           console.log("TWEET: " + tweet.text);
//           rs.push("TWEET: " + tweet.text);
//         });
//         stream.on('error', function(error){
//           console.log("ERROR: ", error);
//         });
//       });
//     };
//     rs.pipe(process.stdout);
//   } else {
//     res.status(404).send("You must set a phrase!");
//   }
// }

module.exports = mainController;
