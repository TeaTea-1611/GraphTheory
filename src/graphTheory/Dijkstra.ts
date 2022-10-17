import { PriorityQueue } from "../utils/PriorityQueue";
import { Graph } from "./TypeGraph";

const dijkstraAlgorithm = (graph: Graph, start: string) => {
  const nodes = Object.keys(graph).map((node) => node);

  const distances = new Array(nodes.length).fill(Number.MAX_SAFE_INTEGER);

  distances[nodes.findIndex((node) => node === start)] = 0;
  const Queue = new PriorityQueue((a, b) => a[0] < b[0]);
  Queue.push([0, start]);

  while (!Queue.isEmpty()) {
    const top = Queue.top();
    Queue.pop();
    const u = top[1];
    const w = top[0];
    if (w > distances[nodes.findIndex((node) => node === u)]) continue;
  }
};

export default dijkstraAlgorithm;
