import { Graph } from "./TypeGraph";

const connectedComponentsCount = (graph: Graph): number => {
  const visited = new Set<string>();
  let count = 0;
  for (let node in graph) {
    if (explore(graph, node, visited) === true) count++;
  }
  return count;
};

const explore = (graph: Graph, current: string, visited: Set<string>) => {
  if (visited.has(String(current))) return false;

  visited.add(String(current));

  for (let neighbor of graph[current]) {
    explore(graph, neighbor.node, visited);
  }

  return true;
};

export default connectedComponentsCount;
