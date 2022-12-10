/* @refresh reload */
import { createEffect } from 'solid-js';

import { createBeacon } from '@/hooks';

import { classNames } from '@/utils';
import { getDuration } from '@/utils/getTimeDifference';

export const Home = () => {
  const timerRunning = createBeacon(false);
  const timerValue = createBeacon(50 * 60_000);
  let raf: number;
  createEffect(() => {
    if (timerRunning()) {
      let last = Date.now();
      const update = () => {
        const now = Date.now();
        timerValue(timerValue() - (now - last));
        last = now;
        raf = requestAnimationFrame(update);
      };
      raf = requestAnimationFrame(update);
    } else cancelAnimationFrame(raf);
  });
  return (
    <div
      class={classNames(
        'w-full min-h-[12rem] p-4 flex flex-col items-center gap-6',
        timerRunning() ? 'bg-red-500 text-neutral-900' : 'text-neutral-100'
      )}>
      <span class="text-3xl font-bold tracking-widest font-mono">
        {getDuration(0, timerValue())}
      </span>
      <div class="flex gap-4">
        <button
          type="button"
          class="py-2 px-4 rounded-md bg-neutral-900 text-neutral-100"
          onClick={() => timerRunning(!timerRunning())}>
          {timerRunning() ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
};
