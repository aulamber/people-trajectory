import { FormattedMessage } from "react-intl";

import { IndividualListProps } from "./types";
import { IndividualWrapper } from "./IndividualList.style";

export const IndividualList = ({
  individuals,
  toggleFocusedIndividual,
  focusedIndividualId,
}: IndividualListProps) => {
  return (
    <>
      {individuals?.length > 0 ? (
        individuals.map((individual) => (
          <IndividualWrapper
            isFocused={focusedIndividualId === individual.id}
            key={individual.id}
            onClick={() => toggleFocusedIndividual(individual.id)}
          >
            {individual.id}
          </IndividualWrapper>
        ))
      ) : (
        <FormattedMessage id="noIndividual" />
      )}
    </>
  );
};
