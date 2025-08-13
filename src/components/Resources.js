import React from "react";
import { useNavigate } from 'react-router-dom';
import {
  StyledEllipse9,
  StyledEllipse10,
  StyledHeader,
  StyledLogoContainer,
  StyledLogo,
  StyledBrandTitle,
  StyledNavigationPillList,
  StyledNavigationPill,
  StyledTitle,
} from "./ChatBotUI.styles";
import {
  StyledResourcesMainContainer,
  StyledResourcesContainer,
  StyledResourcesTitle,
  StyledResourcesGrid,
  StyledResourceCard,
  StyledResourceTitle,
  StyledResourceDescription,
  StyledResourceLink,
  StyledResourcePhone,
  StyledResourceSection
} from "./Resources.styles";

export const Resources = () => {
  const localTulsaResources = [
    {
      title: "COPES Crisis Line",
      description: "Immediate crisis support and 24/7 crisis intervention for Tulsa area residents.",
      phone: "918-744-4800",
      isLocal: true
    },
    {
      title: "Mental Health Association Oklahoma",
      description: "Free resource referral and help navigating mental health systems in the Tulsa area.",
      phone: "918-585-1213",
      isLocal: true
    },
    {
      title: "Family & Children's Service",
      description: "Psychological First Aid - Support after traumatic events and crisis counseling.",
      phone: "918-633-2407",
      isLocal: true
    },
    {
      title: "Tulsa RideCARE",
      description: "Transportation assistance to help you get to urgent mental health interventions.",
      phone: "918-409-2639",
      isLocal: true
    }
  ];

  const emergencyResources = [
    {
      title: "988 Suicide & Crisis Lifeline",
      description: "24/7 free and confidential support for people in distress, prevention and crisis resources.",
      phone: "988",
      link: "https://988lifeline.org",
      hasChat: true
    },
    {
      title: "Crisis Text Line",
      description: "Free, 24/7 confidential text support with trained crisis counselors.",
      phone: "Text HELLO to 741741",
      link: "https://www.crisistextline.org"
    },
    {
      title: "National Domestic Violence Hotline",
      description: "24/7 confidential support for domestic violence survivors and their loved ones.",
      phone: "1-800-799-7233",
      link: "https://www.thehotline.org"
    }
  ];

  const localCounselingServices = [
    {
      title: "OSU-Tulsa Counseling Center",
      description: "Professional counseling services through Oklahoma State University Tulsa campus.",
      phone: "918-594-8000",
      isLocal: true
    },
    {
      title: "Counseling & Recovery Services",
      description: "Comprehensive mental health and substance abuse treatment services in Tulsa.",
      phone: "918-492-2554",
      isLocal: true
    }
  ];

  const nationalMentalHealthResources = [
    {
      title: "NAMI (National Alliance on Mental Illness)",
      description: "Education, support groups, and advocacy for individuals and families affected by mental illness.",
      link: "https://www.nami.org"
    },
    {
      title: "Mental Health America",
      description: "Mental health screening tools, resources, and advocacy for mental health awareness.",
      link: "https://www.mhanational.org"
    },
    {
      title: "Psychology Today",
      description: "Find therapists, psychiatrists, and support groups in your area.",
      link: "https://www.psychologytoday.com"
    },
    {
      title: "BetterHelp",
      description: "Online counseling and therapy services with licensed professionals.",
      link: "https://www.betterhelp.com"
    }
  ];

  const selfCareResources = [
    {
      title: "Headspace",
      description: "Meditation and mindfulness app with guided sessions for stress, anxiety, and sleep.",
      link: "https://www.headspace.com"
    },
    {
      title: "Calm",
      description: "Sleep stories, meditation, and relaxation techniques to help manage stress.",
      link: "https://www.calm.com"
    },
    {
      title: "7 Cups",
      description: "Free emotional support and online therapy from trained listeners.",
      link: "https://www.7cups.com"
    },
    {
      title: "PTSD Coach",
      description: "Mobile app to help manage symptoms of PTSD with coping tools and resources.",
      link: "https://www.ptsd.va.gov/appvid/mobile/ptsdcoach_app.asp"
    }
  ];


  const navigate = useNavigate();

  return (
    <StyledResourcesMainContainer>
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
          <StyledNavigationPill style={{ background: '#e0e0e0' }}>
            <StyledTitle>Resources</StyledTitle>
          </StyledNavigationPill>
          <StyledNavigationPill onClick={() => window.open('https://linktr.ee/SafeOfMind', '_blank')}
                style={{ cursor: 'pointer' }}>
            <StyledTitle>Contact</StyledTitle>
          </StyledNavigationPill>
        </StyledNavigationPillList>
      </StyledHeader>
      <div style={{ height: '1800px' }}></div>
      <StyledResourcesContainer>
        <StyledResourcesTitle>Mental Health Resources</StyledResourcesTitle>
        
        <StyledResourceSection>
          <h3 style={{ 
            color: '#160211', 
            fontSize: 'clamp(18px, 2.5vw, 22px)', 
            fontFamily: 'Manrope, sans-serif', 
            fontWeight: '600',
            marginBottom: 'clamp(16px, 2vh, 24px)'
          }}>
            📍 Local Tulsa Crisis Support
          </h3>
          <StyledResourcesGrid>
            {localTulsaResources.map((resource, index) => (
              <StyledResourceCard key={index} $isLocal={true}>
                <StyledResourceTitle>{resource.title}</StyledResourceTitle>
                <StyledResourceDescription>{resource.description}</StyledResourceDescription>
                {resource.phone && (
                  <StyledResourcePhone $isLocal={true}>{resource.phone}</StyledResourcePhone>
                )}
              </StyledResourceCard>
            ))}
          </StyledResourcesGrid>
        </StyledResourceSection>

        <StyledResourceSection>
          <h3 style={{ 
            color: '#160211', 
            fontSize: 'clamp(18px, 2.5vw, 22px)', 
            fontFamily: 'Manrope, sans-serif', 
            fontWeight: '600',
            marginBottom: 'clamp(16px, 2vh, 24px)'
          }}>
            🚨 National Crisis Support
          </h3>
          <StyledResourcesGrid>
            {emergencyResources.map((resource, index) => (
              <StyledResourceCard key={index} $isEmergency={true}>
                <StyledResourceTitle>{resource.title}</StyledResourceTitle>
                <StyledResourceDescription>{resource.description}</StyledResourceDescription>
                {resource.phone && (
                  <StyledResourcePhone>{resource.phone}</StyledResourcePhone>
                )}
                {resource.hasChat && (
                  <div style={{
                    fontSize: 'clamp(12px, 1.1vw, 13px)',
                    color: '#56637E',
                    fontFamily: 'DM Sans, sans-serif',
                    textAlign: 'center',
                    fontStyle: 'italic'
                  }}>
                    Online chat also available
                  </div>
                )}
                {resource.link && (
                  <StyledResourceLink 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Visit Website →
                  </StyledResourceLink>
                )}
              </StyledResourceCard>
            ))}
          </StyledResourcesGrid>
        </StyledResourceSection>

        <StyledResourceSection>
          <h3 style={{ 
            color: '#160211', 
            fontSize: 'clamp(18px, 2.5vw, 22px)', 
            fontFamily: 'Manrope, sans-serif', 
            fontWeight: '600',
            marginBottom: 'clamp(16px, 2vh, 24px)'
          }}>
            🏥 Local Counseling Services
          </h3>
          <StyledResourcesGrid>
            {localCounselingServices.map((resource, index) => (
              <StyledResourceCard key={index} $isLocal={true}>
                <StyledResourceTitle>{resource.title}</StyledResourceTitle>
                <StyledResourceDescription>{resource.description}</StyledResourceDescription>
                {resource.phone && (
                  <StyledResourcePhone $isLocal={true}>{resource.phone}</StyledResourcePhone>
                )}
              </StyledResourceCard>
            ))}
          </StyledResourcesGrid>
        </StyledResourceSection>

        <StyledResourceSection>
          <h3 style={{ 
            color: '#160211', 
            fontSize: 'clamp(18px, 2.5vw, 22px)', 
            fontFamily: 'Manrope, sans-serif', 
            fontWeight: '600',
            marginBottom: 'clamp(16px, 2vh, 24px)'
          }}>
            🧠 National Mental Health Support
          </h3>
          <StyledResourcesGrid>
            {nationalMentalHealthResources.map((resource, index) => (
              <StyledResourceCard key={index}>
                <StyledResourceTitle>{resource.title}</StyledResourceTitle>
                <StyledResourceDescription>{resource.description}</StyledResourceDescription>
                <StyledResourceLink 
                  href={resource.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Visit Website →
                </StyledResourceLink>
              </StyledResourceCard>
            ))}
          </StyledResourcesGrid>
        </StyledResourceSection>

        <StyledResourceSection>
          <h3 style={{ 
            color: '#160211', 
            fontSize: 'clamp(18px, 2.5vw, 22px)', 
            fontFamily: 'Manrope, sans-serif', 
            fontWeight: '600',
            marginBottom: 'clamp(16px, 2vh, 24px)'
          }}>
            🌱 Self-Care & Wellness Apps
          </h3>
          <StyledResourcesGrid>
            {selfCareResources.map((resource, index) => (
              <StyledResourceCard key={index}>
                <StyledResourceTitle>{resource.title}</StyledResourceTitle>
                <StyledResourceDescription>{resource.description}</StyledResourceDescription>
                <StyledResourceLink 
                  href={resource.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Visit Website →
                </StyledResourceLink>
              </StyledResourceCard>
            ))}
          </StyledResourcesGrid>
        </StyledResourceSection>

        <div style={{ 
          textAlign: 'center', 
          marginTop: 'clamp(32px, 6vh, 48px)',
          padding: 'clamp(16px, 2vh, 24px)',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <p style={{ 
            color: '#56637E', 
            fontSize: 'clamp(12px, 1.1vw, 14px)',
            fontFamily: 'DM Sans, sans-serif',
            margin: 0,
            lineHeight: '1.5'
          }}>
            If you're experiencing a mental health emergency, please call 911 or go to your nearest emergency room.
            <br />
            For immediate crisis support in Tulsa, call COPES at 918-744-4800.
            <br />
            These resources are for informational purposes and do not replace professional medical advice.
          </p>
        </div>
      </StyledResourcesContainer>
    </StyledResourcesMainContainer>
  );
};