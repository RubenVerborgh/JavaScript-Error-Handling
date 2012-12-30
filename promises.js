#!/usr/bin/env node
// Mock address based on process arguments
var myAddress = process.argv[2] || "empty";
function canSendTo(address) { return address != "empty"; }

// Mock letter
var myLetter = {
  sendTo: function (address, callback) { this.address = address; callback(); },
  getTrackingCode: function() { return "XYZ-" + this.address; },
}

var $ = require('./lib/jquery-stub.js');

// Asynchronous function that returns a promise
function postLetter(letter, address) {
  var deferred = new $.Deferred();
  if (canSendTo(address))
    letter.sendTo(address, function () {
      deferred.resolve(letter.getTrackingCode());
    });
  else
    deferred.reject("Cannot reach address " + address);
  return deferred.promise();
}

// Register callbacks on promise
var trackingCodePromise = postLetter(myLetter, myAddress);
trackingCodePromise.done(function (trackingCode) {
  console.log("Letter sent with code " + trackingCode);
});
trackingCodePromise.fail(function (errorMessage) {
  console.log("Letter not sent: " + errorMessage);
});
