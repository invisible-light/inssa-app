export default function padStart(n, width, z) {
  z = z || '0';
  n = Math.floor(n) + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
