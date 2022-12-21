import "./ItineraryShowPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItinerary } from "../../store/itineraries";
import { fetchVenue, clearVenues } from "../../store/venues";
import mapFiller from "../../assets/images/map-filler.webp";
import { EmailModal } from "../../context/Modal";
import x from "../../assets/icons/close.png";

function ItineraryShowPage() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const { itineraryId } = useParams();
  const dispatch = useDispatch();
  const itinerary = useSelector((state) => state.itineraries);
  const venues = useSelector((state) => Object.values(state.venues));

  let activity, restaurant, bar, dessert;
  if (Object.values(venues).length >= 3) {
    Object.values(venues).forEach((venue) => {
      switch (venue.category) {
        case "activity":
          if (venue._id === itinerary.event) activity = venue;
          break;
        case "bar":
          if (venue._id === itinerary.bar) bar = venue;
          break;
        case "restaurant":
          if (venue._id === itinerary.dinner) restaurant = venue;
          break;
        case "dessert":
          if (venue._id === itinerary.dessert) dessert = venue;
          break;
        default:
          break;
      }
    });
  }

  if (itinerary) console.log(`itinerary: ${itinerary.title}`);

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

  if (!Object.values(itinerary).length || Object.values(venues).length <= 2)
    return null;

  return (
    <>
      <div id="itinerary-show-page-container">
        <div id="itinerary-show-subheader-container">
          <h2 id="itinerary-show-page-subheader">{itinerary.title}</h2>
        </div>
        <div id="options-container">
          <div className="option-container activity">
            <img
              className="option-image"
              src={activity.imageUrl}
              alt="activity"
            />
            <div className="option-venue-name">{activity.title}</div>
          </div>
          <div className="option-container restaurant">
            <img
              className="option-image"
              src={restaurant.imageUrl}
              alt="restaurant"
            />
            <div className="option-venue-name">
              Have dinner at {restaurant.title}
            </div>
          </div>
          <div className="option-container Drinks-dessert">
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
        <div id="itinerary-show-map-container">
          <img src={mapFiller} />
        </div>
        <div id="itinerary-show-buttons-container">
          <button className="itinerary-show-button">Modify plan</button>
          <button className="itinerary-show-button">Delete plan</button>
          <button
            className="itinerary-show-button"
            onClick={() => setShowEmailModal(true)}
          >
            Email to friends
          </button>
        </div>
      </div>
      {showEmailModal && (
        <EmailModal onClose={() => setShowEmailModal(false)}>
          <img
            onClick={() => setShowEmailModal(false)}
            src={x}
            className="form-x"
          />
          {/* <EmailForm /> */}
        </EmailModal>
      )}
    </>
  );
}

export default ItineraryShowPage;
