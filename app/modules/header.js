const HEADER_CLASSES = {
  HEADER: 'header'
};

function createHeader() {

  function init() {
    const headerElement = document.createElement('header');
    headerElement.textContent = 'header';
    headerElement.classList.add(HEADER_CLASSES.HEADER);
    return headerElement;
  }

  return {
    init,
  }
}

export const header = createHeader();