import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Animated Arrow Component
const AnimatedArrow = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Code Block Component
const CodeBlock = ({ code, language }) => (
    <pre className={`language-${language}`}>
        <code>{code}</code>
    </pre>
);

// Animation Keyframes
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

const typewriter = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blinkCursor = keyframes`
  from, to { border-color: transparent }
  50% { border-color: #3498db; }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const glowEffect = keyframes`
  0% { box-shadow: 0 0 5px rgba(52, 152, 219, 0.5); }
  50% { box-shadow: 0 0 20px rgba(52, 152, 219, 0.8); }
  100% { box-shadow: 0 0 5px rgba(52, 152, 219, 0.5); }
`;

// Styled Components
const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2a3a, #2c3e50);
  color: #fff;
  text-align: center;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
  overflow-x: hidden;
  position: relative;
`;

const BackgroundParticle = styled.div`
  position: absolute;
  width: ${props => props.size || '5px'};
  height: ${props => props.size || '5px'};
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  top: ${props => props.top};
  left: ${props => props.left};
  animation: ${float} ${props => props.duration || '15s'} ease-in-out infinite;
  z-index: 0;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;

const Logo = styled.div`
  font-size: 1.8em;
  font-weight: bold;
  color: #3498db;
  display: flex;
  align-items: center;
  
  span {
    color: #fff;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  
  a {
    color: #ecf0f1;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #3498db;
    }
  }
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  width: 100%;
  max-width: 1200px;
  z-index: 1;
  margin-top: 60px;
`;

const ImageContainer = styled.div`
  margin-bottom: 30px;
  animation: ${float} 4s ease-in-out infinite;
  position: relative;
`;

const Image = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #3498db, #2980b9);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
    transform: rotate(45deg);
    animation: ${glowEffect} 3s linear infinite;
  }
`;

const CodeAnimation = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 0.7em;
  color: #ecf0f1;
  text-align: left;
  padding: 15px;
  width: 90%;
  height: 90%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 3.5em;
  margin-bottom: 15px;
  animation: ${fadeIn} 1s ease-out;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  color: #fff;
  
  strong {
    color: #3498db;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 3px;
      background: #3498db;
      animation: ${slideIn} 1.5s ease-out forwards;
    }
  }
`;

const TypewriterText = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 1.5em;
  color: #3498db;
  margin-bottom: 20px;
  overflow: hidden;
  white-space: nowrap;
  border-right: 3px solid #3498db;
  animation: 
    ${typewriter} 3.5s steps(40, end) 1s forwards,
    ${blinkCursor} 0.75s step-end infinite;
  width: 0;
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
  margin-right: 15px;

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

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  background-color: transparent;
  color: #fff;
  text-decoration: none;
  font-size: 1.2em;
  border: 2px solid #3498db;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(52, 152, 219, 0.2);
    transform: scale(1.05);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FeaturesSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 40px 0;
  width: 100%;
  max-width: 1200px;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 30px;
  width: 300px;
  text-align: left;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  animation-fill-mode: forwards;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  h3 {
    color: #3498db;
    margin-bottom: 15px;
    font-size: 1.3em;
  }
  
  p {
    color: #ecf0f1;
    font-size: 0.9em;
    line-height: 1.6;
  }
  
  svg {
    margin-bottom: 15px;
    color: #3498db;
  }
`;

const TestimonialSlider = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 60px 0;
  overflow: hidden;
  position: relative;
  
  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(to right, #1a2a3a, transparent);
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, #1a2a3a, transparent);
  }
`;

const TestimonialTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${props => props.position}px);
`;

const TestimonialCard = styled.div`
  min-width: 300px;
  padding: 30px;
  margin: 0 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  p {
    font-style: italic;
    margin-bottom: 15px;
  }
  
  h4 {
    color: #3498db;
    margin-bottom: 5px;
  }
  
  span {
    font-size: 0.8em;
    color: #95a5a6;
  }
`;

const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const SliderDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#3498db' : 'rgba(255, 255, 255, 0.2)'};
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#3498db' : 'rgba(255, 255, 255, 0.4)'};
  }
`;

const CTASection = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 50px;
  margin: 60px 0;
  background: linear-gradient(45deg, rgba(52, 152, 219, 0.1), rgba(41, 128, 185, 0.2));
  border-radius: 15px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(255, 255, 255, 0.05) 50%,
      transparent 100%
    );
    transform: rotate(45deg);
    animation: ${glowEffect} 5s linear infinite;
  }
  
  h2 {
    font-size: 2em;
    margin-bottom: 20px;
    color: #fff;
  }
  
  p {
    font-size: 1.1em;
    margin-bottom: 30px;
    color: #ecf0f1;
  }
`;

const Footer = styled.footer`
  width: 100%;
  padding: 30px;
  margin-top: auto;
  background-color: rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #95a5a6;
  font-size: 0.9em;
  
  a {
    color: #3498db;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;
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
      width: 250px;
      height: 250px;
    }
    ${NavLinks} {
      display: none;
    }
  }
`;

// SEO Metadata
const SEO = () => {
  document.title = 'CodeZoon - AI Code Review Tool | Optimize Your Code Instantly';
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', 'CodeZoon is an AI-powered code review platform that provides instant feedback, detects bugs, and helps you optimize your code.');
};

const HomePage = () => {
  SEO();
  
  // State for testimonial slider
  const [sliderPosition, setSliderPosition] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Example testimonials
  const testimonials = [
    {
      text: "CodeZoon has completely transformed our development workflow. We've reduced our bug rate by 40% since implementing it.",
      name: "Sarah kohli",
      title: "CTO, TechStart"
    },
    {
      text: "I use CodeZoon daily as a teaching tool. My students learn best practices and improve their coding skills much faster.",
      name: "Aniket Singh",
      title: "Computer Science Professor"
    },
    {
      text: "The AI suggestions are spot-on. It's like having a senior developer reviewing all my code 24/7.",
      name: "Akash Kumar",
      title: "Freelance Developer"
    },
    {
      text: "We integrated CodeZoon into our CI/CD pipeline and saw immediate improvements in code quality.",
      name: "Nikhil Patel",
      title: "DevOps Engineer, DataFlux"
    }
  ];
  
  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (activeSlide + 1) % testimonials.length;
      setActiveSlide(nextSlide);
      setSliderPosition(-nextSlide * 330); // Card width + margin
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeSlide, testimonials.length]);
  
  // Handle manual slide selection
  const goToSlide = (index) => {
    setActiveSlide(index);
    setSliderPosition(-index * 330);
  };
  
  // Sample code for animation
  const sampleCode = `function analyzeCode(code) {
  // AI analysis begins
  const issues = [];
  
  // Check for common bugs
  const bugPatterns = detectBugPatterns(code);
  if (bugPatterns.length > 0) {
    issues.push(...bugPatterns);
  }
  
  // Performance optimization
  const perfIssues = analyzePerformance(code);
  
  return {
    issues,
    perfIssues,
    suggestions: generateSuggestions(code)
  };
}`;

  // Create background particles
  const particles = [];
  for (let i = 0; i < 20; i++) {
    particles.push(
      <BackgroundParticle 
        key={i}
        size={`${Math.random() * 10 + 2}px`} 
        top={`${Math.random() * 100}%`} 
        left={`${Math.random() * 100}%`}
        duration={`${Math.random() * 20 + 5}s`}
      />
    );
  }

  return (
    <HomePageContainer>
      {particles}
      
      <NavBar>
        <Logo>Code<span>Zoon</span></Logo>
        <NavLinks>
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
        
        </NavLinks>
      </NavBar>
      
      <HeroSection>
        <ResponsiveStyles>
          <ImageContainer>
            <Image>
              <CodeAnimation>
                {sampleCode}
              </CodeAnimation>
            </Image>
          </ImageContainer>

          <Title>Welcome to <strong>CodeZoon</strong></Title>
          <TypewriterText>AI-Powered Code Reviews</TypewriterText>
          <Subtitle>
            CodeZoon is your go-to AI-powered code review tool that provides instant feedback, identifies bugs, and optimizes your code effortlessly. 
            Elevate your coding skills and write cleaner, more efficient code.
          </Subtitle>
          
          <ButtonGroup>
            <ActionButton to="/code-review">
              Start Analyzing <AnimatedArrow />
            </ActionButton>
            <SecondaryButton to="/features">
              Explore Features
            </SecondaryButton>
          </ButtonGroup>
        </ResponsiveStyles>
        
        <FeaturesSection id="features">
          <FeatureCard delay="0.1s">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 012-2h16a2 2 0 012 2zm-6 4a2 2 0 10-2 2 2 2 0 002-2z" fill="currentColor"/>
            </svg>
            <h3>Instant Bug Detection</h3>
            <p>Our advanced AI identifies bugs and vulnerabilities in your code before they make it to production, saving you countless debugging hours.</p>
          </FeatureCard>
          
          <FeatureCard delay="0.2s">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 17.0001H18.5L13 11.5001V17.0001ZM6 17.0001H11.5L6 11.5001V17.0001ZM12 6.78L19.23 14.0001H13V20.2301L5.77 13.0001H12V6.78ZM19 3.0001H5C3.9 3.0001 3 3.9 3 5.0001V19.0001C3 20.1 3.9 21.0001 5 21.0001H19C20.1 21.0001 21 20.1 21 19.0001V5.0001C21 3.9 20.1 3.0001 19 3.0001Z" fill="currentColor"/>
            </svg>
            <h3>Performance Optimization</h3>
            <p>Get intelligent suggestions to optimize your code for better performance, reducing execution time and resource usage.</p>
          </FeatureCard>
          
          <FeatureCard delay="0.3s">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="currentColor"/>
            </svg>
            <h3>Best Practices Guidance</h3>
            <p>Learn industry best practices with our AI coach that provides personalized suggestions to improve your coding style.</p>
          </FeatureCard>
        </FeaturesSection>
        
        <TestimonialSlider id="testimonials">
          <TestimonialTrack position={sliderPosition}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index}>
                <p>"{testimonial.text}"</p>
                <h4>{testimonial.name}</h4>
                <span>{testimonial.title}</span>
              </TestimonialCard>
            ))}
          </TestimonialTrack>
          <SliderDots>
            {testimonials.map((_, index) => (
              <SliderDot 
                key={index} 
                active={index === activeSlide} 
                onClick={() => goToSlide(index)}
              />
            ))}
          </SliderDots>
        </TestimonialSlider>
        
        <CTASection>
          <h2>Ready to Write Better Code?</h2>
          <p>Join thousands of developers who use CodeZoon to improve their code quality every day.</p>
          <ActionButton to="/signup">
            Get Started Free <AnimatedArrow />
          </ActionButton>
        </CTASection>
      </HeroSection>
      
      <Footer>
        <FooterLinks>
          <a href="/about">About</a>
          <a href="/pricing">Pricing</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
        </FooterLinks>
        <p>&copy; {new Date().getFullYear()} CodeZoon - AI Code Review Platform</p>
      </Footer>
    </HomePageContainer>
  );
};

export default HomePage;