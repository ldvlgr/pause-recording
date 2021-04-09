import React from 'react';
import { VERSION, Notifications, NotificationType } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import reducers, { namespace } from './states';
import PauseRecordingButton from './components/RecordingButton/PauseRecordingButton';
import RecordingStatusPanel from './components/RecordingStatusPanel/RecordingStatusPanel';

const PLUGIN_NAME = 'PauseRecordingPlugin';
import './listeners/CustomListeners';

export default class PauseRecordingPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);

    const RECORDING_PAUSED = 'RecordingPaused';
    const RESUME_RECORDING = 'ResumeRecording';
    const PAUSE_FAILED = 'PauseFailed';
    const RESUME_FAILED = 'ResumeFailed';
    manager.strings[RECORDING_PAUSED] = (
      'Call recording has been paused. Please remember to resume call recording after collecting payment information.'
    );
    manager.strings[RESUME_RECORDING] = (
      'Resuming recording this call.'
    );
    manager.strings[PAUSE_FAILED] = (
      'FAILED to pause call recording. Please try again.'
    );
    manager.strings[RESUME_FAILED] = (
      'FAILED to resume call recording. Please try again.'
    );

    Notifications.registerNotification({
      id: RECORDING_PAUSED,
      closeButton: true,
      content: RECORDING_PAUSED,
      type: NotificationType.warning,
      timeout: 3000
    });
    Notifications.registerNotification({
      id: RESUME_RECORDING,
      closeButton: true,
      content: RESUME_RECORDING,
      type: NotificationType.success,
      timeout: 3000
    });
    Notifications.registerNotification({
      id: PAUSE_FAILED,
      closeButton: true,
      content: PAUSE_FAILED,
      type: NotificationType.error,
      timeout: 3000
    });
    Notifications.registerNotification({
      id: RESUME_FAILED,
      closeButton: true,
      content: RESUME_FAILED,
      type: NotificationType.error,
      timeout: 3000
    });



    flex.CallCanvasActions.Content.add(
      <PauseRecordingButton icon="Eye" key="recording_button"></PauseRecordingButton>
    );//

    flex.CallCanvas.Content.add(
      <RecordingStatusPanel key="recording-status-panel"> </RecordingStatusPanel>, {
        sortOrder: -1
      });
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
