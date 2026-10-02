export function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = new Set();

  function getState () {
    return state;
  }

  function dispatch(action) {
    const prevState = state;
    const nextState = reducer(state, action);
    if (nextState === prevState) return;
    state = nextState;

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