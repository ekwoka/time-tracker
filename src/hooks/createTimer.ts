import createRAF from '@solid-primitives/raf';

import { createEffect } from 'solid-js';

import { createBeacon } from './createBeacon';

export const createTimer = (initial = 60_000) => {
  const value = createBeacon(initial + 500);
  const done = createBeacon(false);
  let lastTime = Date.now();
  const [running, start, stop] = createRAF(() => {
    const now = Date.now();
    value(value() - (now - lastTime));
    lastTime = now;
  });
  createEffect(() => {
    if (value() > 0.5) return;
    stop();
    done(true);
    value(0);
  });
  return {
    value,
    running,
    toggle: () => {
      if (running()) return stop();
      lastTime = Date.now();
      start();
    },
    done,
  } as const;
};
