import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
// import codeImage from './assets/code.png'; // Import your image

// Animated Arrow Component (Example SVG)
const AnimatedArrow = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// Keyframes (More subtle fadeIn)
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px); /* Reduced translateY */
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
    transform: scale(1.03); /* Reduced scale */
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
  min-height: 100vh; /* Changed height to min-height */
  background: linear-gradient(135deg, #2c3e50, #34495e);
  color: #fff;
  text-align: center;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  overflow: hidden; /* Prevent scrollbar issues with animations */
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
  font-size: 3em; /* Adjusted font size */
  margin-bottom: 15px; /* Adjusted margin */
  animation: ${fadeIn} 1s ease-out;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  color: #fff; /* Ensuring white color */
`;

const Subtitle = styled.p`
  font-size: 1.3em; /* Adjusted font size */
  margin-bottom: 30px; /* Adjusted margin */
  animation: ${fadeIn} 1.2s ease-out; /* Adjusted animation duration */
  max-width: 700px;
  line-height: 1.6;
  color: #ecf0f1;
`;

const ActionButton = styled(Link)`
  display: inline-flex;  /* Use inline-flex to align items */
  align-items: center; /* Vertically center items */
  justify-content: center; /* Horizontally center items */
  padding: 15px 30px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  font-size: 1.2em;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.3s ease; /* Added transform */
  animation: ${pulse} 2s infinite;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #2980b9;
    transform: scale(1.05); /* Scale up on hover */
  }

  svg {
    width: 24px; /* Adjust size as needed */
    height: 24px;
    margin-left: 10px; /* Add space between text and arrow */
    transition: transform 0.3s ease;
    transform-origin: center;
  }

  &:hover svg {
      transform: translateX(5px); /* Move arrow on hover */
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

const HomePage = () => {
  return (
    <HomePageContainer>
        <ResponsiveStyles>
            <ImageContainer>
                {/* <Image src={codeImage} alt="Code Preview Illustration" /> */}
            </ImageContainer>

            <Title>Unlock Your Coding Potential</Title>
            <Subtitle>
                Get instant feedback, identify bugs, and optimize your code with our AI-powered code review tool. Paste your code and elevate your skills!
            </Subtitle>
            <ActionButton to="/code-review">
                Start Analyzing <AnimatedArrow/>
            </ActionButton>
        </ResponsiveStyles>
      <Footer>&copy; {new Date().getFullYear()} Code Review App</Footer>
    </HomePageContainer>
  );
};

export default HomePage;