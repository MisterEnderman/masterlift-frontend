import React from 'react'

const Hero = () => {
  return (
    <section className="axl-hero-section">
      <div className="axl-hero-info">
        <h1 className="axl-hero-main-title">Build Your Strength</h1>
        <p className="axl-hero-sub-text">
          Create, manage and share professional training plans with ease. 
          The perfect tool for dedicated athletes.
        </p>
        <button className="axl-hero-cta">Get Started</button>
      </div>
      
      <div className="axl-hero-graphic">
        {/* כאן יכנסו האנימציה או התמונה בעתיד */}
        {/* <div className="axl-placeholder-box">Visual Area</div> */}
        <img src="/Gym.gif" />
      </div>
    </section>
  );
};

export default Hero;
