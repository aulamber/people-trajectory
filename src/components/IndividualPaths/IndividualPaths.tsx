import { maxBy, minBy } from "lodash";
import React, { useMemo } from "react";
import { FormattedMessage } from "react-intl";

import { PointType } from "../../types/globalTypes";
import { IndividualPathsProps } from "./types";
import { CustomSVG } from "./IndividualPaths.style";

const mapWidth = 400;

export const IndividualPaths = ({
  positionsByIndividual,
  focusedIndividualId,
}: IndividualPathsProps) => {
  // need to handle the case where all individuals have 0 points - not done yet
  const allPositions: PointType[] = useMemo(
    () =>
      positionsByIndividual
        .flatMap((individual) => individual.segments)
        .flatMap((segment) => [segment.start, segment.end]),
    [positionsByIndividual]
  );
  const ranges = useMemo(() => {
    const minX = (minBy(allPositions, "x") as PointType).x;
    const maxX = (maxBy(allPositions, "x") as PointType).x;
    const minY = (minBy(allPositions, "y") as PointType).y;
    const maxY = (maxBy(allPositions, "y") as PointType).y;

    return {
      minX,
      maxX,
      minY,
      maxY,
    };
  }, [allPositions]);

  const neededMapHeight = useMemo(
    () => (mapWidth / ranges.maxX) * ranges.maxY,
    [ranges]
  );

  if (allPositions.length === 0) {
    return <FormattedMessage id="nothingToDisplay" />;
  }

  return (
    <div>
      <CustomSVG
        width={mapWidth}
        height={neededMapHeight}
        viewBox={`0 0 ${ranges.maxX} ${ranges.maxY}`}
      >
        {positionsByIndividual.map((individual, individualIndex) =>
          !focusedIndividualId || focusedIndividualId === individual.id
            ? individual.segments.map((segment, segmentIndex) => (
                <line
                  key={individual.id + segmentIndex} // not good to use index as keys tho
                  stroke={`hsl(${
                    (individualIndex / positionsByIndividual.length) * 255
                  }, 100%, 50%)`}
                  strokeWidth={0.1}
                  x1={segment.start.x}
                  y1={segment.start.y}
                  x2={segment.end.x}
                  y2={segment.end.y}
                  strokeLinecap="round"
                />
              ))
            : null
        )}
      </CustomSVG>
    </div>
  );
};
