import React, { useState, useRef, useEffect } from "react";
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
  
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);
  
  const API_BASE = "https://dczq55guecss3nfqektmhapolq0dgnkw.lambda-url.us-east-1.on.aws/messages";

  // format api responses
  const formatResponse = (text) => {
    if (!text) return text;

    console.log('=== FORMATTING TEXT ===');
    console.log('Raw text:', text);
    console.log('Text type:', typeof text);
    console.log('Text length:', text.length);

    const textString = String(text);

    const lines = textString.split(/\r?\n/).filter(line => line.trim() !== '');
    console.log('Split into lines:', lines);
    
    const formattedElements = lines.map((line, index) => {
      let formattedContent = line.trim();
      console.log(`Processing line ${index}:`, formattedContent);
      
      formattedContent = formattedContent.replace(/\[b\](.*?)\[\/b\]/g, '<strong>$1</strong>');
      
      formattedContent = formattedContent.replace(/\[i\](.*?)\[\/i\]/g, '<em>$1</em>');
      
      formattedContent = formattedContent.replace(/\[url\](.*?)\[\/url\]/g, '<a href="https://$1" target="_blank" rel="noopener noreferrer" style="color: #007AFF; text-decoration: underline;">$1</a>');
      
      console.log(`After formatting:`, formattedContent);
      
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

    console.log('Returning formatted elements:', formattedElements);
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
    "What can I ask you to do?",
    "I need some help with my emotions", 
    "I would like some recommendations for what to do when I am overwhelmed"
  ];

  const addDebugInfo = (info) => {
    console.log("DEBUG:", info);
    setDebugInfo(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${info}`]);
  };

  // test api connection
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

      const requestBody = { messages: MESSAGES };
      addDebugInfo(`Request URL: ${API_BASE}/messages`);
      addDebugInfo(`Request body: ${JSON.stringify(requestBody)}`);
      
      const response = await fetch(`${API_BASE}/messages`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody)
      });

      addDebugInfo(`Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const responseText = await response.text();
        addDebugInfo(`Error response: ${responseText.substring(0, 200)}${responseText.length > 200 ? '...' : ''}`);
        throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
      }

      const responseText = await response.text();
      addDebugInfo(`Raw response: ${responseText.substring(0, 200)}${responseText.length > 200 ? '...' : ''}`);
      
      let data;
      try {
        data = JSON.parse(responseText);
        addDebugInfo(`Parsed JSON successfully, keys: ${Object.keys(data).join(', ')}`);
      } catch (parseError) {
        addDebugInfo(`JSON parse error: ${parseError.message}`);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }

      console.log("Full API Response:", data);
      
      if (data.messages && Array.isArray(data.messages) && data.messages.length > 0) {
        let latestMessage = data.messages.slice(-1)[0];
        console.log(latestMessage);
        MESSAGES.push(latestMessage);
        return latestMessage;
      }
      
      if (data.response) {
        addDebugInfo(`Found direct response: "${data.response.substring(0, 100)}..."`);
        return data.response;
      }

      addDebugInfo("No direct response found. Implementing fallback strategy...");
      
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      
      const getResponse = await fetch(API_BASE, {
        method: "GET",
        headers: headers
      });
      
      if (getResponse.ok) {
        const getData = await getResponse.json();
        addDebugInfo(`GET response keys: ${Object.keys(getData).join(', ')}`);
        
        if (getData.messages && Array.isArray(getData.messages)) {
          addDebugInfo(`Found ${getData.messages.length} messages`);
          
          const latestMessage = getData.messages.slice(-1);
          
            if (latestMessage) {
              MESSAGES.push(latestMessage);
              addDebugInfo(`Found assistant response: "${latestMessage}..."`);
              return latestMessage;
            }
          }
          
      }
      
      addDebugInfo("Backend issue detected: API receives messages but doesn't generate responses");
      return `I received your message: "${message}"\n\n⚠️ Backend Issue Detected:\nYour API is storing messages but not generating LLM responses. You need to:\n\n1. Add LLM integration to your backend\n2. Generate assistant responses when messages are posted\n3. Return the assistant response in the API response\n\nCheck your backend code for missing LLM integration.`;
      
    } catch (error) {
      addDebugInfo(`API Error: ${error.message}`);
      console.error("Full API Error:", error);
      
      return `❌ API Error: ${error.message}\n\nThis could be due to:\n• Network connectivity issues\n• CORS problems\n• Backend server errors\n• Invalid API endpoint\n\nCheck the browser console for detailed logs.`;
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
            text: `❌ Unexpected Error: ${error.message}\n\nPlease check the console for more details and verify your backend is running properly.`,
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
        <StyledChatMessages ref={chatMessagesRef}>
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