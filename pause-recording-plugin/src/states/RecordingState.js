const ACTION_SET_REC_STATUS = 'SET_REC_STATUS';

const initialState = {};

export class Actions {
  static setRecordingStatus = (status) => ({ type: ACTION_SET_REC_STATUS, status });
};

export function reduce(state = initialState, action) {
  switch (action.type) {
    case ACTION_SET_REC_STATUS: {
      return {status: action.status};
    }
    default:
      return state;
  }
};
