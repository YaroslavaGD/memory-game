import { header } from "./ui/header.js";
import { cards } from "./ui/cards.js";
import { shuffle } from "./core/shuffle.js";

const MAIN_CLASSES = {
  MAIN: 'main',
}

const App = (() => {
  return {
    init() {
      const app = document.createElement('div');
      app.id = 'app';
      document.body.appendChild(app);

      const main = document.createElement('main');
      main.classList.add(MAIN_CLASSES.MAIN);
      main.appendChild(cards.init());

      app.appendChild(header.init());
      app.appendChild(main);

      const testArr = [1,2,3];
      console.log('testArr', testArr);
      console.log('shuffle', shuffle(testArr));
    }
  }
})();

window.addEventListener('DOMContentLoaded', () => {
  App.init();
});