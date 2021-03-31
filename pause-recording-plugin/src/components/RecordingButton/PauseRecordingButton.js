import React from 'react';
import { Notifications, TaskHelper, IconButton, Actions, Manager, withTaskContext } from '@twilio/flex-ui';
import { connect } from "react-redux";

const manager = Manager.getInstance();
var recordingPaused = false;
let recSid; //store recording Sid
const RECORDING_PAUSED = 'RecordingPaused';
const RESUME_RECORDING = 'ResumeRecording';
const pauseState = {
  icon: 'EyeBold',
  color: 'red',
  label: 'Resume'
};

const recState = {
  icon: 'Eye',
  color: 'green',
  label: 'Pause'
};
class PauseRecordingButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = recState;
  }

  handleClick = () => {
    if (recordingPaused) {
      this.resumeRecording();
      //stop timer
      //save total pause time in conversation_measure_3 attribute
    } else {
      this.pauseRecording();
      //start timer
    }
  }

  resumeRecording() {
    Notifications.showNotification(RESUME_RECORDING);
    const body = {
      callSid: this.props.task.attributes.call_sid,
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
        console.log(data)
        this.setState(recState);
        console.log("Resume Recording");
        recordingPaused = false;
      }).catch(e => {
        console.log("ERROR Resume Call Recording Failed : ", e);
      });

  }


  pauseRecording() {
    Notifications.showNotification(RECORDING_PAUSED);
    const body = {
      callSid: this.props.task.attributes.call_sid,
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
        this.setState(pauseState);
        console.log("Pause Recording");
        recSid = data.sid;
        console.log('Recording Sid Returned: ', recSid);
        recordingPaused = true;
      }).catch(e => {
        console.log("ERROR Pause Call Recording Failed : ", e);
      });
  }



  render() {
    const isLiveCall = TaskHelper.isLiveCall(this.props.task);
    return (
      <IconButton
        icon={this.state.icon}
        key="pause_button"
        style={{ "color": this.state.color }}
        disabled={!isLiveCall}
        title={this.state.label}
        onClick={this.handleClick}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
  };

}
export default connect(mapStateToProps)(withTaskContext(PauseRecordingButton));

