import { autoAnimate } from 'solid-auto-animate';

import { For } from 'solid-js';

import { createAppSetting } from '@/hooks';

import { projects } from '@/stores';

import { setActive } from '@/utils';

import { SimpleProjectCard } from '../molecules/SimpleProjectCard';

autoAnimate;
export const Projects = () => {
  const { data: activeProject } = createAppSetting('activeProject');

  return (
    <div use:autoAnimate>
      <For each={projects.ready() ? projects.data() : []}>
        {(proj) => (
          <SimpleProjectCard
            project={proj}
            onDelete={() => {
              projects.data(setActive(proj.id, false));
              if (activeProject() === proj.id) activeProject(-1);
            }}
          />
        )}
      </For>
    </div>
  );
};
