import "./index.css";
import randomNum from "../../../store/random";
import { useState } from "react";
import { ModifyVenueModal } from "../../../context/Modal";
import x from "../../../assets/icons/close.png";
import leftArrow from "../../../assets/icons/left-arrow.png";
import rightArrow from "../../../assets/icons/right-arrow.png";

const OptionsContainer = ({ venues, isDessert }) => {
  const [showModifyVenueModal, setShowModifyVenueModal] = useState(false);
  const [activityIdx, setActivityIdx] = useState(randomNum(10));
  const [restaurantIdx, setRestaurantIdx] = useState(randomNum(10));
  const [barIdx, setBarIdx] = useState(randomNum(10));
  const [dessertIdx, setDessertIdx] = useState(randomNum(10));

  const [modalCategory, setModalCategory] = useState("");
  const [modalIdx, setModalIdx] = useState(0);

  const randomizeIndeces = () => {
    setActivityIdx(randomNum(10));
    setRestaurantIdx(randomNum(10));
    setBarIdx(randomNum(10));
    setDessertIdx(randomNum(10));
  };

  const incrementModalIndex = () => {
    if (modalIdx < 9) modifyModalIndex(1);
    else setModalIdx(0);
  };

  const decrementModalIndex = () => {
    if (modalIdx > 0) modifyModalIndex(-1);
    else setModalIdx(9);
  };

  const modifyModalIndex = (modifier) => {
    setModalIdx((modalIdx + modifier) % 10);
  };

  if (!Object.values(venues).length) return null;

  return (
    <>
      <div id="options-container">
        <div
          className="main-page-option-container"
          onClick={() => {
            setModalCategory("activity");
            setModalIdx(activityIdx);
            setShowModifyVenueModal(true);
          }}
        >
          <img
            className="main-page-option-image"
            src={venues.activity[activityIdx].imageUrl}
            alt="activity"
          />
          <div className="option-venue-name">
            {venues.activity[activityIdx].title}
          </div>
        </div>
        <div
          className="main-page-option-container restaurant"
          onClick={() => {
            setModalCategory("restaurant");
            setModalIdx(restaurantIdx);
            setShowModifyVenueModal(true);
          }}
        >
          <img
            className="option-image"
            src={venues.restaurant[restaurantIdx].imageUrl}
            alt="restaurant"
          />
          <div className="option-venue-name">
            Have dinner at {venues.restaurant[restaurantIdx].title}
          </div>
        </div>
        <div
          className="main-page-option-container Drinks-dessert"
          onClick={() => {
            setModalCategory(isDessert ? "dessert" : "bar");
            setModalIdx(isDessert ? dessertIdx : barIdx);
            setShowModifyVenueModal(true);
          }}
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
            Have
            {isDessert
              ? ` dessert at ${venues.dessert[dessertIdx].title}`
              : ` drinks at ${venues.bar[barIdx].title}`}
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
        <ModifyVenueModal
          activityIdx={activityIdx}
          onClose={() => setShowModifyVenueModal(false)}
        >
          <img
            onClick={() => setShowModifyVenueModal(false)}
            src={x}
            className="form-x"
            alt="close modal"
          />
          <div className="modal-card">
            {" "}
            <div className="venue-title">
              <h3>{venues[modalCategory][modalIdx].title}</h3>
            </div>
            <div className="modal-card-main-content">
              <div className="nav-left-arrow" onClick={decrementModalIndex}>
                <img src={leftArrow} alt="left"></img>
              </div>
              <div className="modal-card-center">
                <div className="venue-image">
                  <img
                    src={venues[modalCategory][modalIdx].imageUrl}
                    alt="venue"
                  />
                </div>
              </div>
              <div className="nav-right-arrow" onClick={incrementModalIndex}>
                <img src={rightArrow} alt="right"></img>
              </div>
            </div>
            <div className="confirm-button">Confirm Venue</div>
          </div>
        </ModifyVenueModal>
      )}
    </>
  );
};

export default OptionsContainer;
