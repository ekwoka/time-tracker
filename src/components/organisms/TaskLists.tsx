import { autoAnimate } from 'solid-auto-animate';

import { For } from 'solid-js';

import { createAppSetting, createBeacon } from '@/hooks';

import { projects, tasks } from '@/stores';

import { classNames, getNextId, setActive } from '@/utils';

import { TaskListTabs } from './TaskListTabs';

export const TaskLists = () => {
  autoAnimate;
  const { data: activeProject } = createAppSetting('activeProject');
  const { data: activeTask } = createAppSetting('activeTask');
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
                  .filter(
                    (task) => task.active && task.projectId === activeProject(),
                  )
              : []
          }>
          {(task) => (
            <div
              class={classNames(
                'flex flex-row gap-4 rounded overflow-hidden p-1 transition-colors duration-500',
                activeTask() === task.id && 'bg-gray-600',
              )}>
              <button
                class="w-full text-left"
                onClick={() => activeTask(task.id)}>
                {task.name} {task.id}
              </button>
              <button
                class={classNames(
                  'bg-neutral-800 rounded py-2 px-4 min-w-max transition-colors font-medium tracking-wide',
                  activeTask() === task.id
                    ? 'hover:bg-red-600'
                    : 'hover:bg-red-800',
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  tasks.data(setActive(task.id, false));
                  if (activeTask() === task.id) activeTask(-1);
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
            const nextId = getNextId(tasks.data());
            tasks.data(
              (prev) => (
                prev.push({
                  id: nextId,
                  name: taskInput(),
                  projectId: activeProject(),
                  active: true,
                }),
                prev
              ),
            );
            taskInput('');
          }}>
          Add Task
        </button>
      </div>
    </div>
  );
};
