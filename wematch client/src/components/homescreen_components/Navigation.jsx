import React, { useState } from "react";
import logo from "../../assets/logo.png";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const handleMenuOpen = () => {
    setOpen(true);
  };
  const handleMenuClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="navigation-container">
        <div className="wrapper">
          <div className="navigation-container__header-container">
            <img src={logo} alt="logo" className="img-logo" />
            <a href="/">
              <h1 className="header">Wematch</h1>
            </a>
          </div>
          <ul className="navigation-container__links">
            <li className="navigation-container__link">
              <a href="/">Home</a>
            </li>
            <li className="navigation-container__link">
              <a href="/">How it works</a>
            </li>
            <li className="navigation-container__link-button">
              <a href="/">GET STARTED</a>
            </li>
          </ul>
          {open ? (
            <div className="menu" onClick={handleMenuClose}>
              <i className="fa-solid fa-xmark"></i>Close
            </div>
          ) : (
            <div className="menu" onClick={handleMenuOpen}>
              <i className="fa-solid fa-bars"></i>Menu
            </div>
          )}
        </div>
      </div>
      {open ? <div className="open-menu">
        <ul>
          <li><a>Home</a></li>
          <li><a>How it works</a></li>
          <li><a>GET STARTED</a></li>
        </ul>
      </div> : null}
    </>
  );
};

export default Navigation;
