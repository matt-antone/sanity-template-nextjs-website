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
      <ul className="list-none text-sm lg:grid lg:grid-cols-2 divide-2">
        {paintList.map((paint: any) => {
          console.log(paint);
          return (
            <li key={paint._key} className="flex flex-col gap-2 p-4">
              <h4 className="font-bold">{paint.name}</h4>
              <div>
                <ul className="flex flex-col w-auto pt-4 gap-0 lg:gap-0">
                  {paint.mix.map((p: any, index: number) => {
                    const margin =
                      index % 2 === 0
                        ? paint.mix.length === 1
                          ? ""
                          : "lg:mr-10"
                        : paint.mix.length === 1
                          ? ""
                          : "lg:ml-10";
                    const textColor = bestContrast(
                      p.paint.color?.hex || "#000",
                      possibleColors
                    );
                    return (
                      <li
                        key={p._key}
                        className="flex items-center text-xs h-10 lg:-mt-4"
                      >
                        <span
                          className={`inline-block relative ${margin}`}
                          style={{
                            color: p.paint?.color ? textColor : "#000",
                          }}
                        >
                          {p.paint.color ? (
                            <Hexagon
                              className={`w-10 h-10 lg:w-12 lg:h-12`}
                              color={p.paint.color.hex} 
                              // style={{
                              //   fill: p.paint.color.hex || "#000",
                              // }}
                            />
                          ) : (
                            <HexagonOutline
                              className={`w-10 h-10 lg:w-12 lg:h-12 fill-slate-300`}
                            />
                          )}
                          <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs font-bold">
                            {p.parts}
                          </span>
                        </span>
                        <span className={`flex pl-4`}>
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

export default PaintList;
