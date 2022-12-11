import { For } from 'solid-js';

import { createBeacon } from '@/hooks';

import { classNames } from '@/utils';

export const TaskLists = () => {
  const activeProject = createBeacon<number>(projects[0].id);
  return (
    <div class="p-4 text-neutral-200 tracking-wider">
      <h2 class="text-xl">TaskLists</h2>
      <nav class="flex flex-row gap-5 p-2">
        <For each={projects}>
          {(proj) => (
            <button
              type="button"
              onClick={() => activeProject(proj.id)}
              class={classNames(
                'px-2 tracking-wide',
                activeProject() === proj.id &&
                  'border-blue-500  border-b font-semibold'
              )}>
              {proj.name}
            </button>
          )}
        </For>
      </nav>
    </div>
  );
};

const projects = [
  {
    id: 1,
    name: 'Project 1',
  },
  {
    id: 2,
    name: 'Project 2',
  },
];
