import createRAF from '@solid-primitives/raf';

import { createComputed, untrack } from 'solid-js';

import { Beacon, createBeacon } from './createBeacon';

export const createTimer = (initial = 0, activeSignal?: Beacon<boolean>) => {
  const value = createBeacon(initial);
  let lastTime = Date.now();
  const [running, start, stop] = createRAF(() => {
    const now = Date.now();
    value(value() + (now - lastTime));
    lastTime = now;
  });
  if (activeSignal) {
    createComputed(() => {
      if (activeSignal() === untrack(running)) return;
      if (activeSignal()) start();
      else stop();
    });
    createComputed(() => activeSignal(running()));
  }
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
