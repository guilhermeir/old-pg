var express = require("express");

var mainController = require("./controllers/mainController.js");
var fileController = require("./controllers/fileController.js");
var testController = require("./controllers/testController.js");

var port = 3000;

var app = express();

app.get('/sent', mainController.index);
app.get('/file', fileController.index);
app.get('/test', testController.index);

app.listen(port);

console.log("Server listening on port " + port);
