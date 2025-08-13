import styled from "styled-components";

// Responsive breakpoints
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1280px'
};

// Media query helper
const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  laptop: `@media (max-width: ${breakpoints.laptop})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`
};

export const StyledChatBotUI = styled.div`
  width: 100%;
  max-width: 1280px;
  min-height: 100vh;
  min-height: 832px;
  position: relative;
  background: white;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: clamp(16px, 2.5vw, 32px);
  margin: 0 auto;
  padding-top: clamp(105px, 15vh, 145px);

  ${media.mobile} {
    border-radius: 0;
    min-height: 100vh;
    padding-top: clamp(120px, 18vh, 160px);
  }
`;

export const StyledEllipse9 = styled.div`
  width: clamp(150px, 22vw, 280px);
  height: clamp(150px, 22vw, 280px);
  right: clamp(50px, 8vw, 100px);
  bottom: clamp(150px, 25vh, 331px);
  position: absolute;
  background: #89BCFF;
  border-radius: 50%;
  filter: blur(clamp(75px, 12vw, 150px));
  z-index: 0;
`;

export const StyledEllipse10 = styled.div`
  width: clamp(200px, 32vw, 414px);
  height: clamp(200px, 32vw, 414px);
  left: clamp(100px, 28vw, 358px);
  bottom: clamp(50px, 12vh, 281px);
  position: absolute;
  background: #FF86E1;
  border-radius: 50%;
  filter: blur(clamp(125px, 20vw, 250px));
  z-index: 0;
`;

export const StyledHeader = styled.div`
  width: 100%;
  height: auto;
  min-height: 105px;
  padding: clamp(24px, 3.5vw, 40px) clamp(16px, 2.5vw, 32px);
  position: fixed; /* Changed from relative to fixed */
  top: 0; /* Added to stick to top */
  left: 0; /* Added for proper positioning */
  background: white;
  border-bottom: 1px solid #D9D9D9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  z-index: 100; /* Increased z-index to stay above other content */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Added subtle shadow */

  ${media.tablet} {
    flex-direction: column;
    gap: 16px;
    padding: 24px 16px;
    justify-content: center;
  }
`;

export const StyledNavigationPillList = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  ${media.tablet} {
    justify-content: center;
  }
`;

export const StyledNavigationPill = styled.div`
  padding: clamp(6px, 1vw, 8px) clamp(12px, 2vw, 16px);
  background: #F5F5F5;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e0e0e0;
    transform: translateY(-1px);
  }
`;

export const StyledTitle = styled.span`
  color: #1E1E1E;
  font-size: clamp(14px, 1.25vw, 16px);
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  line-height: 1;
  white-space: nowrap;
`;

export const StyledFrame22 = styled.div`
  width: 100%;
  max-width: 409px;
  position: absolute;
  left: 50%;
  top: clamp(180px, 30vh, 250px);
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: clamp(24px, 6vh, 48px);
  z-index: 5;
  padding: 0 20px;

  ${media.mobile} {
    position: relative;
    transform: none;
    margin: clamp(120px, 20vh, 180px) auto clamp(40px, 8vh, 80px);
    padding: 0 16px;
    left: auto;
    top: auto;
  }
`;

export const StyledAskOurAssistantAnything = styled.span`
  color: #160211;
  font-size: clamp(18px, 3vw, 24px);
  font-family: 'Manrope', sans-serif;
  font-weight: 400;
  text-align: center;
  line-height: 1.3;
  word-wrap: break-word;
`;

export const StyledChatContainer = styled.div`
  position: absolute;
  top: clamp(280px, 42vh, 350px);
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - clamp(40px, 6vw, 80px));
  max-width: 800px;
  height: clamp(250px, 35vh, 350px);
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 5;
  overflow: hidden;

  ${media.mobile} {
    position: relative;
    transform: none;
    width: calc(100% - 32px);
    margin: clamp(60px, 8vh, 80px) auto clamp(20px, 4vh, 40px);
    left: auto;
    top: auto;
    height: clamp(280px, 40vh, 380px);
  }
`;

export const StyledChatMessages = styled.div`
  height: 100%;
  padding: clamp(16px, 2vw, 24px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1.5vh, 16px);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;

export const StyledMessage = styled.div`
  display: flex;
  justify-content: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: clamp(8px, 1vh, 12px);
`;

export const StyledMessageText = styled.div`
  max-width: 80%;
  padding: clamp(10px, 1.2vw, 12px) clamp(14px, 1.8vw, 16px);
  border-radius: 12px;
  font-size: clamp(13px, 1.1vw, 14px);
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  line-height: 1.4;
  word-wrap: break-word;

  ${props => props.$isUser ? `
    background: #B5EECB;
    color: #333333;
    border-bottom-right-radius: 4px;
  ` : `
    background: rgba(245, 245, 245, 0.9);
    color: #333333;
    border-bottom-left-radius: 4px;
  `}

  ${media.mobile} {
    max-width: 90%;
    font-size: 14px;
  }
`;

export const StyledBottomSection = styled.div`
  position: absolute;
  bottom: clamp(40px, 8vh, 80px);
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - clamp(40px, 6vw, 80px));
  max-width: 883px;
  z-index: 5;

  ${media.mobile} {
    position: relative;
    transform: none;
    width: calc(100% - 32px);
    margin: auto auto 40px;
    left: auto;
    bottom: auto;
  }
`;

export const StyledSuggestionsTitle = styled.div`
  color: #56637E;
  font-size: clamp(12px, 1.1vw, 14px);
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  margin-bottom: clamp(16px, 2vh, 24px);
  padding-left: 10px;
`;

export const StyledSuggestionCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: clamp(8px, 1.5vw, 16px);
  margin-bottom: clamp(16px, 3vh, 24px);

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const StyledSuggestionCard = styled.div`
  padding: clamp(12px, 1.5vw, 16px);
  background: rgba(255, 255, 255, 0.50);
  border-radius: 8px;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 50px;

  &:hover {
    background: rgba(255, 255, 255, 0.70);
    transform: translateY(-2px);
  }
`;

export const StyledSuggestionText = styled.span`
  color: #160211;
  font-size: clamp(12px, 1.1vw, 14px);
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  text-align: center;
  line-height: 1.3;
  word-wrap: break-word;
`;

export const StyledInputContainer = styled.div`
  width: 100%;
  padding: clamp(12px, 1.5vw, 16px);
  background: white;
  border-radius: 8px;
  border: 1px solid rgba(22, 2, 17, 0.30);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(8px, 1vw, 12px);
`;

export const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: #56637E;
  font-size: clamp(12px, 1.1vw, 14px);
  font-family: 'Manrope', sans-serif;
  font-weight: 400;

  &::placeholder {
    color: #56637E;
  }
`;

export const StyledSendButton = styled.div`
  width: clamp(24px, 3vw, 36px);
  height: clamp(24px, 3vw, 36px);
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const StyledSendIcon = styled.div`
  width: clamp(16px, 2vw, 19px);
  height: clamp(13px, 1.8vw, 16px);
  background: #1D1B20;
  clip-path: polygon(0 50%, 100% 0, 100% 100%);
`;

export const StyledLogo = styled.div`
  height: clamp(32px, 4vw, 48px);
  display: flex;
  align-items: center;
  cursor: pointer;

  ${media.tablet} {
    height: 32px;
    margin-bottom: 8px;
  }
`;

export const StyledLogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(12px, 1.5vw, 16px);

  ${media.tablet} {
    margin-bottom: 8px;
  }
`;

export const StyledBrandTitle = styled.h1`
  font-size: clamp(20px, 2.5vw, 28px);
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #2c2c2c 0%, #6b6b6b 50%, #9a9a9a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  line-height: 1;

  ${media.tablet} {
    font-size: clamp(18px, 4vw, 24px);
  }
`;