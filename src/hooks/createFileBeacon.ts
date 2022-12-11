import { Accessor, createSignal } from 'solid-js';

import { getAppData } from '@/utils';
import { setAppData } from '@/utils/getAppData';

import { Beacon, createBeacon, interceptBeacon } from './createBeacon';

export const createFileBeacon = <T>(
  filename: string,
  initialData: T
): { data: Beacon<T>; ready: Accessor<boolean> } => {
  const beacon = createBeacon(initialData, { equals: false });
  const [ready, setReady] = createSignal(false);
  (async () => {
    beacon(
      JSON.parse(await getAppData(filename, JSON.stringify(initialData))) as T
    );
    setReady(true);
  })();
  const data = interceptBeacon(beacon, {
    set: (newValue) => {
      setAppData(filename, JSON.stringify(newValue));
      return newValue;
    },
  });

  return { data, ready };
};
