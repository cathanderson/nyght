import "./index.css";
import randomNum from "../../../store/random";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModifyVenueModal } from "../../../context/Modal";
import { getCurrentUser } from "../../../store/session";
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
  const errors = useSelector((state) => state.errors.session);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  // console.log(currentUser);
  // let currentUser;

  // console.log(myUser);

  useEffect(() => {
    if (!myUser) setLoggedIn(false);
    else setLoggedIn(true);
  }, [myUser, loggedIn]);

  // useEffect(() => {}, [myUser]);

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
  // debugger;

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
    console.log("test");
  };

  const handleItineraryConfirm = (e) => {
    e.preventDefault();
    // check if user is signed in
    if (!currentUser) {
    }

    const data = {
      title: `Night in ${venues.neighborhood}`,
      user: currentUser,
      event: venues.activity[activityIdx]._id,
      dinner: venues.restaurant[restaurantIdx]._id,
      bar: venues.bar[barIdx]._id,
      dessert: venues.dessert[dessertIdx]._id,
      isDessert: isDessert
    };

    const res = dispatch(createItinerary(currentUser, data)).then(() => {
      // history.push(`/itineraries/`);
      console.log(res);
    });
  };

  // const confirmButton = document.querySelector("button.confirm");
  // if (confirmButton && !loggedIn) {
  //   confirmButton.classList.add("logged-out");
  // }
  console.log(myUser);

  // debugger;

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
        <div className="confirm button-container">
          <button
            className="main-page-button confirm"
            disabled={!myUser}
            onClick={(e) => {
              handleItineraryConfirm(e);
            }}
          >
            Confirm plan
          </button>
          {/* {loggedIn && (
            <button
              className="main-page-button confirm"
              onClick={(e) => {
                handleItineraryConfirm(e);
              }}
            >
              Confirm plan
            </button>
          )}
          {!loggedIn && (
            <button
              className="main-page-button confirm logged-out"
              onClick={(e) => {
                handleItineraryConfirm(e);
              }}
            >
              Confirm plan
            </button>
          )} */}
        </div>
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
