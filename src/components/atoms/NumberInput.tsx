import { Show } from 'solid-js';

export const NumberInput = (props: NumberInputProps) => (
  <div class="max-w-min">
    <label for={props.name} class="block text-sm font-medium">
      {props.label}
    </label>
    <div class="relative mt-1 rounded-md shadow-sm max-w-max">
      <input
        type="text"
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.currentTarget.value))}
        class="block rounded-md border-neutral-300/30 pl-0 pr-14 focus:border-indigo-500 focus:ring-indigo-500 w-[10ch] text-right bg-neutral-50/25"
        aria-describedby="price-currency"
      />
      <Show when={props.suffix}>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 opacity-80">
          <span>{props.suffix}</span>
        </div>
      </Show>
    </div>
  </div>
);

type NumberInputProps = {
  value: number;
  onChange: (val: number) => void;
  suffix?: string;
  label: string;
  name: string;
};
