export function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = new Set();

  function getState () {
    return state;
  }

  function dispatch(action) {
    const nextSate = reducer(state, action);
    state = nextSate;

    listeners.forEach((fn) => fn(state, action));
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