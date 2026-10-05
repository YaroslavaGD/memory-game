const FOOTER_CLASSES = {
  FOOTER: 'footer',
  LINK: 'footer__link',
};

const LINKS = [
  { text: 'Художник', href: 'https://www.deviantart.com/iiitrex' },
  { text: 'Код', href: 'https://github.com/YaroslavaGD/memory-game' },
  { text: 'RS School', href: 'https://rs.school/' },
];

function createLink({ text, href }) {
  const link = document.createElement('a');
  link.classList.add(FOOTER_CLASSES.LINK);
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = text;
  return link;
}

export function createFooter() {
  const element = document.createElement('footer');
  element.classList.add(FOOTER_CLASSES.FOOTER);
  element.append(...LINKS.map(createLink));

  return { element };
}