import { createEffect } from 'solid-js';
import { untrack } from 'solid-js/web';

import { createBeacon, createTimer } from '@/hooks';
import { createFileBeacon } from '@/hooks/createFileBeacon';

import { classNames } from '@/utils';
import { formatTimer } from '@/utils/formatTimer';

import { NumberInput } from '../atoms/NumberInput';

export const Pomodoro = () => {
  const { data: timeSettings, ready } = createFileBeacon('timeSettings.json', {
    workLength: 50,
    breakLength: 5,
  });
  const state = createBeacon<'work' | 'break'>('work');
  const { value, running, toggle, done } = createTimer(
    timeSettings().workLength * 60_000
  );
  const getStyle = () => {
    if (!running()) return 'text-neutral-100';
    if (state() === 'break') return 'bg-green-500 text-neutral-900';
    return 'bg-red-500 text-neutral-900';
  };
  createEffect(() => {
    if (!done()) return;
    state(untrack(state) === 'work' ? 'break' : 'work');
    value(
      timeSettings()[untrack(state) === 'work' ? 'workLength' : 'breakLength'] *
        60_000
    );
    if (!untrack(running)) toggle();
    done(false);
  });
  createEffect(
    () => ready() && value(untrack(timeSettings).workLength * 60_000)
  );
  return (
    <div
      class={classNames(
        'w-full min-h-[12rem] p-4 flex flex-col items-center gap-6',
        getStyle()
      )}>
      <div class="flex gap-6">
        <NumberInput
          name={'work'}
          label={'Work Period'}
          value={timeSettings().workLength}
          onChange={(val) =>
            timeSettings((prev) => {
              prev.workLength = val;
              if (state() === 'work' && !running()) value(val * 60_000);
              return prev;
            })
          }
          suffix={'mins'}
        />
        <NumberInput
          name={'break'}
          label={'Break Period'}
          value={timeSettings().breakLength}
          onChange={(val) =>
            timeSettings((prev) => {
              prev.breakLength = val;
              if (state() === 'break' && !running()) value(val * 60_000);
              return prev;
            })
          }
          suffix={'mins'}
        />
      </div>
      <span class="text-4xl font-bold tracking-widest font-mono">
        {formatTimer(value())}
      </span>
      <div class="flex gap-4">
        <button
          type="button"
          class="py-2 px-4 rounded-md bg-neutral-900 text-neutral-100"
          onClick={toggle}>
          {running() ? 'Stop' : 'Start'}
        </button>
        <button
          type="button"
          class="py-2 px-4 rounded-md bg-neutral-900 text-neutral-100 disabled:opacity-50"
          disabled={state() === 'break' || !running()}
          onClick={() => (
            state('break'), value(timeSettings().breakLength * 60_000)
          )}>
          Take a Break
        </button>
      </div>
    </div>
  );
};
