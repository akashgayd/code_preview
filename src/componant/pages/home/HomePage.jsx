import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Animated Arrow Component (Example SVG)
const AnimatedArrow = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Keyframes (Subtle fadeIn and pulse)
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Styled Components
const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: #fff;
  text-align: center;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  margin-bottom: 30px;
  animation: ${float} 4s ease-in-out infinite;
`;

const Image = styled.img`
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 15px;
  animation: ${fadeIn} 1s ease-out;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  color: #fff;
`;

const Subtitle = styled.p`
  font-size: 1.3em;
  margin-bottom: 30px;
  animation: ${fadeIn} 1.2s ease-out;
  max-width: 700px;
  line-height: 1.6;
  color: #ecf0f1;
`;

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  font-size: 1.2em;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  animation: ${pulse} 2s infinite;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }

  svg {
    width: 24px;
    height: 24px;
    margin-left: 10px;
    transition: transform 0.3s ease;
    transform-origin: center;
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  text-align: center;
  color: #95a5a6;
  font-size: 0.8em;
`;

// Media Queries for Responsiveness
const ResponsiveStyles = styled.div`
  @media (max-width: 768px) {
    ${Title} {
      font-size: 2.5em;
    }
    ${Subtitle} {
      font-size: 1.2em;
    }
    ${Image} {
      max-width: 80%;
    }
  }
`;

// SEO Metadata (Using Helmet for meta tags)
const SEO = () => {
  document.title = 'CodeZoon - AI Code Review Tool | Optimize Your Code Instantly';
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', 'CodeZoon is an AI-powered code review platform that provides instant feedback, detects bugs, and helps you optimize your code.');
};

const HomePage = () => {
  SEO();

  return (
    <HomePageContainer>
      <ResponsiveStyles>
        <ImageContainer>
          {/* <Image src={codeImage} alt="CodeZoon - AI Code Review Illustration" /> */}
        </ImageContainer>

        <Title>Welcome to <strong>CodeZoon</strong></Title>
        <Subtitle>
          CodeZoon is your go-to AI-powered code review tool that provides instant feedback, identifies bugs, and optimizes your code effortlessly. 
          Elevate your coding skills and write cleaner, more efficient code.
        </Subtitle>
        <ActionButton to="/code-review">
          Start Analyzing with CodeZoon <AnimatedArrow />
        </ActionButton>
      </ResponsiveStyles>
      <Footer>&copy; {new Date().getFullYear()} CodeZoon - AI Code Review Platform</Footer>
    </HomePageContainer>
  );
};

export default HomePage;
