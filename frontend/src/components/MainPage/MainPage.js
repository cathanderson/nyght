import "./MainPage.css";
import fillerImage from "../../assets/images/venue_filler_img.jpeg";
import React, { useState, useEffect } from "react";

function MainPage() {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <main id="main-page-container">
        <div id="main-page-customization-container">
          <div id="main-page-dropdown-container">
            <button onClick={openMenu} id="select-neighborhood-button">
              Select a Neighborhood
            </button>
            {showMenu && (
              <ul className="profile-dropdown">
                <li>Midtown</li>
                <li>The Village</li>
                <li>Harlem</li>
                <li>Williamsburg</li>
              </ul>
            )}
          </div>
          <div className="toggle-container">
            <div className="toggle-switch-label">Drinks</div>
            <div className="toggle-switch">
              <div className="inner-toggle-switch-container">
                <input
                  type="checkbox"
                  className="checkbox"
                  name="drinks"
                  id="drinks"
                />
                <label className="label" htmlFor="drinks">
                  <span className="inner" />
                  <span className="switch" />
                </label>
              </div>
            </div>
            <div className="toggle-switch-label">Dessert</div>
          </div>
        </div>
        <h2 id="main-page-subheader">Your proposed plan for the night:</h2>
        <div id="main-page-options-container">
          <div className="main-page-option-container">
            <img className="main-page-option-image" src={fillerImage} />
            <div className="main-page-option-venue-name">Venue Name</div>
          </div>
          <div className="main-page-option-container">
            <img className="main-page-option-image" src={fillerImage} />
            <div className="main-page-option-venue-name">Venue Name</div>
          </div>
          <div className="main-page-option-container">
            <img className="main-page-option-image" src={fillerImage} />
            <div className="main-page-option-venue-name">Venue Name</div>
          </div>
        </div>
        <div id="main-page-instructions-container">
          <div id="main-page-instructions">
            Click a venue to change it specifically or randomize your entire
            plan below!
          </div>
        </div>
        <div id="main-page-buttons-container">
          <button className="main-page-button">Randomize plan</button>
          <button className="main-page-button">Confirm plan</button>
        </div>
      </main>
    </>
  );
}

export default MainPage;
