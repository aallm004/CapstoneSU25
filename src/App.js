import React, { useState } from 'react';
import { ChatBotUI } from './components/ChatBotUI';
import { DisclaimerPopup } from './components/DisclaimerPopup';
import { GlobalStyles } from './GlobalStyles';
import { Resources } from './components/Resources';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
      <Router>
        <Routes>
          <Route path="/" element={<ChatBotUI />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;