import React, { useState } from 'react';
import { ChatBotUI } from './components/ChatBotUI';
import { DisclaimerPopup } from './components/DisclaimerPopup';
import { GlobalStyles } from './GlobalStyles';

function App() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const handleDisclaimerAccept = () => {
    setShowDisclaimer(false);
  };

  return (
    <>
      <GlobalStyles />
      {showDisclaimer && (
        <DisclaimerPopup onAccept={handleDisclaimerAccept} />
      )}
      <ChatBotUI />
    </>
  );
}

export default App;