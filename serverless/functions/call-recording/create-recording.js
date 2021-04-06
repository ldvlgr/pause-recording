const TokenValidator = require('twilio-flex-token-validator').functionValidator;
const Twilio = require('twilio');

exports.handler = TokenValidator(async function(context, event, callback) {
  const client = context.getTwilioClient();
  const callSid = event.callSid;
  
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (!callSid) {
    response.appendHeader('Content-Type', 'plain/text');
    response.setBody('Missing callSid parameter');
    response.setStatusCode(400);
    return callback(null, response);
  }

  try {
    console.log('Creating dual recording for call SID', callSid);
    const recording = await client.calls(callSid)
      .recordings
      .create({
        recordingChannels: 'dual'
      });
    response.appendHeader('Content-Type', 'application/json');
    response.setBody(recording);
  } catch (error) {
    response.appendHeader('Content-Type', 'plain/text');
    response.setBody(error.message);
    response.setStatusCode(500);
  }

  callback(null, response);
});
