import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Manager, withTheme, withTaskContext } from '@twilio/flex-ui';
import RecordingUtil from '../../utils/RecordingUtil';
import { Actions as RecordingStatusActions, } from '../../states/RecordingState';


class RecordingStatusPanel extends React.Component {
  //Get initial recording status
  componentDidMount() {
    RecordingUtil.getRecording(this.props.task.attributes.call_sid)
    .then(rec => {
      console.log('Recording Sid Returned: ', rec.sid, 'status:', rec.status);
      //Update app state in Redux store
      this.props.setRecordingStatus(rec.status);
    });
  }

  render() {

    return (
      <span>
        <p>Recording: {this.props.status}</p>
      </span>
    );
  }
}


const mapStateToProps = state => {
  return {
    status: state['pause-recording']?.recording?.status
  };
}
const mapDispatchToProps = (dispatch) => ({
  setRecordingStatus: bindActionCreators(RecordingStatusActions.setRecordingStatus, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(withTaskContext(RecordingStatusPanel)));