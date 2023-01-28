import { createEffect, createMemo } from 'solid-js';

import { invoke } from '@tauri-apps/api';

import { formatTimer } from '@/utils';

export const TimerDisplay = (props: { value: number; target?: number }) => {
  const timerValue = createMemo(() => {
    if (!props.target || props.target === 0)
      return formatTimer(props.value).split(':');
    if (props.target > props.value)
      return formatTimer(props.target - props.value).split(':');
    return formatTimer(props.value).split(':');
  });

  createEffect(async (last: Promise<string> | undefined) => {
    const next = timerValue().join(':');
    if ((await last) !== next)
      await invoke('update_tray_title', { title: next });
    return Promise.resolve(next);
  });

  return (
    <span class="text-4xl font-bold tracking-widest font-mono">
      <span class="countdown">
        <span style={`--value: ${timerValue()[0]}`}></span>
        <span class="sr-only">{timerValue()[0]}</span>
      </span>
      :
      <span class="countdown">
        <span style={`--value: ${timerValue()[1]}`}></span>
        <span class="sr-only">{timerValue()[1]}</span>
      </span>
    </span>
  );
};
