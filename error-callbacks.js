#!/usr/bin/env node
// Mock address based on process arguments
var myAddress = process.argv[2] || "empty";
function canSendTo(address) { return address != "empty"; }

// Mock letter
var myLetter = {
  sendTo: function (address, callback) { this.address = address; callback(); },
  getTrackingCode: function() { return "XYZ-" + this.address; },
}

// Asynchronous function with separate error callback
function postLetter(letter, address, onSuccess, onFailure) {
  if (canSendTo(address))
    letter.sendTo(address, function () {
      onSuccess(letter.getTrackingCode());
    });
  else
    onFailure("Cannot reach address " + address);
}

// Pass two callbacks
postLetter(myLetter, myAddress,
  function (trackingCode) {
    console.log("Letter sent with code " + trackingCode);
  },
  function (errorMessage) {
    console.error("Letter not sent: " + errorMessage);
  });
