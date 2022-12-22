import { useEffect, useState } from "react";
import {
  getVenues,
  fetchVenuesByFilter,
  clearVenues,
  fetchVenues
} from "../../store/venues";
import { useDispatch, useSelector } from "react-redux";
// import OptionsContainer from "../OptionsContainer";
import { clearItinerary } from "../../store/itineraries";
import {
  fetchItinerary,
  deleteItinerary,
  updateItinerary
} from "../../store/itineraries";
import { useParams, useHistory } from "react-router-dom";
import ItineraryShowPage from "./ItineraryShowPage";

const ShowContainer = () => {
  const dispatch = useDispatch();
  // const venues = useSelector(getVenues);
  const venues = useSelector((state) => Object.values(state.venues));

  const { itineraryId } = useParams();
  const itinerary = useSelector((state) => state.itineraries);

  // useEffect(() => {
  //   dispatch(clearVenues());
  //   dispatch(clearItinerary());
  // }, []);

  useEffect(() => {
    dispatch(fetchItinerary(itineraryId));
  }, [itineraryId]);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  let activity, restaurant, bar, dessert;
  let activityIdx, restaurantIdx, barIdx, dessertIdx;

  const sortVenues = () => {
    if (!venues) return {};
    const sorted = {
      // midtown: {},
      // village: {},
      // harlem: {},
      // williamsburg: {}
    };
    venues.forEach((venue) => {
      if (!sorted[venue.neighborhood]) sorted[venue.neighborhood] = {};
      if (!sorted[venue.neighborhood][venue.category]) {
        sorted[venue.neighborhood][venue.category] = [venue];
      } else {
        sorted[venue.neighborhood][venue.category].push(venue);
        switch (venue.category) {
          case "activity":
            if (venue._id === itinerary.event) {
              activity = venue;
              activityIdx =
                sorted[venue.neighborhood][venue.category].length - 1;
            }
            break;
          case "bar":
            if (venue._id === itinerary.bar) {
              bar = venue;
              barIdx = sorted[venue.neighborhood][venue.category].length - 1;
            }
            break;
          case "restaurant":
            if (venue._id === itinerary.dinner) {
              restaurant = venue;
              restaurantIdx =
                sorted[venue.neighborhood][venue.category].length - 1;
            }
            break;
          case "dessert":
            if (venue._id === itinerary.dessert) {
              dessert = venue;
              dessertIdx =
                sorted[venue.neighborhood][venue.category].length - 1;
            }
            break;
          default:
            break;
        }
      }
    });
    return sorted;
  };
  const [sortedVenues, setSortedVenues] = useState(sortVenues());

  const itineraryVenues = {
    activity: activity,
    restaurant: restaurant,
    bar: bar,
    dessert: dessert
  };
  const itineraryVenueIndeces = {
    activityIdx: activityIdx,
    restaurantIdx: restaurantIdx,
    barIdx: barIdx,
    dessertIdx: dessertIdx
  };
  debugger;
  // const venuesByCategory = () => {
  //   if (!venues) return {};
  //   const venuesSorted = {};
  //   venues.forEach((venue) => {
  //     !venuesSorted[venue.category]
  //       ? (venuesSorted[venue.category] = [venue])
  //       : venuesSorted[venue.category].push(venue);
  //   });
  //   return venuesSorted;
  // };

  // console.log(venuesByCategory());
  if (Object.values(venues).length < 4) return null;

  // return <OptionsContainer venues={venuesByCategory()} isDessert={isDessert} />;
  return (
    <ItineraryShowPage
      venues={sortedVenues}
      itineraryVenues={itineraryVenues}
      itineraryVenueIndeces={itineraryVenueIndeces}
    />
  );
};

export default ShowContainer;
