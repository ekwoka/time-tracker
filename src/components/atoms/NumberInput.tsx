import { Show } from 'solid-js';

import { Beacon } from '@/hooks';

export const NumberInput = ({
  value,
  label,
  name,
  suffix,
}: NumberInputProps) => (
  <div class="max-w-min">
    <label for={name} class="block text-sm font-medium">
      {label}
    </label>
    <div class="relative mt-1 rounded-md shadow-sm max-w-max">
      <input
        type="text"
        name={name}
        id={name}
        value={value()}
        onChange={(e) => value(Number(e.currentTarget.value))}
        class="block rounded-md border-neutral-300/30 pl-0 pr-14 focus:border-indigo-500 focus:ring-indigo-500 w-[10ch] text-right bg-neutral-50/25"
        aria-describedby="price-currency"
      />
      <Show when={suffix}>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 opacity-80">
          <span>{suffix}</span>
        </div>
      </Show>
    </div>
  </div>
);

type NumberInputProps = {
  value: Beacon<number>;
  suffix?: string;
  label: string;
  name: string;
};
