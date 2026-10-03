const VOLUME_KEY = 'princes-memory-game:volume';
const DEFAULT_VOLUME = 0.2;

const clamp = (value) => Math.min(1, Math.max(0, value));

function loadVolume() {
  try {
    const raw = localStorage.getItem(VOLUME_KEY);
    const saved = Number(raw);
    return raw !== null && Number.isFinite(saved) ? clamp(saved) : DEFAULT_VOLUME;
  } catch {
    return DEFAULT_VOLUME;
  }
}

let volume = loadVolume();
const listeners = new Set();

export const getVolume = () => volume;

export function setVolume(value) {
  volume = clamp(value);
  listeners.forEach((fn) => fn(volume));

  try {
    localStorage.setItem(VOLUME_KEY, String(volume));
  } catch {}
}

export function onVolumeChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}