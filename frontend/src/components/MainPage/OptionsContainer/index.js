import randomNum from "../../../store/random";
import { useState } from "react";
import { ModifyVenueModal } from "../../../context/Modal";
import x from "../../../assets/icons/close.png";

const OptionsContainer = ({ venues, isDessert }) => {
  const [showModifyVenueModal, setShowModifyVenueModal] = useState(false);
  const [activityIdx, setActivityIdx] = useState(randomNum(10));
  const [restaurantIdx, setRestaurantIdx] = useState(randomNum(10));
  const [barIdx, setBarIdx] = useState(randomNum(10));
  const [dessertIdx, setDessertIdx] = useState(randomNum(10));

  const randomizeIndeces = () => {
    setActivityIdx(randomNum(10));
    setRestaurantIdx(randomNum(10));
    setBarIdx(randomNum(10));
    setDessertIdx(randomNum(10));
  };

  if (!Object.values(venues).length) return null;

  return (
    <>
      <div id="options-container">
        <div
          className="option-container activity"
          onClick={() => setShowModifyVenueModal(true)}
        >
          <img
            className="option-image"
            src={venues.activity[activityIdx].imageUrl}
            alt="activity"
          />
          <div className="option-venue-name">
            {venues.activity[activityIdx].title}
          </div>
        </div>
        <div
          className="option-container restaurant"
          onClick={() => setShowModifyVenueModal(true)}
        >
          <img
            className="option-image"
            src={venues.restaurant[restaurantIdx].imageUrl}
            alt="restaurant"
          />
          <div className="option-venue-name">
            {venues.restaurant[restaurantIdx].title}
          </div>
        </div>
        <div
          className="option-container Drinks-dessert"
          onClick={() => setShowModifyVenueModal(true)}
        >
          <img
            className="option-image"
            src={
              isDessert
                ? venues.dessert[dessertIdx].imageUrl
                : venues.bar[barIdx].imageUrl
            }
            alt={isDessert ? "Dessert" : "Drinks"}
          />
          <div className="option-venue-name">
            {isDessert
              ? venues.dessert[dessertIdx].title
              : venues.bar[barIdx].title}
          </div>
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
          className="main-page-button randomize"
          onClick={() => randomizeIndeces()}
        >
          Randomize plan
        </button>
        <button className="main-page-button comfirm">Confirm plan</button>
      </div>
      {showModifyVenueModal && (
        <ModifyVenueModal onClose={() => setShowModifyVenueModal(false)}>
          <img
            onClick={() => setShowModifyVenueModal(false)}
            src={x}
            className="form-x"
          />
        </ModifyVenueModal>
      )}
    </>
  );
};

export default OptionsContainer;
