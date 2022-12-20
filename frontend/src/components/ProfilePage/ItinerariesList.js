
// this will be the real function that's used
// function ItinerariesList({itineraries}) {
function ItinerariesList() {

    // this is a dummy test object for styling purposes 
    const itineraries = [
      { name: "Night out in Midtown" },
      { name: "Night out in Midtown" },
      { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    //   { name: "Night out in Midtown" },
    ];

  return (
    <>
      <div id="itineraries-list-container">
        <ul id="itineraries-list">
          {itineraries.map((itinerary) => (
            <li id="itineraries-list-item">
              {itinerary.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ItinerariesList;
