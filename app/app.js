const App = (() => {
  return {
    init() {
      const app = document.createElement('div');
      app.id = 'app';
      document.body.appendChild(app);
    }
  }
})();

window.addEventListener('DOMContentLoaded', () => {
  App.init();
});