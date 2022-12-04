export const classNames = (...classes: (string | undefined | null)[]) =>
  classes.filter(Boolean).join(' ');
