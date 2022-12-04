import { createSignal, Setter } from 'solid-js';

export const createBeacon = <T, R = T extends () => unknown ? ReturnType<T> : T>(val: T): Beacon<R> => {
  const [signal, setSignal] = createSignal<R>(val as unknown as R);
  return ((val?: Parameters<Setter<R>>[0]) => (isNotEmpty(val) ? setSignal(val) : signal())) as Beacon<R>;
};

const isNotEmpty = <R>(val: R | undefined | null): val is R => ![undefined, null].some((falsy) => val === falsy);

type Beacon<T> = {
  (): T;
  (prev: T | Updater<T>): T;
};

type Updater<T> = (prev: T) => T;
