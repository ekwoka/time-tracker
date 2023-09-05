import { createComputed, createEffect, createMemo } from 'solid-js';

import { TreeTable } from '@/molecules';

import { createBeacon } from '@/hooks';

import { Project, Session, Task, projects, sessions, tasks } from '@/stores';

import { getDuration, getTimeAgo } from '@/utils';

import { NestedTree } from '../molecules/TreeTable';

export const Sessions = () => {
  const sessionList = createBeacon<Session[]>([]);
  createComputed(() => sessionList(sessions.data().filter((s) => s.active)));
  const organizedSessions = createMemo(() => {
    const taskToProject = new Map<string, [Task, Project]>();
    const taskAndProject = (taskID: number) => {
      if (taskToProject.has(String(taskID)))
        return taskToProject.get(String(taskID));
      const task = tasks.data().find((t) => t.id === taskID);
      if (!task) return;
      const project = projects.data().find((p) => p.id === task.projectId);
      if (!project) return;
      taskToProject.set(String(taskID), [task, project]);
      return taskToProject.get(String(taskID));
    };
    return {
      name: 'Work Sessions',
      data: sessionList().reduce(
        (acc, sess) => {
          const [task, project] = taskAndProject(sess.taskId) ?? [];
          if (!(task && project)) return acc;
          acc[project.id] = acc[project.id] ?? { name: project.name, data: {} };
          acc[project.id].data[task.id] = acc[project.id].data[task.id] ?? {
            name: task.name,
            data: [],
          };
          acc[project.id].data[task.id].data.push(sess);
          return acc;
        },
        {} as Record<
          string | number,
          {
            name: string;
            data: Record<string | number, { name: string; data: Session[] }>;
          }
        >,
      ),
    };
  });
  createEffect(() => console.log('organizedSessions', organizedSessions()));
  return (
    <div class="p-4 flex flex-col gap-8">
      <section class="grid grid-cols-3 gap-4">
        <div class="flex flex-col gap-2">
          <h2 class="text-sm font-semibold tracking-wider uppercase">
            Total Time:
          </h2>
          <p class="text-lg font-semibold tracking-wider uppercase text-neutral-100">
            {getDuration(
              0,
              sessionList().reduce(
                (tot, sess) => tot + (sess.end ?? Date.now()) - sess.start,
                0,
              ),
            )}
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h2 class="text-sm font-semibold tracking-wider uppercase">
            Average Length:
          </h2>
          <p class="text-lg font-semibold tracking-wider uppercase text-neutral-100">
            {getDuration(
              0,
              sessionList().reduce(
                (tot, sess) => tot + (sess.end ?? Date.now()) - sess.start,
                0,
              ) / sessionList().length,
            )}
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <h2 class="text-sm font-semibold tracking-wider uppercase">
            Longest Session:
          </h2>
          <p class="text-lg font-semibold tracking-wider uppercase text-neutral-100">
            {getDuration(
              0,
              sessionList().reduce(
                (max, sess) =>
                  Math.max(max, (sess.end ?? Date.now()) - sess.start),
                0,
              ),
            )}
          </p>
        </div>
      </section>
      <section class="flex flex-col gap-2 text-neutral-100">
        <TreeTable
          data={organizedSessions() as NestedTree<Session>}
          expansionDepth={2}
          Header={(props) => (
            <h2
              class={
                props.name === organizedSessions().name
                  ? 'font-semibold text-lg'
                  : ''
              }>
              <span>{props.name}</span>
              {props.name !== organizedSessions().name && (
                <span class="text-xs uppercase tracking-widest ml-4">
                  {Array.isArray(props.data) ? 'Task' : 'Project'}
                </span>
              )}
              <span class="text-xs uppercase tracking-widest ml-4">
                {getDuration(
                  0,
                  flattenNestedTree(props).reduce(
                    (total, session) =>
                      total + (session.end ?? Date.now()) - session.start,
                    0,
                  ),
                )}
              </span>
            </h2>
          )}>
          {(session: Session) => (
            <div class="w-full flex flex-row items-center gap-2">
              <span class="text-xs uppercase tracking-widest">
                {getTimeAgo(session.end ?? session.start)}
              </span>
              <span class="text-xs uppercase tracking-widest">
                {new Date(session.end ?? session.start).toLocaleDateString(
                  'en-US',
                  { month: 'short', day: 'numeric' },
                )}
              </span>
              <span>
                for{' '}
                {getDuration(0, (session.end ?? Date.now()) - session.start)}
              </span>
            </div>
          )}
        </TreeTable>
      </section>
    </div>
  );
};

const flattenNestedTree = <T,>(tree: NestedTree<T>): T[] => {
  if (Array.isArray(tree.data)) return tree.data;
  return Object.values(tree.data).reduce(
    (acc, node) => [...acc, ...flattenNestedTree(node)],
    [] as T[],
  );
};
