#!/usr/bin/env node
// Mock address based on process arguments
var myAddress = process.argv[2] || "empty";
function canSendTo(address) { return address != "empty"; }

// Mock letter
var myLetter = {
  sendTo: function (address, callback) { this.address = address; callback(); },
  getTrackingCode: function() { return "XYZ-" + this.address; },
}

// Asynchronous function with single callback
function postLetter(letter, address, callback) {
  if (canSendTo(address))
    letter.sendTo(address, function () {
      callback(null, letter.getTrackingCode());
    });
  else
    callback("Cannot reach address " + address);
}

// Pass single callback
postLetter(myLetter, myAddress,
  function (errorMessage, trackingCode) {
    if (errorMessage)
      return console.error("Letter not sent: " + errorMessage);
    console.log("Letter sent with code " + trackingCode);
  })
