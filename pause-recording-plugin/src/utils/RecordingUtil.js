import { Manager } from '@twilio/flex-ui';
const manager = Manager.getInstance();

class RecordingUtil {
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
