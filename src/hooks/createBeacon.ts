import { Setter, createSignal } from 'solid-js';
import { SignalOptions } from 'solid-js/types/reactive/signal';
import { untrack } from 'solid-js/web';

import { noop, noopReturn } from '@/utils';

export const createBeacon = <T>(
  val: T,
  options?: SignalOptions<T>,
): Beacon<T> => {
  const [signal, setSignal] = createSignal<T>(val, options);
  return ((val?: Updater<T>) =>
    isNotEmpty(val) ? setSignal(val) : signal()) as Beacon<T>;
};

export const interceptBeacon = <T>(
  beacon: Beacon<T>,
  interceptor: BeaconInterceptor<T>,
): Beacon<T> => {
  const { get = noop, set = noopReturn } = interceptor;
  return ((val?: Updater<T>) => {
    if (isNotEmpty(val)) {
      const newValue: T =
        typeof val === 'function' ? val(untrack(beacon)) : val;
      return beacon(set(newValue));
    }
    get();
    return beacon();
  }) as Beacon<T>;
};

const isNotEmpty = <R>(val: R | undefined | null): val is R =>
  ![undefined, null].some((nullish) => val === nullish);

export type Beacon<T> = {
  (): T;
  (prev: T | Updater<T>): T;
};

export type BeaconInterceptor<T> = {
  get?: () => T;
  set?: (prev: T) => T;
};

type Updater<T> = Parameters<Setter<T>>[0];
