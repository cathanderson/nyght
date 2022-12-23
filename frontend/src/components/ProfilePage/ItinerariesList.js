import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  fetchItinerariesByUser,
  getItineraries,
} from "../../store/itineraries";

function ItinerariesList({ itineraries }) {
  const history = useHistory();

  return (
    <>
      <div id="itineraries-list-container">
        <ul id="itineraries-list">
          {itineraries.map((itinerary) => {
            return (
              <li
                id="itineraries-list-item"
                onClick={() => history.push(`/itineraries/${itinerary._id}`)}
                key={itinerary._id}
              >
                {itinerary.title}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default ItinerariesList;
