import { createComputed } from 'solid-js';

import { appState, tasks } from '@/stores';

import { createAppSetting } from './createAppSetting';
import { createComputedTitle } from './createComputedTitle';

export const createApp = () => {
  const activeTask = createAppSetting('activeTask', -1);
  createComputed(() => {
    if (activeTask.ready() && activeTask.data() !== -1)
      appState.currentTask =
        tasks.data().find(({ id }) => id === activeTask.data()) ?? null;
  });

  createComputedTitle(() => {
    if (appState.isWorking)
      return `${
        appState.currentTask ? appState.currentTask.name : 'Working'
      } - ${appState.timer}`;
    return 'Idle';
  });
};
