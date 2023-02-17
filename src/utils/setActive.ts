export const setActive =
  (id: number, active: boolean) =>
  <T extends { id: number; active: boolean }>(prev: T[]): T[] => {
    const item = prev.find((t) => t.id === id);
    if (item) item.active = active;
    return prev;
  };
