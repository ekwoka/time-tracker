import { createComputed, createEffect } from 'solid-js';
import { createMutable } from 'solid-js/store';

import { createFileBeacon } from '@/hooks';
import { appSettings } from '@/hooks/createAppSetting';

import { getNextId } from '@/utils';

export const appState = createMutable({
  isWorking: false,
  currentTask: null,
  currentProject: null,
  currentSession: null,
  timer: '00:00',
} as AppState);

type AppState = {
  isWorking: boolean;
  currentTask: Task | null;
  currentProject: Project | null;
  currentSession: Session | null;
  timer: string;
};

export const projects = createFileBeacon<Project[]>('projectData.json', []);

export const sessions = createFileBeacon<Session[]>('sessionData.json', []);

createEffect(() => console.log(sessions.data()));

export const tasks = createFileBeacon<Task[]>('taskData.json', []);

export type Project = { id: number; name: string; active: boolean };
export type Task = {
  id: number;
  name: string;
  projectId: number;
  active: boolean;
};

export type Session = {
  id: number;
  start: number;
  end: number | null;
  taskId: number;
  active: boolean;
};

createComputed(
  () =>
    (appState.currentTask =
      appSettings.activeTask === -1
        ? null
        : tasks
            .data()
            .find(
              (task) => task.id === appSettings.activeTask && task.active,
            ) ?? null),
);

createComputed(
  () =>
    (appState.currentProject =
      appSettings.activeProject === -1
        ? null
        : projects
            .data()
            .find(
              (proj) => proj.id === appSettings.activeProject && proj.active,
            ) ?? null),
);

const resetSession = () => {
  sessions.data((prev) =>
    prev.map((s) => (s.end ? s : ((s.end = Date.now()), s))),
  );
  appState.currentSession = null;
};

createComputed(() => {
  if (!appSettings.tracking)
    if (appState.currentSession) return resetSession();
    else return;
  if (appState.currentSession)
    if (appState.currentTask?.id === appState.currentSession.taskId) return;
    else resetSession();
  if (!appState.currentTask || !appState.currentTask.active) return;
  const nextSession = {
    id: getNextId(sessions.data()),
    start: Date.now(),
    end: null,
    taskId: appSettings.activeTask,
    active: true,
  };
  sessions.data((prev) => (prev.push(nextSession), prev));
  appState.currentSession = nextSession;
});
