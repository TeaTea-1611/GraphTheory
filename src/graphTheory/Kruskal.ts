import { buildEdges } from "./BuildGraph";
import connectedComponentsCount from "./ConnectedComponentsCount";
import { Graph, LinkGraph, ResAlgorithm } from "./TypeGraph";

const kruskalAlgorithm = (graph: Graph): ResAlgorithm => {
  if (connectedComponentsCount(graph) !== 1)
    return {
      algorithm: "kruskal",
      success: false,
      message: "Đồ thị không liên thông",
    };

  const nodes = Object.keys(graph).map((node) => node);
  const parents = [...nodes];
  const sz = new Array(nodes.length).fill(1);

  const find = (v: string): string => {
    const iN = nodes.findIndex((node) => node === v);
    const iP = parents.findIndex((node) => node === v);
    if (iN === iP) return v;
    return (parents[iP] = parents[iN]);
  };

  const union = (a: string, b: string) => {
    a = find(a);
    b = find(b);
    if (a === b) return false;
    if (
      sz[nodes.findIndex((node) => node === a)] <
      sz[nodes.findIndex((node) => node === b)]
    )
      [a, b] = [b, a];

    parents[parents.findIndex((node) => node === b)] = a;
    sz[nodes.findIndex((node) => node === a)] +=
      sz[nodes.findIndex((node) => node === b)];

    return true;
  };

  let mst: LinkGraph[] = [];
  let w = 0;

  const edges = buildEdges(graph).sort(
    (a, b) => Number(a.weight) - Number(b.weight),
  );

  for (const edge of edges) {
    if (mst.length === nodes.length - 1) break;
    if (union(edge.source, edge.target)) {
      mst.push(edge);
      w += Number(edge.weight);
    }
  }

  return {
    algorithm: "kruskal",
    success: true,
    steps: mst,
    weight: String(w),
  };
};

export default kruskalAlgorithm;
