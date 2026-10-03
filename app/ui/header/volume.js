import { getVolume, setVolume } from "../../core/sounds.js";

const VOLUME_CLASSES = {
  WRAP: 'volume',
  LABEL: 'volume__label',
  INPUT: 'volume__input',
};

const TEXT = {
  LABEL: 'Громкость',
};

export function createVolume() {
  const element = document.createElement('label');
  element.classList.add(VOLUME_CLASSES.WRAP);

  const label = document.createElement('span');
  label.classList.add(VOLUME_CLASSES.LABEL);
  label.textContent = TEXT.LABEL;

  const input = document.createElement('input');
  input.classList.add(VOLUME_CLASSES.INPUT);
  input.type = 'range';
  input.min = '0';
  input.max = '100';
  input.step = '1';
  input.value = String(Math.round(getVolume() * 100));

  input.addEventListener('input', () => {
    setVolume(Number(input.value) / 100);
  });

  element.append(label, input);

  return { element };
}