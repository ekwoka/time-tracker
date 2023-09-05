import { Show } from 'solid-js';

import { createBeacon } from '@/hooks';

import { projects } from '@/stores';

export const SimpleProjectCard = ({ project, onDelete }: ProjectCardProps) => {
  const projectName = createBeacon(project.name);
  const isEditing = createBeacon(false);
  return (
    <div class="p-4 flex flex-row gap-5 items-center">
      <Show
        when={isEditing()}
        fallback={<h2 class="text-xl tracking-wider grow">{project.name}</h2>}>
        <input
          type="text"
          class="grow tracking-wider bg-neutral-700 text-neutral-100 rounded"
          value={projectName()}
          onInput={({ target }) =>
            projectName((target as HTMLInputElement).value)
          }
        />
      </Show>
      <button
        type="button"
        class="btn btn-info"
        onClick={() => {
          if (isEditing())
            projects.data((prev) => {
              const current = prev.find(({ id }) => id === project.id);
              if (!current)
                throw new Error(
                  `No idea how this happened but somehow you're editing a project that doesn't exist?`,
                );
              current.name = projectName();
              return prev;
            });
          isEditing(!isEditing());
        }}>
        {isEditing() ? 'Apply' : 'Edit'}
      </button>
      <button type="button" class="btn btn-error" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

type ProjectCardProps = {
  project: {
    id: number;
    name: string;
  };
  onDelete: () => void;
};
