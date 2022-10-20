import {
  FocusedIndividualIdType,
  IndividualListType,
} from "../../types/globalTypes";

export type IndividualListProps = {
  individuals: IndividualListType;
  focusedIndividualId: FocusedIndividualIdType;
  toggleFocusedIndividual: (a: string) => void;
};

export type IndividualWrapperProps = {
  isFocused: boolean;
};
