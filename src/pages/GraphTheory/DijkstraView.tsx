import { Path, ResAlgorithm } from "../../graphTheory/TypeGraph";

function DijkstraView({ data }: { data: ResAlgorithm }) {
  return (
    <>
      <div>
        <ul>
          {data?.paths &&
            data?.paths?.map((path: Path) => (
              <li className="space-x-1" key={path.node}>
                <span className="font-medium">{`node ${path.node}: `}</span>
                <span>
                  {`${
                    !(path.distances >= Number.MAX_SAFE_INTEGER)
                      ? path.path.reduce(
                          (previousValue, currentValue, i) =>
                            i === 0
                              ? previousValue + currentValue
                              : previousValue + " -> " + currentValue,
                          "",
                        ) + ` (${path.distances})`
                      : "∞"
                  }`}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default DijkstraView;
