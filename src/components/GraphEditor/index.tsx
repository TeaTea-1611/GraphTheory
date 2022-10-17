import React from "react";
import { buildGraph } from "../../graphTheory";
import kruskalAlgorithm from "../../graphTheory/Kruskal";
import primAlgorithm from "../../graphTheory/Prim";
import {
  DataForceGraph,
  LinkGraph,
  NodeGraph,
  ResAlgorithm,
} from "../../graphTheory/TypeGraph";

interface IGraphEditor {
  runKruskalOrPrim: (data: ResAlgorithm) => void;
  dataForceGraph: (data: DataForceGraph) => void;
}

function GraphEditor({ runKruskalOrPrim, dataForceGraph }: IGraphEditor) {
  const [nodeCount, setNodeCount] = React.useState(0);
  const [graphData, setGraphData] = React.useState("");
  const [data, setData] = React.useState<DataForceGraph>({
    nodes: [],
    links: [],
  });
  const [nodePrim, setNodePrim] = React.useState("");
  const [errInputNodePrim, setErrInputNodePrim] = React.useState("");

  const _runKruskalOrPrim = (algorithm: "prim" | "kruskal") => {
    const graph = buildGraph(graphData.split("\n").map((l) => l.split(" ")));
    if (algorithm === "prim") {
      runKruskalOrPrim(primAlgorithm(graph, nodePrim));
    } else if (algorithm === "kruskal") {
      runKruskalOrPrim(kruskalAlgorithm(graph));
    }
  };

  return (
    <div className="space-y-4">
      <header className="space-y-4">
        <h1 className="text-4xl text-center font-semibold">Graph Theory</h1>
        <h2 className="text-3xl  font-semibold">Editor</h2>
      </header>
      <div className="space-y-4">
        <div className="relative w-full">
          <input
            className="peer w-full focus:outline-none resize-none bg-transparent font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-sky-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-slate-700 placeholder-shown:border-t-slate-700 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-slate-700 focus:border-sky-500"
            value={nodeCount}
            onChange={(e) => {}}
            placeholder=""
            spellCheck={false}
            // disabled={true}
          />
          <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-sky-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] peer-focus:text-sky-500 before:border-slate-700 peer-focus:before:border-sky-500 dark:after:border-slate-700 peer-focus:after:border-sky-500">
            Node count
          </label>
        </div>
        <div className="relative w-full">
          <textarea
            className="peer w-full focus:outline-none resize-none bg-transparent font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-sky-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-slate-700 placeholder-shown:border-t-slate-700 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-slate-700 focus:border-sky-500"
            rows={20}
            value={graphData}
            onChange={(e) => {
              setGraphData(e.target.value);
              const nodes: NodeGraph[] = [];
              const links: LinkGraph[] = [];
              const inputData = e.target.value.split("\n");
              inputData.forEach((item) => {
                const val = item.split(" ");

                if (!!val[0])
                  if (!nodes.find((node) => node.id === val[0]))
                    nodes.push({ id: val[0], name: val[0] });
                if (!!val[1])
                  if (!nodes.find((node) => node.id === val[1]))
                    nodes.push({ id: val[1], name: val[1] });

                if (!!val[0] && !!val[1])
                  if (
                    !links.find(
                      (link) =>
                        link.source === val[0] && link.target === val[1],
                    )
                  )
                    if (val[0] === val[1])
                      links.push({
                        source: val[0],
                        target: val[1],
                        weight: val[2] || "1",
                        curvature: 0.6,
                      });
                    else
                      links.push({
                        source: val[0],
                        target: val[1],
                        weight: val[2] || "1",
                      });
              });
              setNodeCount(nodes.length);
              setData({ nodes, links });
              dataForceGraph({ nodes, links });
            }}
            placeholder=""
            spellCheck={false}
          />
          <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-sky-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] peer-focus:text-sky-500 before:border-slate-700 peer-focus:before:border-sky-500 dark:after:border-slate-700 peer-focus:after:border-sky-500">
            Graph Data
          </label>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <button
              className="py-1 px-2 border border-slate-900 rounded hover:bg-slate-900 hover:text-white"
              onClick={() => _runKruskalOrPrim("kruskal")}
            >
              KRUSKAL
            </button>
          </div>
          <div>
            <div className="flex space-x-2">
              <button
                className="py-1 px-2 border border-slate-900 rounded hover:bg-slate-900 hover:text-white"
                onClick={() => {
                  if (data.nodes.find((node) => node.id === nodePrim))
                    _runKruskalOrPrim("prim");
                  else setErrInputNodePrim("Wrong input node");
                }}
              >
                PRIM
              </button>
              <input
                className="border border-slate-900 rounded px-2 focus:outline-none"
                placeholder="Node"
                value={nodePrim}
                onChange={(e) => setNodePrim(e.target.value)}
              />
            </div>
            {!!errInputNodePrim && (
              <p className="text-red-500">{errInputNodePrim}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraphEditor;
