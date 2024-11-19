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
      <div className="not-prose float-right mb-8 ml-8 p-8 bg-slate-100 rounded-sm">
        <h2 className="text-lg font-bold mb-4">Paints You&apos;ll Need</h2>
        <ul className="flex flex-col w-auto pt-4 gap-0 lg:gap-0">
          {paintList.sort((a:any, b:any) => {
            return a.name > b.name ? 1 : -1;
          }).map((p: any, index: number) => {
            const margin =
              index % 2 === 0
                ? paintList.length === 1
                  ? ""
                  : "lg:mr-10"
                : paintList.length === 1
                  ? ""
                  : "lg:ml-10";
            return (
              <li
                key={p._key}
                className="flex items-center text-xs h-10 lg:-mt-4"
              >
                <span className={`inline-block relative ${margin}`}>
                  {p.color ? (
                    <Hexagon
                      className={`w-10 h-10 lg:w-12 lg:h-12 text-center`}
                      color={p.color}
                      textColor={bestContrast(
                        p.color || "#FFFFFF",
                        possibleColors
                      )}
                      number={p.parts}
                    />
                  ) : (
                    <HexagonOutline
                      className={`w-10 h-10 lg:w-12 lg:h-12 fill-slate-300`}
                      number={p.parts}
                    />
                  )}
                  {/* <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs font-bold">
                            {p.parts}
                          </span> */}
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
        <p className="text-sm text-slate-500 mt-4 max-w-xs">
          Some paints may be used in multiple steps. If you don&apos;t have these paints, feel free to use an approximate color.
        </p>
      </div>
    )
  );
};

export default PaintList;
