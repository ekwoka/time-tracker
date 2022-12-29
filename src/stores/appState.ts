import { createMutable } from 'solid-js/store';

import { createFileBeacon } from '@/hooks';

export const appState = createMutable({
  isWorking: false,
});

export const projects = createFileBeacon<{ id: number; name: string }[]>(
  'projectData.json',
  []
);

export const sessions = createFileBeacon<
  {
    start: number;
    end: number;
    projectId: number;
    taskId: number;
  }[]
>('sessionData.json', []);

export const tasks = createFileBeacon<
  { id: number; name: string; projectId: number }[]
>('taskData.json', []);
