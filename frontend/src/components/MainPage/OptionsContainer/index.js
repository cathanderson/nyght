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

  const [modalCategory, setModalCategory] = useState("");
  const [indexType, setIndexType] = useState("");

  const randomizeIndeces = () => {
    setActivityIdx(randomNum(10));
    setRestaurantIdx(randomNum(10));
    setBarIdx(randomNum(10));
    setDessertIdx(randomNum(10));
  };

  if (!Object.values(venues).length) return null;

  return (
    <>
      <div id="main-page-options-container">
        <div
          className="main-page-option-container"
          onClick={() => {
            setModalCategory("activity");
            setIndexType(activityIdx);
            setShowModifyVenueModal(true);
          }}
        >
          <img
            className="main-page-option-image"
            type=""
            src={venues.activity[activityIdx].imageUrl}
            alt="activity"
          />
          <div className="main-page-option-venue-name">
            {venues.activity[activityIdx].title}
          </div>
        </div>
        <div
          className="main-page-option-container restaurant"
          onClick={() => setShowModifyVenueModal(true)}
        >
          <img
            className="main-page-option-image"
            src={venues.restaurant[restaurantIdx].imageUrl}
            alt="restaurant"
          />
          <div className="main-page-option-venue-name">
            {venues.restaurant[restaurantIdx].title}
          </div>
        </div>
        <div
          className="main-page-option-container Drinks-dessert"
          onClick={() => setShowModifyVenueModal(true)}
        >
          <img
            className="main-page-option-image"
            src={
              isDessert
                ? venues.dessert[dessertIdx].imageUrl
                : venues.bar[barIdx].imageUrl
            }
            alt={isDessert ? "Dessert" : "Drinks"}
          />
          <div className="main-page-option-venue-name">
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
            alt="close modal"
          />
          <div className="venue-title">
            <h3>{venues[modalCategory][indexType].title}</h3>
          </div>
        </ModifyVenueModal>
      )}
    </>
  );
};

export default OptionsContainer;
