export const getNextId = (array: { id: number }[]) =>
  Math.max(...array.map(({ id }) => id), 0) + 1;
