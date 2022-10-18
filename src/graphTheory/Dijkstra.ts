import { PriorityQueue } from "../utils/PriorityQueue";
import { buildEdges } from "./BuildGraph";
import { Graph, ResAlgorithm } from "./TypeGraph";

const dijkstraAlgorithm = (
  graph: Graph,
  start: string,
  end?: string
): ResAlgorithm => {
  const nodes = Object.keys(graph).map((node) => node);
  const edges = buildEdges(graph);

  const findV = (v: string) => {
    return nodes.findIndex((node) => node === v);
  };

  const pre: string[] = new Array(nodes.length).fill(start);

  const distances: number[] = new Array(nodes.length).fill(
    Number.MAX_SAFE_INTEGER
  );

  distances[findV(start)] = 0;

  const Queue = new PriorityQueue((a, b) => a[0] < b[0]);
  Queue.push([0, start]);

  while (!Queue.isEmpty()) {
    const top = Queue.top();
    Queue.pop();

    const u = top[1];
    const d = top[0];
    const iU = findV(u);

    if (d < distances[iU]) continue;

    for (const edge of edges.filter((edge) => edge.source === u)) {
      const v = edge.target;
      const w = Number(edge.weight);
      const iV = nodes.findIndex((node) => node === v);
      if (distances[iV] > distances[iU] + w) {
        distances[iV] = distances[iU] + w;
        Queue.push([distances[iV], v]);
        pre[iV] = u;
      }
    }
  }

  const findPath = (end: string) => {
    let p = [];
    let e = end;
    while (1) {
      p.push(e);
      if (e === start) break;
      e = pre[findV(e)];
    }
    return p.reverse();
  };

  const paths = nodes.map(
    (node, i): { node: string; distances: number; path: string[] } => {
      return {
        node,
        distances: distances[i],
        path: findPath(node),
      };
    }
  );

  if (end) {
    return {
      algorithm: "dijkstra",
      success: true,
      paths: paths.filter((path) => path.node === end),
    };
  }

  return {
    algorithm: "dijkstra",
    success: true,
    paths,
  };
};

export default dijkstraAlgorithm;
