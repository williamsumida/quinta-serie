export function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

export function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
