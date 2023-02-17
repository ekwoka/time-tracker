import { Modal } from '@/components/molecules';
import { Icon } from 'solid-heroicons';
import { pencilSquare, plus } from 'solid-heroicons/solid-mini';

import { useNavigate } from '@solidjs/router';
import { For, Show, createMemo } from 'solid-js';

import { Beacon, FileBeacon, createBeacon } from '@/hooks';

import { Project } from '@/stores';

import { classNames, getNextId } from '@/utils';

export const TaskListTabs = (props: TaskListTabsProps) => {
  const addProjectIsOpen = createBeacon(false);
  const projectName = createBeacon('');
  const navigate = useNavigate();
  const currentProjects = createMemo(() =>
    props.projects.ready()
      ? props.projects.data().filter((proj) => proj.active)
      : []
  );
  return (
    <nav class="flex flex-row gap-3 p-2 items-center max-w-full overflow-x-scroll">
      <Show when={props.projects.ready() && !currentProjects().length}>
        No Projects
      </Show>
      <For each={props.projects.ready() ? currentProjects() : []}>
        {(proj) => (
          <div
            class={classNames(
              'tracking-wide min-w-max',
              props.activeProject() === proj.id &&
                'border-blue-500  border-b font-semibold'
            )}>
            <button
              type="button"
              onClick={() => props.activeProject(proj.id)}
              class="p-2 hover:text-neutral-50 min-w-max">
              {proj.name}
            </button>
          </div>
        )}
      </For>
      <button
        type="button"
        onClick={() => addProjectIsOpen(true)}
        class="hover:bg-neutral-400 hover:text-neutral-800 transition-colors rounded">
        <Icon path={plus} class="w-5 h-5" />
      </button>
      <Modal onClose={() => addProjectIsOpen(false)} open={addProjectIsOpen}>
        <h2 class="text-2xl">Add New Project</h2>
        <p>Please Enter a new name for the project</p>
        <input
          type="text"
          class="w-full bg-neutral-700 text-neutral-100 rounded"
          value={projectName()}
          onInput={({ target }) => {
            projectName((target as HTMLInputElement).value);
          }}
        />
        <div class="modal-action">
          <button
            type="button"
            onClick={() => {
              const currentProjects = props.projects.data();
              if (
                currentProjects.some(
                  (proj) =>
                    proj.name.toLowerCase() === projectName().toLowerCase()
                )
              )
                return;
              const nextId = getNextId(currentProjects);
              currentProjects.push({
                id: nextId,
                name: projectName(),
                active: true,
              });
              props.projects.data(currentProjects);
              addProjectIsOpen(false);
              projectName('');
            }}
            class="btn btn-success"
            disabled={!projectName()}>
            Add Project
          </button>
          <button
            type="button"
            onClick={() => addProjectIsOpen(false)}
            class="btn btn-error">
            Cancel
          </button>
        </div>
      </Modal>
      <button
        type="button"
        onClick={() => navigate('/projects')}
        class="hover:bg-neutral-400 hover:text-neutral-800 transition-colors rounded p-[.125rem]">
        <Icon path={pencilSquare} class="w-4 h-4" />
      </button>
    </nav>
  );
};

type TaskListTabsProps = {
  activeProject: Beacon<number>;
  projects: FileBeacon<Project[]>;
};
