import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About Study Companion</h1>
        
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Study Companion is designed to help students enhance their learning experience 
            through innovative tools and features that make studying more effective and enjoyable.
          </p>
        </div>

        <div className="about-section">
          <h2>What We Offer</h2>
          <ul className="features-list">
            <li>Interactive study tools</li>
            <li>Progress tracking</li>
            <li>Personalized learning paths</li>
            <li>Collaborative study features</li>
            <li>Resource management</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Our Vision</h2>
          <p>
            We believe that learning should be accessible, engaging, and tailored to each 
            student's unique needs. Our platform empowers learners to achieve their academic 
            goals through technology that adapts to their learning style.
          </p>
        </div>

        <div className="about-section">
          <h2>Get Started</h2>
          <p>
            Ready to transform your study experience? Join thousands of students who are 
            already using Study Companion to achieve better academic results.
          </p>
          <button className="cta-button">Start Learning Today</button>
        </div>
      </div>
    </div>
  );
};

export default About;
