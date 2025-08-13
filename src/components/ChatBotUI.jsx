import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  StyledChatBotUI,
  StyledEllipse9,
  StyledEllipse10,
  StyledHeader,
  StyledLogoContainer,
  StyledLogo,
  StyledBrandTitle,
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

let MESSAGES = [];

export const ChatBotUI = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleNavigation = (page) => {
    if (page === 'resources') {
      navigate('/resources');
    } else if (page === 'home') {
      navigate('/');
    }
  };

  
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);
  
  const API_BASE = "https://dczq55guecss3nfqektmhapolq0dgnkw.lambda-url.us-east-1.on.aws/messages";

  // format api responses
  const formatResponse = (text) => {
    if (!text) return text;

    const textString = String(text);
    const lines = textString.split(/\r?\n/).filter(line => line.trim() !== '');
    
    const formattedElements = lines.map((line, index) => {
      let formattedContent = line.trim();
      
      formattedContent = formattedContent.replace(/\[b\](.*?)\[\/b\]/g, '<strong>$1</strong>');
      formattedContent = formattedContent.replace(/\[i\](.*?)\[\/i\]/g, '<em>$1</em>');
      formattedContent = formattedContent.replace(/\[url\](.*?)\[\/url\]/g, '<a href="https://$1" target="_blank" rel="noopener noreferrer" style="color: #007AFF; text-decoration: underline;">$1</a>');
      
      if (/^\d+\./.test(formattedContent.trim())) {
        return (
          <div key={index} style={{ margin: '8px 0', paddingLeft: '16px', lineHeight: '1.6' }} 
               dangerouslySetInnerHTML={{ __html: formattedContent }} />
        );
      }
      
      if (/^\s*[-•*]/.test(formattedContent) || formattedContent.includes('* ')) {
        formattedContent = formattedContent.replace(/^\s*[-•*]\s*/, '• ');
        return (
          <div key={index} style={{ margin: '4px 0', paddingLeft: '20px', lineHeight: '1.6' }} 
               dangerouslySetInnerHTML={{ __html: formattedContent }} />
        );
      }
      
      if (formattedContent.trim().endsWith(':') && formattedContent.length < 100) {
        return (
          <div key={index} style={{ fontWeight: 'bold', margin: '16px 0 8px 0', color: '#160211', lineHeight: '1.6' }} 
               dangerouslySetInnerHTML={{ __html: formattedContent }} />
        );
      }
      
      return (
        <div key={index} style={{ margin: '8px 0', lineHeight: '1.6' }} 
             dangerouslySetInnerHTML={{ __html: formattedContent }} />
      );
    });

    return formattedElements;
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "nearest"
      });
    }
    
    if (chatMessagesRef.current) {
      setTimeout(() => {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
    const timer = setTimeout(scrollToBottom, 150);
    return () => clearTimeout(timer);
  }, [messages]);

  const suggestions = [
    "How are you able to help me?",
    "I need some help with my emotions", 
    "I would like some grounding exercises to help me feel calm"
  ];

  // Function to call your API
  const sendMessageToAPI = async (message) => {
    MESSAGES.push(message);
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      const requestBody = { messages: MESSAGES };
      
      const response = await fetch(`${API_BASE}/messages`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
      }

      const responseText = await response.text();
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error(`Invalid JSON response: ${responseText}`);
      }
      
      if (data.messages && Array.isArray(data.messages) && data.messages.length > 0) {
        let latestMessage = data.messages.slice(-1)[0];
        MESSAGES.push(latestMessage);
        return latestMessage;
      }
      
      if (data.response) {
        return data.response;
      }

      // Fallback strategy
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const getResponse = await fetch(API_BASE, {
        method: "GET",
        headers: headers
      });
      
      if (getResponse.ok) {
        const getData = await getResponse.json();
        
        if (getData.messages && Array.isArray(getData.messages)) {
          const latestMessage = getData.messages.slice(-1);
          
          if (latestMessage) {
            MESSAGES.push(latestMessage);
            return latestMessage;
          }
        }
      }
      
      return `I received your message: "${message}"\n\nThere seems to be an issue with generating a response. Please try again.`;
      
    } catch (error) {
      console.error("API Error:", error);
      return `Sorry, I'm having trouble connecting right now. Please try again later.`;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const handleSendClick = async () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage = inputValue.trim();
      
      const newUserMessage = {
        id: Date.now(),
        text: userMessage,
        sender: 'user'
      };
      setMessages(prev => [...prev, newUserMessage]);
      
      setInputValue("");
      setIsLoading(true);
      
      // Adds "thinking" message
      const thinkingMessage = {
        id: Date.now() + 1,
        text: "Thinking...",
        sender: 'assistant',
        isThinking: true
      };
      setMessages(prev => [...prev, thinkingMessage]);
      
      try {
        const apiResponse = await sendMessageToAPI(userMessage);
        
        setMessages(prev => {
          const filteredMessages = prev.filter(msg => !msg.isThinking);
          return [...filteredMessages, {
            id: Date.now() + 2,
            text: apiResponse,
            sender: 'assistant',
            formatted: true
          }];
        });
        
        setTimeout(scrollToBottom, 200);
        
      } catch (error) {
        console.error("Error sending message:", error);
        
        setMessages(prev => {
          const filteredMessages = prev.filter(msg => !msg.isThinking);
          return [...filteredMessages, {
            id: Date.now() + 2,
            text: `Sorry, I encountered an error. Please try again.`,
            sender: 'assistant'
          }];
        });
        
        setTimeout(scrollToBottom, 200);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendClick();
    }
  };

  return (
    <StyledChatBotUI>
      <StyledEllipse9 />
      <StyledEllipse10 />
      
      <StyledHeader>
        <StyledLogoContainer>
          <StyledLogo onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img 
              src="/logo512.png" 
              alt="Company Logo" 
              style={{ height: '100%', width: 'auto' }}
            />
          </StyledLogo>
          <StyledBrandTitle>SafeOfMind</StyledBrandTitle>
        </StyledLogoContainer>
        <StyledNavigationPillList>
          <StyledNavigationPill onClick={() => handleNavigation('resources')}>
            <StyledTitle>Resources</StyledTitle>
          </StyledNavigationPill>
          <StyledNavigationPill onClick={() => window.open('https://linktr.ee/SafeOfMind', '_blank')}
              style={{ cursor: 'pointer' }}>
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
        <StyledChatMessages ref={chatMessagesRef}>
          {messages.length === 0 ? (
            <StyledMessage>
              <StyledMessageText style={{ fontStyle: 'italic', opacity: 0.7 }}>
                🌟 Welcome to your Mental Health Assistant!
                <br /><br />
                Start a conversation by typing a message below or clicking on a suggestion.
              </StyledMessageText>
            </StyledMessage>
          ) : (
            messages.map((message) => (
              <StyledMessage key={message.id} $isUser={message.sender === 'user'}>
                <StyledMessageText 
                  $isUser={message.sender === 'user'}
                  style={message.isThinking ? { fontStyle: 'italic', opacity: 0.8 } : {}}
                >
                  {message.sender === 'assistant' && !message.isThinking ? 
                    formatResponse(message.text) : 
                    message.text
                  }
                </StyledMessageText>
              </StyledMessage>
            ))
          )}
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} />
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
              style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
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
            placeholder={isLoading ? "Processing your message..." : "Ask me anything about your mental health"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <StyledSendButton 
            onClick={handleSendClick}
            style={{ 
              opacity: isLoading || !inputValue.trim() ? 0.5 : 1, 
              cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer' 
            }}
          >
            <StyledSendIcon />
          </StyledSendButton>
        </StyledInputContainer>
      </StyledBottomSection>
    </StyledChatBotUI>
  );
};