export type PointType = {
  time: number;
  x: number;
  y: number;
};

export type SimpleSegmentType = {
  start: PointType;
  end: PointType;
};
export type SegmentWithDistanceType = SimpleSegmentType & {
  distance: number;
};
export type SegmentType = SegmentWithDistanceType & {
  isAStop: boolean;
};

export type IndividualType = {
  id: string;
  segments: SegmentType[];
  duration: number;
  speed: number;
  distance: number;
  stops: number;
};

export type IndividualListType = IndividualType[];

export type FocusedIndividualIdType = string | null;
