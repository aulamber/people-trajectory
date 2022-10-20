import styled from "styled-components";

import { theme } from "../../utils/theme";
import { IndividualWrapperProps } from "./types";

export const IndividualWrapper = styled.div<IndividualWrapperProps>`
  background: ${theme.colors.primary.dark};
  color: white;
  cursor: pointer;
  padding: 10px;
  text-align: center;
  ${({ isFocused }) => isFocused && `text-decoration: underline;`}

  &:hover {
    background: ${theme.colors.primary.regular};
  }
`;
