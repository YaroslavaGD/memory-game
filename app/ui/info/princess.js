const PRINCESS_CLASSES = {
  WRAP: 'princess',
  IMAGE: 'princess__image',
  EYEBROW: 'princess__eyebrow',
  QUOTE: 'princess__quote',
};

const TEXT = {
  EYEBROW: 'Принцесса',
  PLAY: 'Выберите мне достойного жениха.',
};

const IMAGE_PATH = 'assets/princess-small.png';
export function createPrincess() {
  const element = document.createElement('section');
  element.classList.add(PRINCESS_CLASSES.WRAP);

  const image = document.createElement('img');
  image.classList.add(PRINCESS_CLASSES.IMAGE);
  image.src = IMAGE_PATH;
  image.alt = 'Принцесса';

  const eyebrow = document.createElement('p');
  eyebrow.classList.add(PRINCESS_CLASSES.EYEBROW);
  eyebrow.textContent = TEXT.EYEBROW;

  // const quote = document.createElement('p');
  // quote.classList.add(PRINCESS_CLASSES.QUOTE);
  // quote.textContent = TEXT.PLAY;

  element.append(image, eyebrow, 
    // quote
  );

  return { element };
}