#!/usr/bin/env node
// Use case: http://ruben.verborgh.org/blog/2012/12/31/asynchronous-error-handling-in-javascript/#domain-bound-exceptions

// Mock address based on process arguments
var myAddress = process.argv[2] || "empty";
function canSendTo(address) { return address != "empty"; }

// Mock letter
var myLetter = {
  sendTo: function (address, callback) { this.address = address; callback(); },
  getTrackingCode: function() { return "XYZ-" + this.address; },
}

// Asynchronous function with callback and exceptions
function postLetter(letter, address, callback) {
  if (!canSendTo(address))
    throw "Cannot reach address " + address;
  letter.sendTo(address, function () {
    callback(letter.getTrackingCode());
  });
}

var domain = require('domain');

// Call function in domain
var postDomain = domain.create();
postDomain.on('error', function (errorMessage) {
  console.log("Letter not sent: " + errorMessage);
});
postDomain.run(function () {
  postLetter(myLetter, myAddress, function (trackingCode) {
    console.log("Letter sent with code " + trackingCode);
  });
});
