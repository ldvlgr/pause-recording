const TokenValidator = require('twilio-flex-token-validator').functionValidator;

exports.handler = TokenValidator(async function (context, event, callback) {
  const client = context.getTwilioClient();
  const callSid = event.callSid;
  console.log('Pause recording for call Sid: ', callSid);
  
  // Create a custom Twilio Response
  // Set the CORS headers to allow Flex to make an HTTP request to the Twilio Function
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Use the NodeJS Helper Library to make an API call.
  try {
    let recording = await client.calls(callSid)
      .recordings('Twilio.CURRENT')
      .update({ status: 'paused' });
      
    console.log(JSON.stringify(recording));
    console.log('Recording Sid: ', recording.sid);
    response.appendHeader('Content-Type', 'application/json');
    response.setBody(recording);
    // Return a success response using the callback function.
    callback(null, response);
  }
  catch (err) {
    response.appendHeader('Content-Type', 'plain/text');
    response.setBody(err.message);
    console.log(err.message);
    response.setStatusCode(500);
    // If there's an error, send an error response
    // Keep using the response object for CORS purposes
    callback(null, response);

  }
});