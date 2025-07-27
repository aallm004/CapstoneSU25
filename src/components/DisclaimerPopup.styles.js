import styled from "styled-components";


const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1280px'
};

const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  laptop: `@media (max-width: ${breakpoints.laptop})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`
};


export const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);

  ${media.mobile} {
    padding: 16px;
  }
`;


export const StyledNotification = styled.div`
  width: 100%;
  max-width: clamp(320px, 90vw, 460px);
  height: auto;
  min-height: clamp(160px, 25vh, 196px);
  padding: clamp(12px, 2.5vw, 16px);
  background: white;
  border-radius: clamp(6px, 1vw, 8px);
  border: 1px solid #757575;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: clamp(8px, 2vw, 12px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  ${media.mobile} {
    max-width: calc(100vw - 32px);
    min-height: auto;
  }
`;


export const StyledTitle = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: clamp(8px, 2vw, 12px);
`;


export const StyledInfo = styled.div`
  width: clamp(18px, 4vw, 20px);
  height: clamp(18px, 4vw, 20px);
  position: relative;
  flex-shrink: 0;
  background: #2196F3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: clamp(11px, 2.5vw, 13px);
  font-family: 'Inter', sans-serif;
  
  &::after {
    content: "i";
  }
`;


export const StyledStack = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: clamp(12px, 3vh, 16px);
`;


export const StyledContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: clamp(2px, 1vh, 4px);
`;


export const StyledTitle01 = styled.span`
  color: #1E1E1E;
  font-size: clamp(14px, 3vw, 16px);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  line-height: 1.4;
  word-wrap: break-word;
  display: block;
  width: 100%;
`;


export const StyledBodytext = styled.span`
  color: #1E1E1E;
  font-size: clamp(13px, 2.8vw, 16px);
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  line-height: 1.4;
  word-wrap: break-word;
  display: block;
  width: 100%;
`;


export const StyledButton = styled.button`
  padding: clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px);
  background: #2C2C2C;
  border: 1px solid #2C2C2C;
  border-radius: clamp(6px, 1vw, 8px);
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: clamp(80px, 20vw, 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #1a1a1a;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(44, 44, 44, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;


export const StyledButton01 = styled.span`
  color: #F5F5F5;
  font-size: clamp(14px, 2.8vw, 16px);
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  line-height: 1;
  word-wrap: break-word;
`;