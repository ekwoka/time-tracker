import { Show } from 'solid-js';

import { createBeacon } from '@/hooks';

export const UserMenu = () => {
  const open = createBeacon(false);
  return (
    <div class="relative ml-3">
      <div>
        <button
          type="button"
          class="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          id="user-menu-button"
          onClick={() => open(!open())}
          aria-expanded="false"
          aria-haspopup="true">
          <span class="sr-only">Open user menu</span>
          <img
            class="h-8 w-8 rounded-full"
            src="https://placekitten.com/300/300"
            alt=""
          />
        </button>
      </div>
      <Show when={open()}>
        <div
          class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabindex="-1">
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabindex="-1"
            id="user-menu-item-0">
            Your Profile
          </a>
        </div>
      </Show>
    </div>
  );
};
