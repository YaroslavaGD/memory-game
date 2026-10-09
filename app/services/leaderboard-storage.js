const STORAGE_KEY = 'princes-memory-game:leaderboard';
const MAX_RESULTS = 10;

function isValidResult(result) {
  return Number.isFinite(result?.moves) && Number.isFinite(result?.finishedAt);
}

function sortResults(results) {
  return [...results].sort((a, b) => a.moves - b.moves || a.finishedAt - b.finishedAt);
}

export function loadResults() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? sortResults(data.filter(isValidResult)) : [];
  } catch {
    return [];
  }
}

export function saveResult(moves) {
  const results = sortResults([...loadResults(), { moves, finishedAt: Date.now() }]).slice(0, MAX_RESULTS);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch {}
}