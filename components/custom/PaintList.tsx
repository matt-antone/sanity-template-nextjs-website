import * as React from "react";
import Hexagon from "./Hexagon";
import HexagonOutline from "./HexagonOutline";
import bestContrast from "get-best-contrast-color";

interface IPaintListProps {
  paintList: any[];
}

const PaintList: React.FunctionComponent<IPaintListProps> = ({
  paintList = [],
}) => {
  const possibleColors = ["#000", "#fff"];

  return (
    paintList?.length > 0 && (
      <div className="not-prose mb-8 text-xl py-8">
        <h2 className="font-bold mb-4 text-xl">Paints You&apos;ll Need</h2>
        <ul className="w-auto pt-4 gap-0 lg:gap-0 lg:columns-2">
          {paintList
            .sort((a: any, b: any) => {
              return a.name > b.name ? 1 : -1;
            })
            .map((p: any, index: number) => {
              const margin =
                index % 2 === 0
                  ? paintList.length === 1
                    ? ""
                    : "mr-9"
                  : paintList.length === 1
                    ? ""
                    : "ml-9";
              return (
                <li
                  key={p._key}
                  className="flex items-center text-xs h-10 -mt-4"
                >
                  <span className={`inline-block relative ${margin}`}>
                    {p.color ? (
                      <Hexagon
                        className={`w-10 h-10 text-center`}
                        color={p.color}
                        textColor={bestContrast(
                          p.color || "#FFFFFF",
                          possibleColors
                        )}
                        number={p.parts}
                      />
                    ) : (
                      <HexagonOutline
                        className={`w-10 h-10 fill-slate-300`}
                        number={p.parts}
                      />
                    )}
                  </span>
                  <span className={`flex pl-4`}>
                    <span>
                      <span className="font-bold">{p.name}</span>
                    </span>
                  </span>
                </li>
              );
            })}
        </ul>
        <p className="text-sm text-slate-500 mt-4">
          Some paints may be used in multiple steps. If you don&apos;t have
          these paints, feel free to use an approximate color.
        </p>
      </div>
    )
  );
};

export default PaintList;
