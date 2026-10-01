export function shuffle(items) {
  const resultItems = [...items];

  for (let i = resultItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [resultItems[i], resultItems[j]] = [resultItems[j], resultItems[i]];
  }

  return resultItems;
}