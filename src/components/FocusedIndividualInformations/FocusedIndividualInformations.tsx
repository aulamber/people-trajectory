import { FormattedMessage } from "react-intl";

import { FocusedIndividualInformationsProps } from "./types";
import { InformationsWrapper } from "./FocusedIndividualInformations.style";

export const FocusedIndividualInformations = ({
  focusedIndividual,
}: FocusedIndividualInformationsProps) => {
  return (
    <InformationsWrapper>
      {!focusedIndividual ? (
        <FormattedMessage id="pickIndividualFirst" />
      ) : (
        <>
          <div>
            <FormattedMessage id="duration" />: {focusedIndividual.duration}
          </div>
          <div>
            <FormattedMessage id="distance" />: {focusedIndividual.distance}
          </div>
          <div>
            <FormattedMessage id="averageSpeed" />: {focusedIndividual.speed}
          </div>
          <div>
            <FormattedMessage id="numberOfStops" />:{focusedIndividual.stops}
          </div>
        </>
      )}
    </InformationsWrapper>
  );
};
