import "./ItineraryShowPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItinerary } from "../../store/itineraries";
import { fetchVenue } from "../../store/venues";
import mapFiller from "../../assets/images/map-filler.webp";
import venueFiller from "../../assets/images/venue_filler_img.jpeg";

function ItineraryShowPage() {
  const { itineraryId } = useParams();
  const dispatch = useDispatch();
  const itinerary = useSelector((state) => state.itineraries);

  console.log(itinerary);
  // console.log(itinerary.bar);

  useEffect(() => {
    dispatch(fetchItinerary(itineraryId));
    //   // dispatch(fetchVenue(itinerary.bar));
  }, []);

  // if (!Object.values(itinerary).length) return null;

  return (
    <>
      <div id="itinerary-show-page-container">
        <div id="itinerary-show-subheader-container">
          <h2 id="itinerary-show-subheader">{itinerary.title}</h2>
        </div>
        <div id="itinerary-show-content-container">
          <div id="main-page-options-container">
            <div
              className="main-page-option-container activity"
              // onClick={() => setShowModifyVenueModal(true)}
            >
              <img
                className="main-page-option-image"
                // src={venues.activity[activityIdx].imageUrl}
                alt="activity"
              />
              <div className="main-page-option-venue-name">
                {/* {venues.activity[activityIdx].title} */}
              </div>
            </div>
            <div
              className="main-page-option-container restaurant"
              // onClick={() => setShowModifyVenueModal(true)}
            >
              <img
                className="main-page-option-image"
                // src={venues.restaurant[restaurantIdx].imageUrl}
                alt="restaurant"
              />
              <div className="main-page-option-venue-name">
                {/* {venues.restaurant[restaurantIdx].title} */}
              </div>
            </div>
            <div
              className="main-page-option-container Drinks-dessert"
              // onClick={() => setShowModifyVenueModal(true)}
            >
              {/* <img
                className="main-page-option-image"
                src={
                  isDessert
                    ? venues.dessert[dessertIdx].imageUrl
                    : venues.bar[barIdx].imageUrl
                }
                alt={isDessert ? "Dessert" : "Drinks"}
              /> */}
              <div className="main-page-option-venue-name">
                {/* {isDessert
                  ? venues.dessert[dessertIdx].title
                  : venues.bar[barIdx].title} */}
              </div>
            </div>
          </div>
          <div id="itinerary-show-right-content-container">
            <img src={mapFiller} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ItineraryShowPage;
