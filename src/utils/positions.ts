import { sortBy, sumBy } from "lodash";
import { STOP_DISTANCE_THRESHOLD } from "../constants/stopThreshold";
import { positionsNotInOrder } from "../mocks/mockPositions";
import {
  IndividualListType,
  SegmentType,
  SegmentWithDistanceType,
  SimpleSegmentType,
} from "../types/globalTypes";

// sorting could/should be done by the backend but in our case,
// we sort it as soon as possible to avoid having to do it in the components

const computeDistance = (segment: SimpleSegmentType): number =>
  Math.sqrt(
    Math.pow(segment.end.x - segment.start.x, 2) +
      Math.pow(segment.end.y - segment.start.y, 2)
  );

const isSegmentAStop = (segment: SegmentWithDistanceType): boolean => {
  // there could be other ways to determine if a segment is a stop.
  // For instance, the speed of the segment, a small speed would indicate
  // that the person is strolling in front of some products looking for something

  // these stop testing strategy could even be dynamic and available for the user to determine

  // for now, lets go with a very simple business rule
  return segment.distance <= STOP_DISTANCE_THRESHOLD;
};

export const positions: IndividualListType = positionsNotInOrder
  .filter((individual) => individual.points?.length > 1)
  .map((individual) => {
    const sortedPointsByTime = sortBy(individual.points, "time");

    const duration =
      sortedPointsByTime[sortedPointsByTime.length - 1].time -
      sortedPointsByTime[0].time;
    // we know that the length is at least 2
    const segments = sortedPointsByTime.reduce<SegmentType[]>(
      (previousSegments, point, index, points) => {
        if (index < points.length - 2) {
          const newSegment = {
            start: point,
            end: points[index + 1],
            distance: null,
          };
          // as the distance will be needed both for the stops count and the total distance,
          // we will store it on a segment even tho it's just a derived data
          const segmentDistance = computeDistance(newSegment);

          const segmentWithDistance = {
            ...newSegment,
            distance: segmentDistance,
          };

          const finalSegment = {
            ...segmentWithDistance,
            // for this exercise we decide that wether a segment is a stop is decided beforehand and will not change
            isAStop: isSegmentAStop(segmentWithDistance),
          };
          return previousSegments.concat(finalSegment);
        }

        return previousSegments;
      },
      []
    );

    const distance = sumBy(segments, "distance");
    // not sure what the units are
    const speed = distance / duration;
    const stops = segments.filter((segment) => segment.isAStop).length;

    return {
      id: individual.id,
      segments,
      duration,
      speed,
      distance,
      stops,
    };
  });
