import "./ItineraryShowPage.css";
import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItinerary,
  deleteItinerary,
  updateItinerary
} from "../../store/itineraries";
import { fetchVenue, clearVenues, fetchVenues } from "../../store/venues";
import { EmailModal } from "../../context/Modal";
import x from "../../assets/icons/close.png";
import MapContainer from "../MapContainer";
import EmailFormAndList from "../EmailForm/EmailFormAndList";
import pencil from "../../assets/icons/pencil.png";

// import { ModifyVenueModal } from "../../context/Modal";
// import leftArrow from "../../assets/icons/left-arrow.png";
// import rightArrow from "../../assets/icons/right-arrow.png";

function ItineraryShowPage() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const { itineraryId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const itinerary = useSelector((state) => state.itineraries);
  const venues = useSelector((state) => Object.values(state.venues));

  let neighborhood;
  if (venues.length > 1) {
    neighborhood = venues[0].neighborhood;
  }
  // debugger;
  const [showEditTitleForm, setShowEditTitleForm] = useState(false);
  const [title, setTitle] = useState(itinerary.title);

  // const [modalCategory, setModalCategory] = useState("activity");
  // const [thisNeighborhood, setThisNeighborhood] = useState("midtown");
  // const [modalIdx, setModalIdx] = useState(0);
  // const [showModifyVenueModal, setShowModifyVenueModal] = useState(false);

  // let { activity, restaurant, bar, dessert } = itineraryVenues;
  // let { activityIdx, restaurantIdx, barIdx, dessertIdx } =
  //   itineraryVenueIndeces;

  // const [modifiedActivityIdx, setModifiedActivityIdx] = useState("");
  // const [modifiedRestaurantIdx, setModifiedRestaurantIdx] = useState("");
  // const [modifiedBarIdx, setModifiedBarIdx] = useState("");
  // const [modifiedDessertIdx, setModifiedDessertIdx] = useState("");

  // if (itinerary) console.log(`itinerary: ${itinerary.title}`);

  useEffect(() => {
    dispatch(fetchItinerary(itineraryId));
  }, [itineraryId]);

  useEffect(() => {
    if (itinerary.dinner) {
      dispatch(fetchVenue(itinerary.event));
      dispatch(fetchVenue(itinerary.dinner));
      itinerary.bar
        ? dispatch(fetchVenue(itinerary.bar))
        : dispatch(fetchVenue(itinerary.dessert));
    }
  }, [itinerary, itineraryId]);
  // useEffect(() => {
  //   dispatch(fetchVenues());
  // }, [dispatch]);

  // const sortVenues = () => {
  //   if (!venues) return {};
  //   const sorted = {
  //     // midtown: {},
  //     // village: {},
  //     // harlem: {},
  //     // williamsburg: {}
  //   };
  //   venues.forEach((venue) => {
  //     if (!sorted[venue.neighborhood]) sorted[venue.neighborhood] = {};
  //     if (!sorted[venue.neighborhood][venue.category]) {
  //       sorted[venue.neighborhood][venue.category] = [venue];
  //     } else {
  //       sorted[venue.neighborhood][venue.category].push(venue);
  //       switch (venue.category) {
  //         case "activity":
  //           if (venue._id === itinerary.event) {
  //             activity = venue;
  //             activityIdx =
  //               sorted[venue.neighborhood][venue.category].length - 1;
  //           }
  //           break;
  //         case "bar":
  //           if (venue._id === itinerary.bar) {
  //             bar = venue;
  //             barIdx = sorted[venue.neighborhood][venue.category].length - 1;
  //           }
  //           break;
  //         case "restaurant":
  //           if (venue._id === itinerary.dinner) {
  //             restaurant = venue;
  //             restaurantIdx =
  //               sorted[venue.neighborhood][venue.category].length - 1;
  //           }
  //           break;
  //         case "dessert":
  //           if (venue._id === itinerary.dessert) {
  //             dessert = venue;
  //             dessertIdx =
  //               sorted[venue.neighborhood][venue.category].length - 1;
  //           }
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //   });
  //   return sorted;
  // };

  // const [sortedVenues, setSortedVenues] = useState(sortVenues());
  let activity, restaurant, bar, dessert;

  if (Object.values(venues).length >= 3) {
    Object.values(venues).forEach((venue, idx) => {
      switch (venue.category) {
        case "activity":
          if (venue._id === itinerary.event) {
            activity = venue;
            // activityIdx = idx;
          }
          break;
        case "bar":
          if (venue._id === itinerary.bar) {
            bar = venue;
            // barIdx = idx;
          }
          break;
        case "restaurant":
          if (venue._id === itinerary.dinner) {
            restaurant = venue;
            // restaurantIdx = idx;
          }
          break;
        case "dessert":
          if (venue._id === itinerary.dessert) {
            dessert = venue;
            // dessertIdx = idx;
          }
          break;
        default:
          break;
      }
    });
  }

  if (!Object.values(itinerary).length || Object.values(venues).length <= 2)
    return null;

  const handleModifyItinerary = (e) => {
    e.preventDefault();
    dispatch(updateItinerary(itinerary));
  };

  const handleDeleteItinerary = (e) => {
    e.preventDefault();
    dispatch(deleteItinerary(itineraryId)).then(history.push("/profile"));
  };

  const handleEditTitle = (e) => {
    e.preventDefault();
    // const editTitleContainer = document.getElementById(
    //   "itinerary-show-subheader-container"
    // );
    // while (editTitleContainer.firstChild) {
    //   editTitleContainer.removeChild(editTitleContainer.lastChild);
    // }
    setShowEditTitleForm(true);
  };

  const handleSubmitUpdateTitle = (e) => {
    e.preventDefault();
    const data = { ...itinerary, title: title };
    dispatch(updateItinerary(data));
    setShowEditTitleForm(false);
  };

  const showEditTitlePopup = () => {};

  // const handleOpenModifyModal = (e, sortedVenues, category) => {
  //   e.preventDefault();
  //   console.log(sortedVenues);
  //   console.log(category);
  //   switch (category) {
  //     case "activity":
  //       setModalCategory("activity");
  //       setModalIdx(activityIdx);
  //       break;
  //     case "restaurant":
  //       setModalCategory("restaurant");
  //       setModalIdx(restaurantIdx);
  //       break;
  //     case "bar":
  //       setModalCategory("bar");
  //       setModalIdx(barIdx);
  //       break;
  //     case "dessert":
  //       setModalCategory("dessert");
  //       break;
  //     default:
  //       break;
  //   }
  //   setShowModifyVenueModal(true);
  //   console.log(`showMVM: ${showModifyVenueModal}`);
  // };

  // const incrementModalIndex = (e) => {
  //   e.preventDefault();
  //   if (modalIdx < 9) modifyModalIndex(1);
  //   else setModalIdx(0);
  // };

  // const decrementModalIndex = (e) => {
  //   e.preventDefault();
  //   if (modalIdx > 0) modifyModalIndex(-1);
  //   else setModalIdx(9);
  // };

  // const modifyModalIndex = (modifier) => {
  //   setModalIdx((modalIdx + modifier) % 10);
  // };

  // const handleModalConfirm = (e, category) => {
  //   e.preventDefault();
  //   switch (category) {
  //     case "activity":
  //       setModifiedActivityIdx(modalIdx);
  //       break;
  //     case "restaurant":
  //       setModifiedRestaurantIdx(modalIdx);
  //       break;
  //     case "bar":
  //       setModifiedBarIdx(modalIdx);
  //       break;
  //     case "dessert":
  //       setModifiedDessertIdx(modalIdx);
  //       break;
  //     default:
  //       return;
  //   }
  //   setShowModifyVenueModal(false);
  // };

  // debugger;
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
                    alt="edit itinerary"
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
            className="option-container activity no-pointer"
            // onClick={(e) => {
            //   handleOpenModifyModal(e, "activity");
            // }}
          >
            <img
              className="option-image"
              src={activity.imageUrl}
              alt="activity"
            />
            <div className="option-venue-name">{activity.title}</div>
          </div>
          <div className="option-container restaurant no-pointer">
            <img
              className="option-image"
              src={restaurant.imageUrl}
              alt="restaurant"
            />
            <div className="option-venue-name">
              Have dinner at {restaurant.title}
            </div>
          </div>
          <div className="option-container Drinks-dessert no-pointer">
            <img
              className="option-image"
              src={bar ? bar.imageUrl : dessert.imageUrl}
              alt={bar ? "Drinks" : "Dessert"}
            />
            <div className="option-venue-name">
              Have
              {bar ? ` drinks at ${bar.title}` : ` dessert at ${dessert.title}`}
            </div>
          </div>
        </div>
        <h2 className="itinerary-show-page-subheader" id="map-subheader">
          Where you're going:
        </h2>
        <MapContainer
          activity={activity}
          restaurant={restaurant}
          bar={bar}
          dessert={dessert}
        />
        <div id="itinerary-show-buttons-container">
          <Link
            to={{
              pathname: `/itineraries/${itinerary._id}/edit`,
              search: neighborhood
            }}
          >
            <button
              className="itinerary-show-button"
              // onClick={(e) => handleModifyItinerary(e)}
            >
              Modify plan
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
      {/* {showModifyVenueModal && (
        <ModifyVenueModal onClose={() => setShowModifyVenueModal(false)}>
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
              <h3>
                {venues
                  ? venues[thisNeighborhood][modalCategory][modalIdx].title
                  : ""}
              </h3>
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
                    src={
                      venues
                        ? venues[thisNeighborhood][modalCategory][modalIdx]
                            .imageUrl
                        : null
                    }
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
              onClick={(e) =>
                handleModalConfirm(
                  e,
                  venues[thisNeighborhood][modalCategory][modalIdx].category
                )
              }
            >
              Confirm Venue
            </div>
          </div>
        </ModifyVenueModal>
      )} */}
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

export default ItineraryShowPage;
