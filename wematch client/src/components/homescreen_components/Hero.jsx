import React from "react";

const Hero = () => {
  return (
    <>
      <div className="hero-container">
        <div className="hero-container-inner">
          <div>
            <h1 className="hero-container__header">
              <span className="color">Meet</span> and{" "}
              <span className="color">chat</span> to people
              <br /> near you
            </h1>
            <p className="hero-container__para">
              Wematch is a social media app that gives you dating experience and
              other
              <br /> social media experience
            </p>
            <div className="social-container">
              <h3 className="hero-container__sub-head">
                Join our <span className="color">socials</span>
              </h3>
              <div className="social-container__icon">
                <i className="fa-brands fa-facebook-f"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-youtube"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
