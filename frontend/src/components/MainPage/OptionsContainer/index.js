import "./index.css";
import randomNum from "../../../store/random";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ModifyVenueModal } from "../../../context/Modal";
import x from "../../../assets/icons/close.png";
import leftArrow from "../../../assets/icons/left-arrow.png";
import rightArrow from "../../../assets/icons/right-arrow.png";
import { createItinerary } from "../../../store/itineraries";
import { useHistory } from "react-router-dom";

const OptionsContainer = ({ venues, isDessert }) => {
  const [showModifyVenueModal, setShowModifyVenueModal] = useState(false);
  const [activityIdx, setActivityIdx] = useState(randomNum(10));
  const [restaurantIdx, setRestaurantIdx] = useState(randomNum(10));
  const [barIdx, setBarIdx] = useState(randomNum(10));
  const [dessertIdx, setDessertIdx] = useState(randomNum(10));

  const [modalCategory, setModalCategory] = useState("activity");
  const [modalIdx, setModalIdx] = useState(0);

  const dispatch = useDispatch();
  const myUser = useSelector((state) => state.session.user?._id);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!myUser) setLoggedIn(false);
    else setLoggedIn(true);
  }, [myUser, loggedIn]);

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

  const handleModalConfirm = (e, category) => {
    e.preventDefault();
    switch (category) {
      case "activity":
        setActivityIdx(modalIdx);
        break;
      case "restaurant":
        setRestaurantIdx(modalIdx);
        break;
      case "bar":
        setBarIdx(modalIdx);
        break;
      case "dessert":
        setDessertIdx(modalIdx);
        break;
      default:
        return;
    }
    setShowModifyVenueModal(false);
  };

  const titleizedNeighborhoods = {
    midtown: "Midtown",
    village: "the Village",
    harlem: "Harlem",
    williamsburg: "Williamsburg"
  };

  const handleItineraryConfirm = (e) => {
    e.preventDefault();

    const data = {
      title: `Night in ${
        titleizedNeighborhoods[venues.activity[0].neighborhood]
      }`,
      eventId: venues.activity[activityIdx]._id,
      dinnerId: venues.restaurant[restaurantIdx]._id,
      barId: venues.bar[barIdx]._id,
      dessertId: venues.dessert[dessertIdx]._id,
      isDessert: isDessert
    };

    const res = dispatch(createItinerary(myUser, data));
    console.log(`result: ${res}`);
    res.then((data) => history.push(`/itineraries/${data._id}`));
  };

  const displayLoggedOutMessage = () => {
    const confirmButton = document.querySelector("div.confirm-button-errors");
    const h3 = document.createElement("h3");
    h3.innerText = "Please Sign Up or Login to Confirm";
    confirmButton.appendChild(h3);
  };

  const removeLoggedOutMessage = () => {
    const confirmButton = document.querySelector("div.confirm-button-errors");
    const h3 = document.querySelector(".confirm-button-errors h3");
    confirmButton.removeChild(h3);
  };

  return (
    <>
      <div id="options-container">
        <div
          className="option-container"
          onClick={() => {
            setModalCategory("activity");
            setModalIdx(activityIdx);
            setShowModifyVenueModal(true);
            console.log(showModifyVenueModal);
          }}
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
          className="option-container Drinks-dessert"
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
        <div className="randomize button-container">
          {" "}
          <button
            className="main-page-button randomize"
            onClick={() => randomizeIndeces()}
          >
            Randomize plan
          </button>
        </div>

        {!!myUser && (
          <div className="confirm button-container">
            <button
              className="main-page-button confirm"
              // disabled={!myUser}
              onClick={(e) => {
                handleItineraryConfirm(e);
              }}
            >
              Confirm plan
            </button>

            <div className="confirm-button-errors"></div>
          </div>
        )}
        {!myUser && (
          <div
            className="confirm button-container"
            onMouseOver={displayLoggedOutMessage}
            onMouseOut={removeLoggedOutMessage}
          >
            <button
              className="main-page-button confirm logged-out"
              onClick={(e) => {
                handleItineraryConfirm(e);
              }}
            >
              Confirm plan
            </button>
            <div className="confirm-button-errors"></div>
          </div>
        )}
      </div>
      {showModifyVenueModal && (
        <ModifyVenueModal onClose={() => setShowModifyVenueModal(false)}>
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
            <div
              className="confirm-button"
              onClick={(e) =>
                handleModalConfirm(e, venues[modalCategory][modalIdx].category)
              }
            >
              Confirm Venue
            </div>
          </div>
        </ModifyVenueModal>
      )}
    </>
  );
};

export default OptionsContainer;
