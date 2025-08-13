import styled from "styled-components";

// Responsive breakpoints (matching your existing styles)
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

export const StyledResourcesContainer = styled.div`
  position: relative;
  top: 0; /* Reset top positioning */
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - clamp(40px, 6vw, 80px));
  max-width: 1000px;
  z-index: 5;
  padding-bottom: clamp(60px, 10vh, 100px);
  margin-top: clamp(160px, 25vh, 200px);

  ${media.mobile} {
    position: relative;
    transform: none;
    width: calc(100% - 32px);
    margin: clamp(180px, 28vh, 220px) auto clamp(40px, 8vh, 60px);
    left: auto;
    top: auto;
  }
`;

export const StyledResourcesTitle = styled.h1`
  color: #160211;
  font-size: clamp(24px, 4vw, 32px);
  font-family: 'Manrope', sans-serif;
  font-weight: 700;
  text-align: center;
  margin-bottom: clamp(32px, 6vh, 48px);
  line-height: 1.2;
`;

export const StyledResourceSection = styled.div`
  margin-bottom: clamp(40px, 8vh, 60px);
`;

export const StyledResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(16px, 2.5vw, 24px);
  margin-bottom: clamp(24px, 4vh, 32px);

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const StyledResourceCard = styled.div`
  padding: clamp(20px, 2.5vw, 24px);
  background: ${props => {
    if (props.$isLocal) return 'rgba(230, 255, 230, 0.9)';
    if (props.$isEmergency) return 'rgba(255, 240, 240, 0.9)';
    return 'rgba(255, 255, 255, 0.6)';
  }};
  border-radius: 12px;
  border: ${props => {
    if (props.$isLocal) return '2px solid rgba(100, 200, 100, 0.3)';
    if (props.$isEmergency) return '2px solid rgba(255, 100, 100, 0.3)';
    return '1px solid rgba(255, 255, 255, 0.4)';
  }};
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1.5vh, 16px);

  &:hover {
    transform: translateY(-4px);
    background: ${props => {
      if (props.$isLocal) return 'rgba(220, 255, 220, 0.95)';
      if (props.$isEmergency) return 'rgba(255, 230, 230, 0.95)';
      return 'rgba(255, 255, 255, 0.8)';
    }};
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

export const StyledResourceTitle = styled.h4`
  color: #160211;
  font-size: clamp(16px, 1.8vw, 18px);
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
`;

export const StyledResourceDescription = styled.p`
  color: #56637E;
  font-size: clamp(13px, 1.2vw, 14px);
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  margin: 0;
  line-height: 1.5;
  flex-grow: 1;
`;

export const StyledResourcePhone = styled.div`
  color: #160211;
  font-size: clamp(14px, 1.4vw, 16px);
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  background: ${props => props.$isLocal ? 
    'rgba(255, 255, 255, 0.9)' : 
    'rgba(255, 255, 255, 0.8)'
  };
  padding: clamp(8px, 1vh, 10px) clamp(12px, 1.5vw, 14px);
  border-radius: 6px;
  text-align: center;
  border: ${props => props.$isLocal ? 
    '1px solid rgba(100, 200, 100, 0.3)' : 
    '1px solid rgba(255, 100, 100, 0.2)'
  };
`;

export const StyledResourceLink = styled.a`
  color: #007AFF;
  font-size: clamp(13px, 1.2vw, 14px);
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  text-decoration: none;
  padding: clamp(8px, 1vh, 10px) clamp(12px, 1.5vw, 14px);
  background: rgba(0, 122, 255, 0.1);
  border-radius: 6px;
  text-align: center;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 122, 255, 0.2);

  &:hover {
    background: rgba(0, 122, 255, 0.2);
    transform: translateY(-1px);
    text-decoration: none;
  }

  &:visited {
    color: #007AFF;
  }
`;

export const StyledResourcesMainContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  min-height: 100vh;
  position: relative;
  background: white;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: clamp(16px, 2.5vw, 32px);
  margin: 0 auto;
  padding-top: 0;

  ${media.mobile} {
    border-radius: 0;
    min-height: 100vh;
    padding-top: 0;
  }
`;