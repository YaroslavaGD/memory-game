import { header } from "./ui/header.js";
import { cards } from "./ui/cards.js";
import { shuffle } from "./core/shuffle.js";

const App = (() => {
  return {
    init() {
      const app = document.createElement('div');
      app.id = 'app';
      document.body.appendChild(app);

      app.appendChild(header.init());
      app.appendChild(cards.init());

      const testArr = [1,2,3];
      console.log('testArr', testArr);
      console.log('shuffle', shuffle(testArr));
    }
  }
})();

window.addEventListener('DOMContentLoaded', () => {
  App.init();
});