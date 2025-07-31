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
  StyledChatContainer,
  StyledChatMessages,
  StyledMessage,
  StyledMessageText,
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
  const [messages, setMessages] = useState([]);
  
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
      // Add user message
      const newMessage = {
        id: Date.now(),
        text: inputValue,
        sender: 'user'
      };
      setMessages(prev => [...prev, newMessage]);
      
      // Simulated assistant response, need to replace with our own api call
      setTimeout(() => {
        const assistantMessage = {
          id: Date.now() + 1,
          text: "Thank you for your message. I'm here to help with your mental health concerns.",
          sender: 'assistant'
        };
        setMessages(prev => [...prev, assistantMessage]);
      }, 1000);
      
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

      {/* Chat Container */}
      <StyledChatContainer>
        <StyledChatMessages>
          {messages.length === 0 ? (
            <StyledMessage>
              <StyledMessageText style={{ fontStyle: 'italic', opacity: 0.7 }}>
                Start a conversation by typing a message below or clicking on a suggestion.
              </StyledMessageText>
            </StyledMessage>
          ) : (
            messages.map((message) => (
              <StyledMessage key={message.id} isUser={message.sender === 'user'}>
                <StyledMessageText isUser={message.sender === 'user'}>
                  {message.text}
                </StyledMessageText>
              </StyledMessage>
            ))
          )}
        </StyledChatMessages>
      </StyledChatContainer>

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