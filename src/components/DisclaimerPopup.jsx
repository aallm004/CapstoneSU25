import React from "react";
import {
  StyledOverlay,
  StyledNotification,
  StyledTitle,
  StyledInfo,
  StyledStack,
  StyledContent,
  StyledTitle01,
  StyledBodytext,
  StyledButton,
  StyledButton01
} from "./DisclaimerPopup.styles";

export const DisclaimerPopup = ({ onAccept }) => {
  const handleAccept = () => {
    onAccept();
  };

  const handleOverlayClick = (e) => {

    if (e.target === e.currentTarget) {

    }
  };

  return (
    <StyledOverlay onClick={handleOverlayClick}>
      <StyledNotification>
        <StyledTitle>
          <StyledInfo />
          <StyledStack>
            <StyledContent>
              <StyledTitle01>Disclaimer</StyledTitle01>
              <StyledBodytext>This is not a licensed therapist</StyledBodytext>
            </StyledContent>
            <StyledButton onClick={handleAccept}>
              <StyledButton01>I Accept</StyledButton01>
            </StyledButton>
          </StyledStack>
        </StyledTitle>
      </StyledNotification>
    </StyledOverlay>
  );
};