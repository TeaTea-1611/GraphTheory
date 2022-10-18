import { Graph, LinkGraph } from "./TypeGraph";

export const buildGraph = (
  edges: string[][],
  directionless: boolean = true
): Graph => {
  /*
  graph = [
    [ "a", "b", "5" ]
    [ "a", "c" ]
    ​[ "b", "c" ]
    ​[ "b", "d" ]
    ​[ "c", "e" ]
    ​[ "d", "e" ]
    ​[ "d", "f" ]
    ​[ "e", "f" ]
  ]
  => 
  graph = {
    a: [ { node: "b", weight: "1"}, "c" ]
    ​b: [ "a", "c", "d" ]
    ​c: [ "a", "b", "e" ]
    ​d: [ "b", "e", "f" ]
    ​e: [ "c", "d", "f" ]
    ​f: [ "d", "e" ]
    ​g: [ "h" ]
    ​h: [ "g" ]
    ​i: [ "k" ]
    ​k: [ "i" ]
  }
  */
  const graph: Graph = {};
  for (let edge of edges) {
    const [a, b, c] = edge;
    if (!!a || !!b) {
      if (!(a in graph)) graph[a] = [];
      if (!(b in graph)) graph[b] = [];
      graph[a].push({ node: b, weight: c || "1" });
      if (directionless) graph[b].push({ node: a, weight: c || "1" });
    }
  }
  return graph;
};

export const buildEdges = (graph: Graph): LinkGraph[] => {
  /**
    graph =>
    edges = [
      { source: "a", target: "b", weight: "1"},
      ...
    ]
   */
  const edges: LinkGraph[] = [];

  for (const node in graph) {
    graph[node].forEach((p) => {
      if (!edges.find((edge) => edge.source === node && edge.target === p.node))
        edges.push({ source: node, target: p.node, weight: p.weight || "1" });
    });
  }

  return edges;
};
