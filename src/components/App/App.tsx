import { useMemo, useRef, useState } from "react";
import { IntlProvider } from "react-intl";

import { FocusedIndividualInformations } from "../FocusedIndividualInformations";
import { IndividualList } from "../IndividualList";
import { IndividualPaths } from "../IndividualPaths";
import { positions } from "../../utils/positions";
import { messages } from "../../translations/en";
import { FocusedIndividualIdType } from "../../types/globalTypes";
import { ListWrapper, MainContainer } from "./App.style";

function App() {
  // maybe all the lines pertaining to the focusedIndividualId could be in a custom hook
  const [focusedIndividualId, setFocusedIndividualId] =
    useState<FocusedIndividualIdType>(null);
  const toggleFocusedIndividual = useRef((individualId: string) =>
    setFocusedIndividualId((oldFocus) => {
      if (oldFocus === individualId) {
        return null;
      }
      return individualId;
    })
  ).current;
  // up to here

  const focusedIndividual = useMemo(
    () => positions.find((individual) => individual.id === focusedIndividualId),
    [focusedIndividualId]
  );

  return (
    <MainContainer>
      <ListWrapper>
        <IndividualList
          individuals={positions}
          toggleFocusedIndividual={toggleFocusedIndividual}
          focusedIndividualId={focusedIndividualId}
        />
      </ListWrapper>
      <IndividualPaths
        positionsByIndividual={positions}
        focusedIndividualId={focusedIndividualId}
      />
      <FocusedIndividualInformations focusedIndividual={focusedIndividual} />
    </MainContainer>
  );
}

const AppInProviders = () => {
  return (
    <IntlProvider messages={messages} locale="en">
      <App />
    </IntlProvider>
  );
};

export default AppInProviders;
