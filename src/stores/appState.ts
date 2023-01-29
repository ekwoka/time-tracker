import { createMutable } from 'solid-js/store';

import { createFileBeacon } from '@/hooks';

export const appState = createMutable({
  isWorking: false,
  currentTask: null,
  currentProject: null,
  timer: '00:00',
} as AppState);

type AppState = {
  isWorking: boolean;
  currentTask: Task | null;
  currentProject: Project | null;
  timer: string;
};

export const projects = createFileBeacon<Project[]>('projectData.json', []);

export const sessions = createFileBeacon<Session[]>('sessionData.json', []);

export const tasks = createFileBeacon<Task[]>('taskData.json', []);

type Project = { id: number; name: string };
type Task = { id: number; name: string; projectId: number };

type Session = {
  start: number;
  end: number;
  projectId: number;
  taskId: number;
};
