export function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = new Set();

  function getState () {
    return state;
  }

  function dispatch(action) {
    const prevState = state;
    const nextSate = reducer(state, action);
    if (nextSate === prevState) return;
    state = nextSate;

    listeners.forEach((fn) => fn(state, prevState, action));
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}