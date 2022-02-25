export function msToMinsAndSecs(ms) {
  const minutes = Math.floor(ms / 1000 / 60);
  const seconds = ((ms / 1000) % 60).toFixed(0);
  return seconds === 0
    ? `${minutes + 1}:00`
    : `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
