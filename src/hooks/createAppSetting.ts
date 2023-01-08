import { Accessor, createComputed } from 'solid-js';

import { Beacon, createBeacon, interceptBeacon } from './createBeacon';
import { createFileBeacon } from './createFileBeacon';

const appSettings = createFileBeacon(
  'appSettings.json',
  {} as Record<string, unknown>
);

export const createAppSetting = <T>(
  setting: string,
  initialData: T
): { data: Beacon<T>; ready: Accessor<boolean> } => {
  const beacon = createBeacon(
    (appSettings.data()[setting] as T) ?? initialData,
    { equals: false }
  );
  createComputed(() => beacon(appSettings.data()[setting] as T));
  const data = interceptBeacon(beacon, {
    set: (newValue) => {
      appSettings.data((prev) => ((prev[setting] = newValue), prev));
      return newValue;
    },
  });

  return { data, ready: appSettings.ready };
};
