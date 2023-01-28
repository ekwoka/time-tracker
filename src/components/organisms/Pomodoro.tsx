/** @refresh reload */
import { createComputed } from 'solid-js';

import { NumberInput, TimerDisplay } from '@/atoms';

import { createAppSetting, createBeacon, createTimer } from '@/hooks';

import { appState } from '@/stores';

import { classNames } from '@/utils';

export const Pomodoro = () => {
  const { data: workLength } = createAppSetting('workLength', 25);
  const { data: breakLength } = createAppSetting('breakLength', 5);
  const { data: isTracking } = createAppSetting('tracking', false);

  const state = createBeacon<'work' | 'break'>('work');
  const { value, running, toggle } = createTimer(0, isTracking);
  createComputed(() => (appState.isWorking = state() === 'work' && running()));
  const getStyle = () => {
    if (!running()) return 'text-neutral-100';
    if (state() === 'break') return 'bg-green-500 text-neutral-900';
    return 'bg-red-500 text-neutral-900';
  };

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
          value={workLength()}
          onChange={(val) => workLength(val)}
          suffix={'mins'}
        />
        <NumberInput
          name={'break'}
          label={'Break Period'}
          value={breakLength()}
          onChange={(val) => breakLength(val)}
          suffix={'mins'}
        />
      </div>
      <TimerDisplay
        value={value()}
        target={(state() === 'work' ? workLength : breakLength)() * ONE_MINUTE}
      />
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
          onClick={() => (
            state(state() === 'work' ? 'break' : 'work'), value(0)
          )}>
          {state() === 'work' ? 'Take a Break' : 'End Break'}
        </button>
      </div>
    </div>
  );
};

const ONE_MINUTE = 60_000;
