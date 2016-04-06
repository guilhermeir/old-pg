var sentiment = require('sentiment');
var twitter = require('twitter');
var readable = require('stream').Readable;

var mainController = {}

mainController.index = function(req, res, next) {
  var phrase = req.query.phrase;
  if(phrase) {
    var stream;
    var monitor = {}
    var rs = readable();
    var client = new twitter({
      consumer_key: '5fUQ1QzaQynWuYUpVFz1ulHlq',
      consumer_secret: 'NsiYYfT5gkCuBrQZyIkq4GVaP5qvNZRznDWP83c1QWkMjpJEQ0',
      access_token_key: '	454411264-swtJNTWrVqj5y8gK78HhCgEQYpRBkFrDCIRKRkl3',
      access_token_secret: 'fMfHp7dZSjfxyIjDASa278l6zKLsrSCR7zqohMeygTzyK'
    });

    rs._read = function(){
      console.log("uhuuul");
      client.stream('statuses/filter', {track: phrase}, function(stream){
        console.log("Got here");
        stream.on('data', function(tweet){
          console.log("TWEET: " + tweet.text);
          rs.push("TWEET: " + tweet.text);
        });
        stream.on('error', function(error){
          console.log("ERROR: ", error);
        });
      });
    };
    rs.pipe(process.stdout);
  } else {
    res.status(404).send("You must set a phrase!");
  }
}

module.exports = mainController;
