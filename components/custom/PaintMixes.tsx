import * as React from "react";
import Hexagon from "./Hexagon";
import HexagonOutline from "./HexagonOutline";
import bestContrast from "get-best-contrast-color";

interface IPaintListProps {
  paintList: any[];
}

const PaintMixes: React.FunctionComponent<IPaintListProps> = ({
  paintList = [],
}) => {
  const possibleColors = ["#000", "#fff"];

  return (
    paintList?.length > 0 && (
      <ul className={`list-none flex flex-col gap-2 text-sm lg:grid lg:grid-cols-2 divide-2`}>
        {paintList.map((paint: any) => {
          return (
            <li key={paint._key} className="flex flex-col gap-2">
              {paint.name &&<h4 className="font-bold">{paint.name}</h4>}
              <div>
                <ul className="flex flex-col w-auto gap-0 lg:gap-0 pt-4">
                  {paint.mix.map((p: any, index: number) => {
                    const margin =
                      index % 2 === 0
                        ? paint.mix.length === 1
                          ? "whitespace-nowrap"
                          : "mr-9"
                        : paint.mix.length === 1
                          ? "whitespace-nowrap"
                          : "ml-9";
                    return (
                      <li
                        key={p._key}
                        className="flex items-center text-xs h-10 -mt-4"
                      >
                        <span
                          className={`inline-block relative ${margin}`}
                        >
                          {p.paint.color ? (
                            <Hexagon
                              className={`w-10 h-10 text-center`}
                              color={p.paint.color.hex}
                              textColor={bestContrast(
                                p.paint.color?.hex || "#FFFFFF",
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
                        <span className={`pl-4 ${paint.mix.length === 1 ? "whitespace-nowrap" : ""}`}>
                          <span>
                            <span className="font-bold">{p.paint.title}</span> (
                            {p.parts} {`part${p.parts > 1 ? "s" : ""}`})
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    )
  );
};

export default PaintMixes;
