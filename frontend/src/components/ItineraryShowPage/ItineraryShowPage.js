import "./ItineraryShowPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItinerary } from "../../store/itineraries";
import { fetchVenue } from "../../store/venues";
import mapFiller from "../../assets/images/map-filler.webp";
import { EmailModal } from "../../context/Modal";
import x from "../../assets/icons/close.png"

function ItineraryShowPage() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const { itineraryId } = useParams();
  const dispatch = useDispatch();
  const itinerary = useSelector((state) => state.itineraries);
  const venues = useSelector((state) => Object.values(state.venues));
  let bar;
  let dessert;
  let activity = venues[0];
  let restaurant = venues[1];
  itinerary.bar ? (bar = venues[2]) : (dessert = venues[2]);

  useEffect(() => {
    dispatch(fetchItinerary(itineraryId));
  }, []);

  useEffect(() => {
    if (itinerary.dinner) {
      dispatch(fetchVenue(itinerary.event));
      dispatch(fetchVenue(itinerary.dinner));
      itinerary.bar
        ? dispatch(fetchVenue(itinerary.bar))
        : dispatch(fetchVenue(itinerary.dessert));
    }
  }, [itinerary]);

  if (!Object.values(itinerary).length) return null;

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
          <EmailForm/>
        </EmailModal>
      )}
    </>
  );
}

export default ItineraryShowPage;
