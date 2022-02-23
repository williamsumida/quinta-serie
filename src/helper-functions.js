/* eslint-disable camelcase */
export function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

export function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getWaitTimeInSeconds(pokemonTrainer) {
  const { last_time_captured } = pokemonTrainer;
  let lastTimeCapturedTimestamp = new Date(last_time_captured).getTime();
  lastTimeCapturedTimestamp /= 1000;
  const now_in_seconds = Date.now() / 1000;
  return now_in_seconds - lastTimeCapturedTimestamp;
}

export function parseHoursMinutesSeconds(timeInSeconds) {
  let remainingSeconds = timeInSeconds;
  const cooldown = process.env.CATCH_COOLDOWN_IN_MINUTES * 60;

  remainingSeconds = cooldown - remainingSeconds;
  const time = {
    hours: '',
    minutes: '',
    seconds: '',
  };

  time.hours = Math.floor(remainingSeconds / 3600);
  remainingSeconds -= time.hours * 3600;

  time.minutes = Math.floor(remainingSeconds / 60);
  remainingSeconds -= time.minutes * 60;

  time.seconds = Math.floor(remainingSeconds);
  return time;
}
