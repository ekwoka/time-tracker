import { createComputed } from 'solid-js';
import { createMutable } from 'solid-js/store';

import { createBeacon, interceptBeacon } from './createBeacon';
import { createFileBeacon } from './createFileBeacon';

export const createAppSettings = <T extends object>(defaults: T) => {
  const appSettings = createMutable(defaults);
  const fileBeacon = createFileBeacon('appSettings.json', defaults);
  createComputed(() => {
    if (!fileBeacon.ready()) return;
    for (const [key, value] of Object.entries(fileBeacon.data()) as [
      keyof T,
      T[keyof T]
    ][])
      if (appSettings[key] !== value) appSettings[key] = value;
  });

  const createAppSetting = <K extends keyof T>(setting: K) => {
    type S = T[K];
    const beacon = createBeacon(appSettings[setting], { equals: false });
    createComputed(() => beacon(appSettings[setting] as S));
    const data = interceptBeacon(beacon, {
      set: (newValue) => {
        if (!fileBeacon.ready()) return newValue;
        fileBeacon.data((prev) => ((prev[setting] = newValue), prev));
        return newValue;
      },
    });

    return { data, ready: fileBeacon.ready };
  };
  return [createAppSetting, appSettings] as const;
};

const [createAppSetting, appSettings] = createAppSettings<AppSettings>({
  workLength: 25,
  breakLength: 5,
  activeProject: -1,
  activeTask: -1,
  tracking: false,
});

export { createAppSetting, appSettings };

type AppSettings = {
  workLength: number;
  breakLength: number;
  activeProject: number;
  activeTask: number;
  tracking: boolean;
};
