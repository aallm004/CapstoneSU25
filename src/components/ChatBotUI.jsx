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

let MESSAGES = [];

export const ChatBotUI = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState([]);
  
  // Your API configuration
  const API_BASE = "https://dczq55guecss3nfqektmhapolq0dgnkw.lambda-url.us-east-1.on.aws/messages";

  
  const suggestions = [
    "What can I ask you to do?",
    "I need some help with my emotions", 
    "I would like some recommendations for what to do when I am overwhelmed"
  ];

  // Add debug message to help troubleshoot
  const addDebugInfo = (info) => {
    console.log("DEBUG:", info);
    setDebugInfo(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${info}`]);
  };

  // Test API connectivity
  const testAPIConnection = async () => {
    addDebugInfo("Testing API connection...");
    
    try {
      const response = await fetch(API_BASE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      
      addDebugInfo(`Base API response: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.json();
        addDebugInfo(`Base API data keys: ${Object.keys(data).join(', ')}`);
        console.log("Base API Response:", data);
      }
      
    } catch (error) {
      addDebugInfo(`API connection test failed: ${error.message}`);
      console.error("API Connection Test Error:", error);
    }
  };

  // Function to call your API with enhanced debugging
  const sendMessageToAPI = async (message) => {
    addDebugInfo(`Sending message: "${message}"`);
    MESSAGES.push(message);
    try {
      const headers = {
        "Content-Type": "application/json",
      };



      // Send the message
      const requestBody = { messages: MESSAGES };
      addDebugInfo(`Request URL: ${API_BASE}/messages`);
      addDebugInfo(`Request body: ${JSON.stringify(requestBody)}`);
      
      const response = await fetch(`${API_BASE}/messages`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody)
      });

      addDebugInfo(`Response status: ${response.status} ${response.statusText}`);

      // Get response text first to see what we're actually receiving
      const responseText = await response.text();
      addDebugInfo(`Raw response: ${responseText.substring(0, 200)}${responseText.length > 200 ? '...' : ''}`);
      let data = JSON.parse(responseText);
      let latestMessage = data.messages.slice(-1)[0];
      console.log(latestMessage);
      MESSAGES.push(latestMessage);
      return latestMessage;

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
      }

      try {
        data = JSON.parse(responseText);
        addDebugInfo(`Parsed JSON successfully, keys: ${Object.keys(data).join(', ')}`);
      } catch (parseError) {
        addDebugInfo(`JSON parse error: ${parseError.message}`);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }

      // Log the full response structure
      console.log("Full API Response:", data);
      
      // NEW APPROACH: Check if the API returned a direct response
      if (data.response) {
        addDebugInfo(`Found direct response: "${data.response.substring(0, 100)}..."`);
        return data.response;
      }

      // If no direct response, your backend might be storing the message
      // and we need to implement a polling mechanism or separate endpoint
      addDebugInfo("No direct response found. Implementing fallback strategy...");
      
      // Strategy 1: Wait a moment and check for new messages
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      
      // Try to get the latest messages
      const getResponse = await fetch(API_BASE, {
        method: "GET",
        headers: headers
      });
      
      if (getResponse.ok) {
        const getData = await getResponse.json();
        addDebugInfo(`GET response keys: ${Object.keys(getData).join(', ')}`);
        
        // Check if there are messages and find the latest assistant response
        if (getData.messages && Array.isArray(getData.messages)) {
          addDebugInfo(`Found ${getData.messages.length} messages`);
          
          // Look for the most recent assistant message
          const latestMessage = getData.messages.slice(-1);
          
            if (latestMessage) {
              MESSAGES.push(latestMessage);
              addDebugInfo(`Found assistant response: "${latestMessage}..."`);
              return latestMessage;
            }
          }
          
      }
      
      
      // If we still don't have a response, return an informative message
      addDebugInfo("Backend issue detected: API receives messages but doesn't generate responses");
      return `I received your message: "${message}"\n\n⚠️ Backend Issue Detected:\nYour API is storing messages but not generating LLM responses. You need to:\n\n1. Add LLM integration to your backend\n2. Generate assistant responses when messages are posted\n3. Return the assistant response in the API response\n\nCheck your backend code for missing LLM integration.`;
      
    } catch (error) {
      addDebugInfo(`API Error: ${error.message}`);
      console.error("Full API Error:", error);
      
      // Return a detailed error message for debugging
      return `❌ API Error: ${error.message}\n\nThis could be due to:\n• Network connectivity issues\n• CORS problems\n• Backend server errors\n• Invalid API endpoint\n\nCheck the browser console for detailed logs.`;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const handleSendClick = async () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage = inputValue.trim();
      
      // Add user message immediately
      const newUserMessage = {
        id: Date.now(),
        text: userMessage,
        sender: 'user'
      };
      setMessages(prev => [...prev, newUserMessage]);
      
      // Clear input and set loading state
      setInputValue("");
      setIsLoading(true);
      
      // Add a "thinking" message
      const thinkingMessage = {
        id: Date.now() + 1,
        text: "Thinking...",
        sender: 'assistant',
        isThinking: true
      };
      setMessages(prev => [...prev, thinkingMessage]);
      
      try {
        // Call your API
        const apiResponse = await sendMessageToAPI(userMessage);
        
        // Remove thinking message and add real response
        setMessages(prev => {
          const filteredMessages = prev.filter(msg => !msg.isThinking);
          return [...filteredMessages, {
            id: Date.now() + 2,
            text: apiResponse,
            sender: 'assistant'
          }];
        });
        
      } catch (error) {
        console.error("Error sending message:", error);
        
        // Remove thinking message and add error message
        setMessages(prev => {
          const filteredMessages = prev.filter(msg => !msg.isThinking);
          return [...filteredMessages, {
            id: Date.now() + 2,
            text: `❌ Unexpected Error: ${error.message}\n\nPlease check the console for more details and verify your backend is running properly.`,
            sender: 'assistant'
          }];
        });
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
        <StyledNavigationPillList>
          <StyledNavigationPill>
            <StyledTitle>Resources</StyledTitle>
          </StyledNavigationPill>
          <StyledNavigationPill>
            <StyledTitle>Contact</StyledTitle>
          </StyledNavigationPill>
          <StyledNavigationPill onClick={testAPIConnection}>
            <StyledTitle>Test API</StyledTitle>
          </StyledNavigationPill>
        </StyledNavigationPillList>
      </StyledHeader>

      <StyledFrame22>
        <StyledAskOurAssistantAnything>
          Ask our Assistant anything
        </StyledAskOurAssistantAnything>
      </StyledFrame22>

      {/* Debug Info Panel */}
      {debugInfo.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          fontSize: '12px',
          maxWidth: '300px',
          zIndex: 1000
        }}>
          <strong>Debug Info:</strong>
          {debugInfo.map((info, i) => (
            <div key={i} style={{ marginTop: '5px', fontSize: '11px' }}>{info}</div>
          ))}
          <button 
            onClick={() => setDebugInfo([])}
            style={{
              marginTop: '5px',
              padding: '2px 5px',
              fontSize: '10px',
              background: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Clear
          </button>
        </div>
      )}

      {/* Chat Container */}
      <StyledChatContainer>
        <StyledChatMessages>
          {messages.length === 0 ? (
            <StyledMessage>
              <StyledMessageText style={{ fontStyle: 'italic', opacity: 0.7 }}>
                🌟 Welcome to your Mental Health Assistant!
                <br /><br />
                Start a conversation by typing a message below or clicking on a suggestion.
                <br /><br />
                <strong>🔧 Debug Mode Active:</strong> Check browser console (F12) for detailed logs.
                Click "Test API" in the header to test connection.
                <br /><br />
                <strong>⚠️ Known Issue:</strong> Your backend currently stores messages but doesn't generate LLM responses. See console for details.
              </StyledMessageText>
            </StyledMessage>
          ) : (
            messages.map((message) => (
              <StyledMessage key={message.id} isUser={message.sender === 'user'}>
                <StyledMessageText 
                  isUser={message.sender === 'user'}
                  style={message.isThinking ? { fontStyle: 'italic', opacity: 0.8 } : {}}
                >
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