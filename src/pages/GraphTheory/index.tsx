import React from "react";
import ReactForceGraph2d from "react-force-graph-2d";
import ReactForceGraph3d from "react-force-graph-3d";
import KruskalOrPrimView from "./KruskalOrPrimView";
import {
  buildGraph,
  DijkstraAlgorithm,
  KruskalAlgorithm,
  PrimAlgorithm,
} from "../../graphTheory";
import {
  DataForceGraph,
  LinkGraph,
  NodeGraph,
  ResAlgorithm,
} from "../../graphTheory/TypeGraph";
import DijkstraView from "./DijkstraView";
import SpriteText from "three-spritetext";

const sizeReactForceGraph2d = 36;

function GraphTheory() {
  const [directionless, setDirectionless] = React.useState(true);
  const [nodeCount, setNodeCount] = React.useState(0);
  const [inputData, setInputData] = React.useState("");
  const [graphData, setGraphData] = React.useState<DataForceGraph>({
    nodes: [],
    links: [],
  });
  const [view3d, setView3d] = React.useState(false);
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [algorithm, setAlgorithm] = React.useState<
    "kruskal" | "prim" | "dijkstra"
  >("kruskal");
  const [err, setErr] = React.useState("");

  const [algorithmViewData, setAlgorithmViewData] =
    React.useState<ResAlgorithm>();

  const forceRef = React.useRef<any>(null);
  const handleChangeInputData = (value: string) => {
    setInputData(value);
    const nodes: NodeGraph[] = [];
    const links: LinkGraph[] = [];
    const inputData = value.split("\n");
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
            (link) => link.source === val[0] && link.target === val[1],
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
    setGraphData({
      nodes,
      links,
    });
  };

  React.useEffect(() => {
    handleChangeInputData(`7 5 60
9 8 31
9 1 83
4 3 25
6 2 1
4 1 52
6 3 76
7 6 95
9 7 84
8 2 91
10 7 8
6 4 32
10 2 76
3 1 62
10 6 88
8 3 12
5 3 15
5 4 40
9 2 20
3 2 5
5 1 36
9 4 98
8 6 65
8 5 95
10 3 55
9 6 95
10 1 5
4 2 70
7 1 80
10 4 35
7 2 99
10 9 24
6 5 94
2 1 77
8 1 12
8 4 76
9 3 27
5 2 5
9 5 12
10 5 1
8 7 59
6 1 1
10 8 92
7 3 54`);
    forceRef?.current?.d3Force("charge")?.strength(-150);
    forceRef?.current?.d3Force("link")?.distance(50);
    forceRef?.current?.d3Force("charge")?.distanceMax(150);
  }, []);

  let ViewAlgorithm = <></>;
  if (
    algorithmViewData?.algorithm === "prim" ||
    algorithmViewData?.algorithm === "kruskal"
  ) {
    ViewAlgorithm = <KruskalOrPrimView data={algorithmViewData} />;
  } else if (algorithmViewData?.algorithm === "dijkstra") {
    ViewAlgorithm = <DijkstraView data={algorithmViewData} />;
  }

  return (
    <>
      <div className="">
        <div className="max-w-7xl m-auto relative">
          <div className="block fixed z-20 inset-0 left-[max(0px,calc(50%-45rem))] w-96 overflow-y-auto py-2 px-4 bg-slate-50">
            <div className="space-y-4">
              <header className="space-y-4">
                <h1 className="text-4xl text-center font-semibold">
                  Graph Theory
                </h1>
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
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-sky-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] peer-focus:text-sky-500 before:border-slate-700 peer-focus:before:border-sky-500 dark:after:border-slate-700 peer-focus:after:border-sky-500">
                    Node count
                  </label>
                </div>
                <div className="relative w-full">
                  <textarea
                    className="peer w-full focus:outline-none resize-none bg-transparent font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-sky-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-slate-700 placeholder-shown:border-t-slate-700 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-slate-700 focus:border-sky-500"
                    rows={15}
                    value={inputData}
                    onChange={(e) => {
                      handleChangeInputData(e.target.value);
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
                    <input
                      className="w-full py-1 border border-slate-900 rounded px-2 focus:outline-none"
                      placeholder="Start"
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                    />
                    <input
                      className="w-full py-1 border border-slate-900 rounded px-2 focus:outline-none"
                      placeholder="End"
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      className={
                        algorithm === "kruskal"
                          ? "py-1 px-2 border border-slate-900 rounded bg-slate-900 text-white"
                          : "py-1 px-2 border border-slate-900 rounded hover:bg-slate-900 hover:text-white"
                      }
                      onClick={() => {
                        setAlgorithm("kruskal");
                        setDirectionless(true);
                      }}
                    >
                      KRUSKAL
                    </button>
                    <button
                      className={
                        algorithm === "prim"
                          ? "py-1 px-2 border border-slate-900 rounded bg-slate-900 text-white"
                          : "py-1 px-2 border border-slate-900 rounded hover:bg-slate-900 hover:text-white"
                      }
                      onClick={() => {
                        setAlgorithm("prim");
                        setDirectionless(true);
                      }}
                    >
                      PRIM
                    </button>
                    <button
                      className={
                        algorithm === "dijkstra"
                          ? "py-1 px-2 border border-slate-900 rounded bg-slate-900 text-white"
                          : "py-1 px-2 border border-slate-900 rounded hover:bg-slate-900 hover:text-white"
                      }
                      onClick={() => {
                        setAlgorithm("dijkstra");
                        setDirectionless(false);
                      }}
                    >
                      DIJKSTRA
                    </button>
                  </div>
                  <button
                    className="py-1 px-2 border border-slate-900 rounded hover:bg-slate-900 hover:text-white w-32 ml-auto"
                    onClick={() => {
                      if (
                        graphData.nodes.find(
                          (node) => node.id === start.trim(),
                        ) ||
                        algorithm === "kruskal"
                      ) {
                        setErr("");
                        let graph = buildGraph(
                          inputData.split("\n").map((l) => l.split(" ")),
                          true,
                        );
                        switch (algorithm) {
                          case "kruskal":
                            setAlgorithmViewData(KruskalAlgorithm(graph));
                            break;
                          case "prim":
                            setAlgorithmViewData(
                              PrimAlgorithm(graph, start.trim()),
                            );

                            break;
                          case "dijkstra":
                            graph = buildGraph(
                              inputData.split("\n").map((l) => l.split(" ")),
                              false,
                            );
                            setAlgorithmViewData(
                              DijkstraAlgorithm(
                                graph,
                                start.trim(),
                                end.trim(),
                              ),
                            );
                            break;
                          default:
                            break;
                        }
                      } else {
                        setErr("wrong input node");
                      }
                    }}
                  >
                    Run
                  </button>
                </div>
                {err && <p className="text-red-500 font-semibold">{err}</p>}
              </div>
            </div>
          </div>
          <div className="pl-[19.5rem]">
            <div className="pr-[19.5rem]">
              <div className="p-4 flex gap-4 flex-wrap">
                <div className="flex justify-center">
                  <div
                    className={`flex flex-col border border-slate-900 h-[${
                      sizeReactForceGraph2d * 16 + 3
                    }rem] w-[${sizeReactForceGraph2d * 16}rem] rounded`}
                  >
                    <div
                      className={`h-[3rem] w-[${
                        sizeReactForceGraph2d * 16
                      }rem] border-b border-b-slate-900 flex items-center px-2 space-x-4`}
                    >
                      <button
                        className="py-1 px-2 border border-slate-900 rounded hover:bg-slate-900 hover:text-white"
                        onClick={() => {
                          forceRef.current.zoomToFit();
                        }}
                      >
                        Focus
                      </button>
                      <button
                        className={
                          !view3d
                            ? "py-1 px-2 border border-slate-900 rounded"
                            : "py-1 px-2 border border-slate-900 rounded bg-slate-900 text-white"
                        }
                        onClick={() => setView3d(!view3d)}
                      >
                        3D
                      </button>
                    </div>
                    {!view3d ? (
                      <ReactForceGraph2d
                        graphData={graphData}
                        nodeRelSize={6}
                        width={sizeReactForceGraph2d * 16}
                        height={sizeReactForceGraph2d * 16}
                        nodeLabel="name"
                        linkCurvature="curvature"
                        enablePointerInteraction={true}
                        linkDirectionalParticleWidth={1}
                        ref={forceRef}
                        nodeCanvasObject={(node: any, ctx, globalScale) => {
                          const label = node.name;
                          const fontSize = 14 / globalScale;
                          ctx.font = `${fontSize}px Sans-Serif`;
                          ctx.textAlign = "center";
                          ctx.textBaseline = "middle";
                          ctx.fillStyle = "white";
                          ctx.fillText(label, node.x, node.y);
                        }}
                        nodeCanvasObjectMode={() => "after"}
                        onNodeClick={(node) => {
                          forceRef?.current?.zoom(3, 300);
                          forceRef?.current?.centerAt(node.x, node.y, 300);
                        }}
                        linkWidth={2}
                        linkDirectionalArrowLength={directionless ? 0 : 5}
                        linkDirectionalArrowRelPos={1}
                      />
                    ) : (
                      <ReactForceGraph3d
                        graphData={graphData}
                        nodeRelSize={6}
                        width={sizeReactForceGraph2d * 16}
                        height={sizeReactForceGraph2d * 16}
                        nodeLabel="name"
                        linkCurvature="curvature"
                        enablePointerInteraction={true}
                        linkDirectionalParticleWidth={1}
                        ref={forceRef}
                        linkWidth={2}
                        linkDirectionalArrowLength={directionless ? 0 : 5}
                        linkDirectionalArrowRelPos={1}
                        nodeAutoColorBy="group"
                        nodeThreeObject={(node: any) => {
                          const sprite = new SpriteText(node.name);
                          sprite.color = node.color;
                          sprite.textHeight = 8;
                          sprite.padding = 2;
                          return sprite;
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="block fixed z-20 top-0 bottom-0 right-[max(0px,calc(50%-45rem))] w-96 overflow-y-auto py-2 px-4 bg-slate-50">
                <header className="py-2 space-y-2">
                  <h2 className="text-3xl text-center uppercase font-semibold">
                    {algorithmViewData?.algorithm}
                  </h2>
                </header>
                <div className="mt-6">
                  {!algorithmViewData?.success
                    ? algorithmViewData?.message && (
                        <p className="text-red-500 font-semibold">
                          {algorithmViewData.message}
                        </p>
                      )
                    : ViewAlgorithm}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GraphTheory;
