export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const addZero = (n) => String(n).padStart(2, '0');

  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1);
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}