import { Path, ResAlgorithm } from "../../graphTheory/TypeGraph";

function DijkstraView({ data }: { data: ResAlgorithm }) {
  return (
    <>
      <div>
        <ul>
          {data?.paths &&
            data?.paths?.map((path: Path) => (
              <li className="" key={path.node}>
                <p>
                  {`node ${path.node}: ${
                    !(path.distances >= Number.MAX_SAFE_INTEGER)
                      ? path.path.reduce(
                          (previousValue, currentValue, i) =>
                            i === 0
                              ? previousValue + currentValue
                              : previousValue + " -> " + currentValue,
                          ""
                        ) + ` (${path.distances})`
                      : "Không có đường đi"
                  }`}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default DijkstraView;
