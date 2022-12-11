export const formatTimer = (time: number) => {
  const seconds = time / 1_000;
  const minutes = seconds / 60;
  return `${Math.floor(minutes)}:${Math.floor(seconds % 60)
    .toFixed(0)
    .padStart(2, '0')}`;
};
