import randomNum from "../../../store/random";
import { useState } from "react";

const OptionsContainer = ({ venues, isDessert }) => {
  // break venues array into categories

  // pick one venue from each category as featuredVenue

  // const venues = venuesByCategory;
  const [randomIdx, setRandomIdx] = useState(randomNum(10));

  // console.log(venues);

  if (!Object.values(venues).length) return null;

  return (
    <>
      <div id="main-page-options-container">
        <div className="main-page-option-container activity">
          <img
            className="main-page-option-image"
            src={venues.activity[randomIdx].imageUrl}
            alt="activity"
          />
          <div className="main-page-option-venue-name">Venue Name</div>
        </div>
        <div className="main-page-option-container restaurant">
          <img
            className="main-page-option-image"
            src={venues.restaurant[randomIdx].imageUrl}
            alt="restaurant"
          />
          <div className="main-page-option-venue-name">Venue Name</div>
        </div>
        <div className="main-page-option-container Drinks-dessert">
          <img
            className="main-page-option-image"
            src={
              isDessert
                ? venues.bar[randomIdx].imageUrl
                : venues.dessert[randomIdx].imageUrl
            }
            alt={isDessert ? "Dessert" : "Drinks"}
          />
          <div className="main-page-option-venue-name">Venue Name</div>
        </div>
      </div>
      <div id="main-page-instructions-container">
        <div id="main-page-instructions">
          Click a venue to change it specifically or randomize your entire plan
          below!
        </div>
      </div>
      <div id="main-page-buttons-container">
        <button
          className="main-page-button"
          onClick={() => setRandomIdx(randomNum(10))}
        >
          Randomize plan
        </button>
        <button className="main-page-button">Confirm plan</button>
      </div>
    </>
  );
};

export default OptionsContainer;
