import { autoAnimate } from 'solid-auto-animate';

import { For } from 'solid-js';

import { projects } from '@/stores';

import { SimpleProjectCard } from '../molecules/SimpleProjectCard';

autoAnimate;
export const Projects = () => (
  <div use:autoAnimate>
    <For each={projects.ready() ? projects.data() : []}>
      {(proj) => (
        <SimpleProjectCard
          project={proj}
          onDelete={() =>
            projects.data((prev) => {
              prev.splice(
                prev.findIndex(({ id }) => id === proj.id),
                1
              );
              return prev;
            })
          }
        />
      )}
    </For>
  </div>
);
