//zip -r ../yourfilename.zip *

'use strict';
var Alexa = require("alexa-sdk");

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers, nameHandlers);
    alexa.execute();
};

var handlers = {
    'NewSession': function() {
        this.handler.state = '_NAMESTATE';

        this.emit(':ask', 'Who would you like to sing happy birthday to?');
    },
    'LaunchRequest': function () {

        this.handler.state = '_NAMESTATE';

        this.emit(':ask', 'Who would you like to sing happy birthday to?');
        
    },
    "AMAZON.StopIntent": function() {
        this.emit(':tell', "Thanks for playing");  
    },
};

var nameHandlers = Alexa.CreateStateHandler('_NAMESTATE', {
	'NewSession': function () {
        this.handler.state = '';
        this.emitWithState('NewSession'); // Equivalent to the Start Mode NewSession handler
    },
    'NameIntent': function() {
        
        var name = this.event.request.intent.slots.Name.value;

        this.emit(':tell', '<prosody pitch="x-high" rate="slow">Happy birthday to you. Happy birthday to you. Happy birthday dear</prosody>, <prosody pitch="x-low" rate="slow">' + name + '.</prosody><prosody pitch="x-high" rate="slow">Happy birthday to you.</prosody>');

    },
    'AMAZON.HelpIntent': function() {
        this.emit(':tell', "Goodbye!");
    },
    "AMAZON.StopIntent": function() {
        this.emit(':tell', "Goodbye!");  
    },
    "AMAZON.CancelIntent": function() {
        console.log("CANCELINTENT");
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', "Goodbye!");
    },
    'Unhandled': function() {
        this.emit(':tell', "Unhandled!");
    }

});



