export function createButton(text, onClick, className) {
  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add(className);
  button.textContent = text;
  button.addEventListener('click', onClick);

  return button;
}