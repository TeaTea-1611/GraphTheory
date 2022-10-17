import connectedComponentsCount from "./ConnectedComponentsCount";
import { Graph, LinkGraph, ResAlgorithm } from "./TypeGraph";

const primAlgorithm = (graph: Graph, start: string): ResAlgorithm => {
  if (connectedComponentsCount(graph) !== 1)
    return {
      algorithm: "prim",
      success: false,
      message: "Đồ thị không liên thông",
    };

  let nodes = Object.keys(graph).map((node) => node);
  let used = new Array(nodes.length).fill(false);

  let mst: LinkGraph[] = [];
  let w = 0;

  used[nodes.findIndex((node) => node === start)] = true;
  while (mst.length < nodes.length - 1) {
    let min_w = Number.MAX_SAFE_INTEGER;
    let X = "",
      Y = "";
    for (let i = 0; i < nodes.length; i++) {
      if (used[i]) {
        const adjacentEdges = graph[nodes[i]];
        for (const edge of adjacentEdges) {
          const k = edge.node;
          const weight = Number(edge.weight);
          if (!used[nodes.findIndex((node) => node === k)] && weight < min_w) {
            min_w = weight;
            X = k;
            Y = nodes[i];
          }
        }
      }
    }
    mst.push({ source: Y, target: X, weight: String(min_w) });
    w += min_w;
    used[nodes.findIndex((node) => node === X)] = true;
  }

  return {
    algorithm: "prim",
    success: true,
    steps: mst,
    weight: String(w),
  };
};

export default primAlgorithm;
