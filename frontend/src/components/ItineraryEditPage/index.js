import "./index.css";
import { useEffect, useState } from "react";
import { useParams, useHistory, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItinerary,
  deleteItinerary,
  updateItinerary
} from "../../store/itineraries";
import {
  clearVenues,
  fetchVenuesByFilter,
  getVenues
} from "../../store/venues";
import { EmailModal } from "../../context/Modal";
import { EditItineraryModifyVenueModal } from "../../context/Modal";
import x from "../../assets/icons/close.png";
// import MapContainer from "../MapContainer";
import EmailFormAndList from "../EmailForm/EmailFormAndList";
import pencil from "../../assets/icons/pencil.png";
import leftArrow from "../../assets/icons/left-arrow.png";
import rightArrow from "../../assets/icons/right-arrow.png";

function ItineraryEditPage() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const { itineraryId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const neighborhood = location.search.substring(1);
  const itinerary = useSelector((state) => state.itineraries);
  const [showEditTitleForm, setShowEditTitleForm] = useState(false);
  const [title, setTitle] = useState(itinerary.title);

  const [modalCategory, setModalCategory] = useState("activity");
  const [modalIdx, setModalIdx] = useState(0);
  const [showModifyVenueModal, setShowModifyVenueModal] = useState(false);

  const [activityIsModified, setActivityIsModified] = useState(false);
  const [restaurantIsModified, setRestaurantIsModified] = useState(false);
  const [barIsModified, setBarIsModified] = useState(false);
  const [dessertIsModified, setDessertIsModified] = useState(false);

  const [modifiedActivityIdx, setModifiedActivityIdx] = useState("");
  const [modifiedRestaurantIdx, setModifiedRestaurantIdx] = useState("");
  const [modifiedBarIdx, setModifiedBarIdx] = useState("");
  const [modifiedDessertIdx, setModifiedDessertIdx] = useState("");

  useEffect(() => {
    dispatch(fetchItinerary(itineraryId));
  }, [itineraryId]);

  useEffect(() => {
    dispatch(clearVenues());
  }, []);

  useEffect(() => {
    dispatch(fetchVenuesByFilter(neighborhood));
  }, [dispatch, neighborhood]);

  const venues = useSelector(getVenues);
  console.log("venues");
  console.log(venues);

  let activity, restaurant, bar, dessert;
  let activityIdx, restaurantIdx, barIdx, dessertIdx;

  const sortVenues = () => {
    if (!venues) return {};
    const venuesSorted = {};
    venues.forEach((venue) => {
      !venuesSorted[venue.category]
        ? (venuesSorted[venue.category] = [venue])
        : venuesSorted[venue.category].push(venue);

      switch (venue.category) {
        case "activity":
          if (venue._id === itinerary.event) {
            activity = venue;
            activityIdx = venuesSorted[venue.category].length - 1;
          }
          break;
        case "bar":
          if (venue._id === itinerary.bar) {
            bar = venue;
            barIdx = venuesSorted[venue.category].length - 1;
          }
          break;
        case "restaurant":
          if (venue._id === itinerary.dinner) {
            restaurant = venue;
            restaurantIdx = venuesSorted[venue.category].length - 1;
          }
          break;
        case "dessert":
          if (venue._id === itinerary.dessert) {
            dessert = venue;
            dessertIdx = venuesSorted[venue.category].length - 1;
          }
          break;
        default:
          break;
      }
    });
    return venuesSorted;
  };
  const venuesSorted = sortVenues();

  console.log("venuesSorted:");
  console.log(venuesSorted);

  if (!Object.values(itinerary).length || Object.values(venues).length <= 3)
    return null;

  const handleModifyItinerary = (e) => {
    e.preventDefault();
    const newItinerary = { ...itinerary };
    console.log(itinerary);
    if (activityIsModified)
      newItinerary["event"] = venuesSorted.activity[modifiedActivityIdx]._id;
    if (restaurantIsModified)
      newItinerary["dinner"] =
        venuesSorted.restaurant[modifiedRestaurantIdx]._id;
    if (barIsModified)
      newItinerary["bar"] = venuesSorted.bar[modifiedBarIdx]._id;
    if (dessertIsModified)
      newItinerary["dessert"] = venuesSorted.dessert[modifiedDessertIdx]._id;
    console.log("newItinerary:");
    console.log(newItinerary);
    dispatch(updateItinerary(newItinerary)).then(
      history.push(`/itineraries/${itineraryId}`)
    );
  };

  const handleDeleteItinerary = (e) => {
    e.preventDefault();
    dispatch(deleteItinerary(itineraryId)).then(history.push("/profile"));
  };

  const handleEditTitle = (e) => {
    e.preventDefault();

    setShowEditTitleForm(true);
  };

  const handleSubmitUpdateTitle = (e) => {
    e.preventDefault();
    const data = { ...itinerary, title: title };
    dispatch(updateItinerary(data));
    setShowEditTitleForm(false);
  };

  const showEditTitlePopup = () => {};

  const incrementModalIndex = (e) => {
    e.preventDefault();
    if (modalIdx < 9) modifyModalIndex(1);
    else setModalIdx(0);
  };

  const decrementModalIndex = (e) => {
    e.preventDefault();
    if (modalIdx > 0) modifyModalIndex(-1);
    else setModalIdx(9);
  };

  const modifyModalIndex = (modifier) => {
    setModalIdx((modalIdx + modifier) % 10);
  };

  const handleModalConfirm = (e, category) => {
    e.preventDefault();
    switch (category) {
      case "activity":
        setModifiedActivityIdx(modalIdx);
        setActivityIsModified(true);
        break;
      case "restaurant":
        setModifiedRestaurantIdx(modalIdx);
        setRestaurantIsModified(true);
        break;
      case "bar":
        setModifiedBarIdx(modalIdx);
        setBarIsModified(true);
        break;
      case "dessert":
        setModifiedDessertIdx(modalIdx);
        setDessertIsModified(true);
        break;
      default:
        return;
    }
    setShowModifyVenueModal(false);
  };

  // debugger;

  const handleOpenModifyModal = (e, category) => {
    e.preventDefault();
    switch (category) {
      case "activity":
        setModalCategory("activity");
        if (!activityIsModified) setModalIdx(activityIdx);
        break;
      case "restaurant":
        setModalCategory("restaurant");
        if (!restaurantIsModified) setModalIdx(restaurantIdx);
        break;
      case "bar":
        setModalCategory("bar");
        if (!barIsModified) setModalIdx(barIdx);
        break;
      case "dessert":
        if (!dessertIsModified) setModalCategory("dessert");
        break;
      default:
        break;
    }
    setShowModifyVenueModal(true);
  };

  return (
    <>
      <div id="itinerary-show-page-container">
        <div id="itinerary-show-subheader-container">
          <div className="edit-title-form">
            {!showEditTitleForm && (
              <>
                <h2 className="itinerary-show-page-subheader">
                  {itinerary.title}
                </h2>
                <div
                  className="edit-title-button"
                  onClick={(e) => handleEditTitle(e)}
                >
                  <img
                    src={pencil}
                    alt="edit itinerary title"
                    onMouseOver={showEditTitlePopup}
                  />
                </div>
              </>
            )}
            {showEditTitleForm && (
              <form onSubmit={handleSubmitUpdateTitle}>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button>Update Title</button>
              </form>
            )}
          </div>
        </div>
        <div id="options-container">
          <div
            className="option-container activity"
            onClick={(e) => {
              handleOpenModifyModal(e, "activity");
            }}
          >
            <img
              className="option-image"
              src={
                !activityIsModified
                  ? activity.imageUrl
                  : venuesSorted.activity[modifiedActivityIdx].imageUrl
              }
              alt="activity"
            />
            <div className="option-venue-name">
              {!activityIsModified
                ? activity.title
                : venuesSorted.activity[modifiedActivityIdx].title}
            </div>
          </div>
          <div
            className="option-container restaurant"
            onClick={(e) => {
              handleOpenModifyModal(e, "restaurant");
            }}
          >
            <img
              className="option-image"
              src={
                !restaurantIsModified
                  ? restaurant.imageUrl
                  : venuesSorted.restaurant[modifiedRestaurantIdx].imageUrl
              }
              alt="restaurant"
            />
            <div className="option-venue-name">
              Have dinner at{" "}
              {!restaurantIsModified
                ? restaurant.title
                : venuesSorted.restaurant[modifiedRestaurantIdx].title}
            </div>
          </div>
          <div
            className="option-container Drinks-dessert"
            onClick={(e) => {
              handleOpenModifyModal(e, bar ? "bar" : "dessert");
            }}
          >
            <img
              className="option-image"
              src={
                bar
                  ? !barIsModified
                    ? bar.imageUrl
                    : venuesSorted.bar[modifiedBarIdx].imageUrl
                  : !dessertIsModified
                  ? dessert.imageUrl
                  : venuesSorted.dessert[modifiedDessertIdx].imageUrl
              }
              alt={bar ? "Drinks" : "Dessert"}
            />
            <div className="option-venue-name">
              Have
              {bar
                ? !barIsModified
                  ? ` drinks at ${bar.title}`
                  : ` drinks at ${venuesSorted.bar[modifiedBarIdx].title}`
                : !dessertIsModified
                ? ` dessert at ${dessert.title}`
                : ` dessert at ${venuesSorted.dessert[modifiedDessertIdx].title}`}
            </div>
          </div>
        </div>

        <div id="itinerary-show-buttons-container">
          <Link to={`/itineraries/${itinerary._id}/edit`}>
            <button
              className="itinerary-show-button"
              onClick={(e) => handleModifyItinerary(e)}
            >
              Save
            </button>
          </Link>
          <button
            className="itinerary-show-button"
            onClick={(e) => handleDeleteItinerary(e)}
          >
            Delete plan
          </button>
          <button
            className="itinerary-show-button"
            onClick={() => setShowEmailModal(true)}
          >
            Email to friends
          </button>
        </div>
      </div>
      {showModifyVenueModal && (
        <EditItineraryModifyVenueModal
          venuesSorted={venuesSorted}
          onClose={() => setShowModifyVenueModal(false)}
        >
          <img
            onClick={(e) => {
              e.preventDefault();
              setShowModifyVenueModal(false);
            }}
            src={x}
            className="form-x"
            alt="close modal"
          />
          <div className="modal-card">
            <div className="venue-title">
              <h3>{venuesSorted[modalCategory][modalIdx].title}</h3>
            </div>
            <div className="modal-card-main-content">
              <div
                className="nav-left-arrow"
                onClick={(e) => decrementModalIndex(e)}
              >
                <img src={leftArrow} alt="left"></img>
              </div>
              <div className="modal-card-center">
                <div className="venue-image">
                  <img
                    src={venuesSorted[modalCategory][modalIdx].imageUrl}
                    alt="venue"
                  />
                </div>
              </div>
              <div
                className="nav-right-arrow"
                onClick={(e) => incrementModalIndex(e)}
              >
                <img src={rightArrow} alt="right"></img>
              </div>
            </div>
            <div
              className="confirm-button"
              onClick={(e) => handleModalConfirm(e, modalCategory)}
            >
              Confirm Venue
            </div>
          </div>
        </EditItineraryModifyVenueModal>
      )}
      {showEmailModal && (
        <EmailModal onClose={() => setShowEmailModal(false)}>
          <img
            onClick={() => setShowEmailModal(false)}
            src={x}
            className="form-x"
          />
          <EmailFormAndList />
        </EmailModal>
      )}
    </>
  );
}

export default ItineraryEditPage;
