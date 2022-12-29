import { autoAnimate } from 'solid-auto-animate';

import { For } from 'solid-js';

import { createBeacon } from '@/hooks';

import { projects, tasks } from '@/stores';

import { TaskListTabs } from './TaskListTabs';

export const TaskLists = () => {
  autoAnimate;
  const activeProject = createBeacon<number>(projects.data()[0]?.id ?? -1);
  const taskInput = createBeacon('');
  return (
    <div class="p-4 text-neutral-300 tracking-wider flex flex-col gap-8">
      <h2 class="text-xl">TaskLists</h2>
      <TaskListTabs projects={projects} activeProject={activeProject} />
      <div class="flex flex-col gap-4 w-full text-neutral-300" use:autoAnimate>
        <For
          each={
            tasks.ready()
              ? tasks
                  .data()
                  .filter((task) => task.projectId === activeProject())
              : []
          }>
          {(task) => (
            <div class="flex flex-row gap-4">
              <span class="w-full">{task.name}</span>
              <button
                class="bg-neutral-800 rounded py-2 px-4 min-w-max hover:bg-red-800 transition-colors"
                onClick={() => {
                  const toRemove = tasks
                    .data()
                    .findIndex((t) => t.id === task.id);
                  tasks.data((prev) => (prev.splice(toRemove, 1), prev));
                }}>
                Remove
              </button>
            </div>
          )}
        </For>
      </div>
      <div class="flex gap-4">
        <input
          type="text"
          class="w-full bg-neutral-700"
          value={taskInput()}
          onInput={({ target }) =>
            taskInput((target as HTMLInputElement).value)
          }
        />
        <button
          type="button"
          class="py-2 px-4 rounded-md bg-neutral-900 min-w-max"
          onClick={() => {
            const nextId = Math.max(...tasks.data().map((task) => task.id)) + 1;
            tasks.data(
              (prev) => (
                prev.push({
                  id: nextId,
                  name: taskInput(),
                  projectId: activeProject(),
                }),
                prev
              )
            );
            taskInput('');
          }}>
          Add Task
        </button>
      </div>
    </div>
  );
};
