import { Manager } from '@twilio/flex-ui';
const manager = Manager.getInstance();

class RecordingUtil {
  startCallRecording = async (callSid) => {
    console.debug('Creating recording for call SID:', callSid);
    const fetchUrl = `${process.env.REACT_APP_SERVICE_BASE_URL}/call-recording/create-recording`;
  
    const fetchBody = {
      Token: manager.store.getState().flex.session.ssoTokenPayload.token,
      callSid
    };
    const fetchOptions = {
      method: 'POST',
      body: new URLSearchParams(fetchBody),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    };
  
    let recording;
    try {
      const recordingResponse = await fetch(fetchUrl, fetchOptions);
      recording = await recordingResponse.json();
      console.debug('Created recording', recording);
    } catch (error) {
      console.error(`Error creating recording for call SID ${callSid}.`, error);
    }
  
    return recording;
  }


  getRecording = (callSid) => {
    return new Promise((resolve, reject) => {
      const body = {
        callSid: callSid,
        Token: manager.store.getState().flex.session.ssoTokenPayload.token
      };
      // Set up the HTTP options for your request
      const options = {
        method: 'POST',
        body: new URLSearchParams(body),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      };
      // Make the network request using the Fetch API
      fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/call-recording/list-recordings`, options)
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
          resolve(data);
        }).catch(e => {
          console.log("ERROR List Call Recording Failed : ", e);
          reject(e);
        });
    });
  }

  resumeRecording = (callSid, recSid) => {
    return new Promise((resolve, reject) => {
      const body = {
        callSid: callSid,
        recSid: recSid,
        Token: manager.store.getState().flex.session.ssoTokenPayload.token
      };
      // Set up the HTTP options for your request
      const options = {
        method: 'POST',
        body: new URLSearchParams(body),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      };
      // Make the network request using the Fetch API
      fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/call-recording/resume-recording`, options)
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
          resolve(data);
        }).catch(e => {
          console.log("ERROR Resume Call Recording Failed : ", e);
          reject(e);
        });
    });
  }

  pauseRecording = (callSid) => {
    return new Promise((resolve, reject) => {
      const body = {
        callSid: callSid,
        Token: manager.store.getState().flex.session.ssoTokenPayload.token
      };
      // Set up the HTTP options for your request
      const options = {
        method: 'POST',
        body: new URLSearchParams(body),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      };
      // Make the network request using the Fetch API
      fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/call-recording/pause-recording`, options)
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          resolve(data);
        }).catch(e => {
          console.log("ERROR Pause Call Recording Failed : ", e);
          reject(e);
        });
    });
  }
}

const recordingUtil = new RecordingUtil();

export default recordingUtil;
