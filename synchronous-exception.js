#!/usr/bin/env node
// Use case: http://ruben.verborgh.org/blog/2012/12/31/asynchronous-error-handling-in-javascript/#synchronous-error-handling

// Mock address based on process arguments
var myAddress = process.argv[2] || "empty";
function canSendTo(address) { return address != "empty"; }

// Mock letter
var myLetter = {
  sendTo: function (address) { this.address = address; },
  getTrackingCode: function() { return "XYZ-" + this.address; },
}

// Synchronous function with exception
function postLetter(letter, address) {
  if (canSendTo(address)) {
    letter.sendTo(address);
    return letter.getTrackingCode();
  }
  throw "Cannot reach address " + address;
}

// Catch a possible exception
try {
  var trackingCode = postLetter(myLetter, myAddress);
  console.log("Letter sent with code " + trackingCode);
}
catch (errorMessage) {
  console.error("Letter not sent: " + errorMessage);
}
