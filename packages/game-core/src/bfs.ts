/**
 * BFS shortest path finder for border navigation games.
 * Returns the shortest path between two country codes using the border graph.
 */
export function findShortestPath(
  start: string,
  end: string,
  getNeighbors: (code: string) => string[]
): string[] | null {
  if (start === end) return [start];

  const visited = new Set<string>();
  const queue: Array<{ code: string; path: string[] }> = [
    { code: start, path: [start] },
  ];

  while (queue.length > 0) {
    const item = queue.shift();
    if (!item) break;
    const { code, path } = item;

    if (visited.has(code)) continue;
    visited.add(code);

    const neighbors = getNeighbors(code);
    for (const neighbor of neighbors) {
      const newPath = [...path, neighbor];
      if (neighbor === end) return newPath;
      if (!visited.has(neighbor)) {
        queue.push({ code: neighbor, path: newPath });
      }
    }
  }

  return null;
}
