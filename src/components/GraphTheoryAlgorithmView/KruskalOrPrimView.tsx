import { ResAlgorithm } from "../../graphTheory/TypeGraph";

function KruskalOrPrimView({ data }: { data: ResAlgorithm }) {
  return (
    <>
      {
        <div className="space-y-2">
          {data?.weight && data?.steps && (
            <>
              <ul>
                {data.steps?.map((st, i) => {
                  return (
                    <li key={i} className={"text-lg"}>
                      {`step ${i + 1}: ${st?.source}, ${st?.target}`}
                    </li>
                  );
                })}
              </ul>
              <div>
                <p className="font-serif font-semibold">
                  {`A = {`}
                  {data.steps?.reduce(
                    (previousValue, currentValue, i) =>
                      i === 0
                        ? previousValue +
                          `{${currentValue?.source}, ${currentValue?.target}}`
                        : previousValue +
                          `, {${currentValue?.source}, ${currentValue.target}}`,
                    "",
                  )}
                  {`} = ${data.weight}`}
                </p>
              </div>
            </>
          )}
        </div>
      }
    </>
  );
}

export default KruskalOrPrimView;
