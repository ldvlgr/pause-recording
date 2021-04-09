import { combineReducers } from 'redux';
import { reduce as RecordingReducer } from './RecordingState';

// Register your redux store under a unique namespace
export const namespace = 'pause-recording';

// Combine the reducers
export default combineReducers({
  recording: RecordingReducer
});
