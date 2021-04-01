const TokenValidator = require('twilio-flex-token-validator').functionValidator;

exports.handler = TokenValidator(async function (context, event, callback) {
  const client = context.getTwilioClient();
  const callSid = event.callSid;
  console.log('List recordings for call Sid: ', callSid);

  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    let recording = {};
    let recList = await client.recordings
      .list({ callSid: callSid, limit: 20 })

    console.log('Recording count:', recList.length);
    for (let i = 0; i < recList.length; i++) {
      //Find recording inititated for inbound call thru studio flow
      if (recList[i].source == 'StartCallRecordingAPI') {
        recording = recList[i];
        console.log('Recording Sid: ', recording.sid);
        break;
      }
    }
    console.log(JSON.stringify(recording));

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