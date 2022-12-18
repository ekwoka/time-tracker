import createRAF from '@solid-primitives/raf';

import { createBeacon } from './createBeacon';

export const createTimer = (initial = 0) => {
  const value = createBeacon(initial);
  let lastTime = Date.now();
  const [running, start, stop] = createRAF(() => {
    const now = Date.now();
    value(value() + (now - lastTime));
    lastTime = now;
  });
  return {
    value,
    running,
    toggle: () => {
      if (running()) return stop();
      lastTime = Date.now();
      start();
    },
  } as const;
};
