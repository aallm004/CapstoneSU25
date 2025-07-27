import React, { useState } from "react";
import {
  StyledChatBotUI,
  StyledEllipse9,
  StyledEllipse10,
  StyledHeader,
  StyledNavigationPillList,
  StyledNavigationPill,
  StyledTitle,
  StyledFrame22,
  StyledAskOurAssistantAnything,
  StyledBottomSection,
  StyledSuggestionsTitle,
  StyledSuggestionCards,
  StyledSuggestionCard,
  StyledSuggestionText,
  StyledInputContainer,
  StyledInput,
  StyledSendButton,
  StyledSendIcon
} from "./ChatBotUI.styles";

export const ChatBotUI = () => {
  const [inputValue, setInputValue] = useState("");
  
  const suggestions = [
    "What can I ask you to do?",
    "I need some help with my emotions", 
    "I would like some recommendations for what to do when I am overwhelmed"
  ];

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const handleSendClick = () => {
    if (inputValue.trim()) {
      console.log("Sending:", inputValue);
      // Add your send logic here
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  return (
    <StyledChatBotUI>
      <StyledEllipse9 />
      <StyledEllipse10 />
      
      <StyledHeader>
        <StyledNavigationPillList>
          <StyledNavigationPill>
            <StyledTitle>Resources</StyledTitle>
          </StyledNavigationPill>
          <StyledNavigationPill>
            <StyledTitle>Contact</StyledTitle>
          </StyledNavigationPill>
        </StyledNavigationPillList>
      </StyledHeader>

      <StyledFrame22>
        <StyledAskOurAssistantAnything>
          Ask our Assistant anything
        </StyledAskOurAssistantAnything>
      </StyledFrame22>

      <StyledBottomSection>
        <StyledSuggestionsTitle>
          Suggestions on what to ask Our Mental Health Assistant
        </StyledSuggestionsTitle>
        
        <StyledSuggestionCards>
          {suggestions.map((suggestion, index) => (
            <StyledSuggestionCard 
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <StyledSuggestionText>
                {suggestion}
              </StyledSuggestionText>
            </StyledSuggestionCard>
          ))}
        </StyledSuggestionCards>

        <StyledInputContainer>
          <StyledInput
            type="text"
            placeholder="Ask me anything about your mental health"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <StyledSendButton onClick={handleSendClick}>
            <StyledSendIcon />
          </StyledSendButton>
        </StyledInputContainer>
      </StyledBottomSection>
    </StyledChatBotUI>
  );
};