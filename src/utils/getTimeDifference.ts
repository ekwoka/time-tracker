const formatter = new Intl.RelativeTimeFormat('en', {
  style: 'long',
  numeric: 'auto',
});

export const getTimeAgo = (timestamp: number | Date) => {
  const { value, unit } = getTimeDifference(timestamp, new Date());
  return formatter.format(-value, unit as Intl.RelativeTimeFormatUnit);
};

export const getDuration = (start: number | Date, end: number | Date) => {
  const { value, unit } = getTimeDifference(start, end);
  return `${value} ${unit}${value !== 1 ? 's' : ''}`;
};

export const getTimeDifference = (start: number | Date, end: number | Date) => {
  const [startTime, endTime] = [start, end].map((time) =>
    new Date(time).getTime(),
  );
  const diff = endTime - startTime;
  const second = Math.floor(diff / 1000);
  const minute = Math.floor(second / 60);
  const hour = Math.floor(minute / 60);
  const day = Math.floor(hour / 24);
  const items = Object.entries({ day, hour, minute, second });
  const [unit, value] = items.find(([_, value]) => Math.abs(value) >= 1) || [
    'second',
    0,
  ];
  return { unit, value };
};
