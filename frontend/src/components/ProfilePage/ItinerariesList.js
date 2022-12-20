import { useHistory } from "react-router-dom";

// this will be the real function that's used
// function ItinerariesList({itineraries}) {
function ItinerariesList() {
    const history = useHistory();

    // this is a dummy test object for styling purposes 
    const itineraries = [
      { name: "Night out in Midtown" },
      { name: "Night out in Midtown" },
      { name: "Night out in Midtown" },
    ];

  return (
    <>
      <div id="itineraries-list-container">
        <ul id="itineraries-list">
          {itineraries.map((itinerary) => (
            <li
              id="itineraries-list-item"
              onClick={() => history.push(`/itineraries/${itinerary._id}`)}
            >
              {itinerary.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ItinerariesList;
