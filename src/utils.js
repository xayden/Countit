export function truncate(str, num) {
  if (num >= str.length) return str;
  else return str.substring(0, num) + '...';
}
