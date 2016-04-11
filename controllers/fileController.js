var fs = require('fs');

var fileController = {}

fileController.index = function(req, res, next) {
  var file = '/media/guilherme/16FAC87FFAC85C9D/twitter-data/21032016-2.json';
  var twits;

  fs.readFile(file, function(err, data){
    if (err) throw err;
    twits = JSON.parse(data);

    for(var i = 0; i< twits.length; i++){
      console.log(twits[i]);
    }
    res.status(200);//.send(data[1]);
  });

}

module.exports = fileController;
