
var request = require('request')
  , JSONStream = require('JSONStream')
  , es = require('event-stream')


var ledPin = 8;

var firmata = require('../lib/firmata');
var board = new firmata.Board('COM10', function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('connected');
    console.log('Firmware: ' + board.firmware.name + '-' + board.firmware.version.major + '.' + board.firmware.version.minor);
    var ledOn = true;
    board.pinMode(ledPin, board.MODES.OUTPUT);



    setInterval(function() {

	    request({
		    rejectUnauthorized: false,
		    url: 'http://localhost:8080/job/Hello/api/json?pretty=true'
			})
		.pipe(JSONStream.parse('color')) 
		.pipe(es.mapSync(function (color) {

	console.log(color);


	if (color === "red") {
	    console.log('+');
	    board.digitalWrite(ledPin, board.HIGH);
	} else {
	    console.log('-');
	    board.digitalWrite(ledPin, board.LOW);
	}
}))


}, 2000);



});
