export interface Graph {
  [key: string]: { node: string; weight: string }[];
}

export interface NodeGraph {
  id: string;
  name: string;
}

export interface LinkGraph {
  source: string;
  target: string;
  weight?: string;
  curvature?: number;
}

export interface DataForceGraph {
  nodes: NodeGraph[];
  links: LinkGraph[];
}

export interface ResAlgorithm {
  algorithm: "prim" | "kruskal";
  success: boolean;
  message?: string;
  weight?: string;
  steps?: LinkGraph[];
}
