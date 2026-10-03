const MODAL_CLASSES = {
  MODAL: 'modal',
  BODY: 'modal__body',
  LOCKED: 'is-locked',
};

export function createModal() {
  const element = document.createElement('dialog');
  element.classList.add(MODAL_CLASSES.MODAL);

  const body = document.createElement('div');
  body.classList.add(MODAL_CLASSES.BODY);

  element.append(body);

  element.addEventListener('click', (event) => {
    if (event.target === element) close();
  });

  element.addEventListener('close', () => {
    document.body.classList.remove(MODAL_CLASSES.LOCKED);
  });

  function open(content) {
    body.replaceChildren(content);
    const heading = content.querySelector('h2');

    if (heading) {
      heading.id = 'modal-title';
      element.setAttribute('aria-labelledby', 'modal-title');
    }

    document.body.classList.add(MODAL_CLASSES.LOCKED);

    if (!element.open) element.showModal();
  }

  function close() {
    element.close();
  }

  return {
    element,
    open,
    close,
  };
}