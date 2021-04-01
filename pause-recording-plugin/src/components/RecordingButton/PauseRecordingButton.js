import React from 'react';
import { Notifications, TaskHelper, IconButton, Actions, Manager, withTaskContext } from '@twilio/flex-ui';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Actions as RecordingStatusActions, } from '../../states/RecordingState';
import RecordingUtil from '../../utils/RecordingUtil';

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

  handleClick = async (callSid) => {
    if (recordingPaused) {
      Notifications.showNotification(RESUME_RECORDING);
      try {
        const rec = await RecordingUtil.resumeRecording(callSid, recSid);
        this.setState(recState);
        console.log("Resume Recording");
        console.log('Recording Sid Returned: ', rec.sid, 'status:', rec.status);
        //Update app state in Redux store
        this.props.setRecordingStatus(rec.status);
        recordingPaused = false;
      } catch (err) {
        console.log('Failed to resume recording');
      }
    } else {
      Notifications.showNotification(RECORDING_PAUSED);
      try {
        const rec = await RecordingUtil.pauseRecording(callSid);
        this.setState(pauseState);
        console.log("Pause Recording");
        recSid = rec.sid;
        console.log('Recording Sid Returned: ', recSid, 'status:', rec.status);
        //Update app state in Redux store
        this.props.setRecordingStatus(rec.status);
        recordingPaused = true;
      } catch (err) {
        console.log('Failed to pause recording');
      }
    }
  }


  render() {
    const isLiveCall = TaskHelper.isLiveCall(this.props.task);
    const callSid = this.props.task.attributes.call_sid;
    return (
      <IconButton
        icon={this.state.icon}
        key="pause_button"
        style={{ "color": this.state.color }}
        disabled={!isLiveCall}
        title={this.state.label}
        onClick={() => this.handleClick(callSid)}
      />
    );
  }
}
//recording object contains status
const mapStateToProps = state => {
  return {
    status: state['pause-recording']?.recording?.status
  };
}
const mapDispatchToProps = (dispatch) => ({
  setRecordingStatus: bindActionCreators(RecordingStatusActions.setRecordingStatus, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTaskContext(PauseRecordingButton));
