export const classNames = (...classes: (string | undefined | null | false)[]) =>
  classes.filter(Boolean).join(' ');
