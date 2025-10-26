interface Waypoint {
  id: string;
  position: number[];
  connectedTo: string[];
}

export function distanceBetween(a: Waypoint, b: Waypoint): number {
  const dx = a.position[0] - b.position[0];
  const dy = a.position[1] - b.position[1];
  return Math.sqrt(dx * dx + dy * dy);
}

export function heuristic(aId: string, bId: string, waypoints: Waypoint[]): number {
  const a = waypoints.find(w => w.id === aId);
  const b = waypoints.find(w => w.id === bId);
  if (!a || !b) return Infinity;
  return distanceBetween(a, b);
}

export function reconstructPath(cameFrom: Record<string, string>, current: string): string[] {
  const totalPath = [current];
  while (cameFrom[current]) {
    current = cameFrom[current];
    totalPath.unshift(current);
  }
  return totalPath;
}

export function findPath(startId: string, endId: string, waypoints: Waypoint[]): string[] {
  const openSet = [startId];
  const cameFrom: Record<string, string> = {};
  const gScore: Record<string, number> = {};
  const fScore: Record<string, number> = {};

  for (const wp of waypoints) {
    gScore[wp.id] = Infinity;
    fScore[wp.id] = Infinity;
  }

  gScore[startId] = 0;
  fScore[startId] = heuristic(startId, endId, waypoints);

  while (openSet.length > 0) {
    openSet.sort((a, b) => fScore[a] - fScore[b]);
    const current = openSet.shift()!;

    if (current === endId) return reconstructPath(cameFrom, current);

    const currentWP = waypoints.find(w => w.id === current);
    if (!currentWP) continue;

    for (const neighbor of currentWP.connectedTo) {
      const neighborWP = waypoints.find(w => w.id === neighbor);
      if (!neighborWP) continue;

      const distance = distanceBetween(currentWP, neighborWP);
      const tentative = gScore[current] + distance;

      if (tentative < gScore[neighbor]) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentative;
        fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, endId, waypoints);
        if (!openSet.includes(neighbor)) openSet.push(neighbor);
      }
    }
  }

  return [];
}
