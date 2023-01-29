import { createEffect } from 'solid-js';

import { invoke } from '@tauri-apps/api';

export const createComputedTitle = (fn: () => string) =>
  createEffect(async (last: Promise<string> | undefined) => {
    const next = fn();
    if ((await last) !== next)
      await invoke('update_tray_title', { title: next });
    return Promise.resolve(next);
  });
