import { createComputed } from 'solid-js';

import { createBeacon, interceptBeacon } from './createBeacon';
import { createFileBeacon } from './createFileBeacon';

const appSettings = createFileBeacon(
  'appSettings.json',
  {} as Record<string, unknown>
);

export const createAppSetting = <T extends keyof AppSettings>(
  setting: T,
  initialData: AppSettings[T]
) => {
  type S = AppSettings[T];
  const beacon = createBeacon(
    (appSettings.data()[setting] as S) ?? initialData,
    { equals: false }
  );
  createComputed(() => beacon(appSettings.data()[setting] as S));
  const data = interceptBeacon(beacon, {
    set: (newValue) => {
      appSettings.data((prev) => ((prev[setting] = newValue), prev));
      return newValue;
    },
  });

  return { data, ready: appSettings.ready };
};

type AppSettings = {
  workLength: number;
  breakLength: number;
  activeProject: number;
  activeTask: number;
};
