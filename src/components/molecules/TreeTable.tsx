import { Icon } from 'solid-heroicons';
import { chevronDown, chevronUp } from 'solid-heroicons/solid-mini';

import { For, JSX } from 'solid-js';

import { createBeacon } from '@/hooks';

import { classNames } from '@/utils';

export const TreeTable = <T,>(props: TreeTableProps<T>) => {
  const { Header } = props;
  const expanded = createBeacon<boolean>((props.expansionDepth ?? 0) > 0);
  return (
    <div class="px-2">
      <button
        onclick={() => expanded(!expanded())}
        class="flex items-center w-full py-2 gap-4">
        <Header {...props.data} />
        <Icon
          path={expanded() ? chevronDown : chevronUp}
          class="w-4 h-4 mt-auto"
        />
      </button>
      {Array.isArray(props.data.data) ? (
        <div
          class={classNames(
            'flex flex-col gap-1 pl-4 mb-4',
            !expanded() && 'hidden'
          )}>
          <For each={props.data.data as T[]}>
            {(value) => props.children(value)}
          </For>
        </div>
      ) : (
        <div class={classNames('flex flex-col pl-4', !expanded() && 'hidden')}>
          <For each={Object.values(props.data.data) as NestedTree<T>[]}>
            {(value) => (
              <TreeTable
                data={value}
                Header={Header}
                expansionDepth={(props.expansionDepth ?? 0) - 1}>
                {props.children}
              </TreeTable>
            )}
          </For>
        </div>
      )}
    </div>
  );
};

type TreeTableProps<T> = {
  data: NestedTree<T>;
  Header: (props: NestedTree<T>) => JSX.Element;
  expansionDepth?: number;
  children: (props: T) => JSX.Element;
};

export interface NestedTree<T> {
  name: string;
  data: Record<string | number, NestedTree<T>> | T[];
}
