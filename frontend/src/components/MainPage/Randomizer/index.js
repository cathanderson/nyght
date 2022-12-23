import { useEffect } from "react";
import {
  getVenues,
  fetchVenuesByFilter,
  clearVenues,
} from "../../../store/venues";
import { useDispatch, useSelector } from "react-redux";
import OptionsContainer from "../OptionsContainer";
import { clearItinerary } from "../../../store/itineraries";

const Randomizer = ({ neighborhood, isDessert }) => {
  const dispatch = useDispatch();
  const venues = useSelector(getVenues);

  useEffect(() => {
    dispatch(fetchVenuesByFilter(neighborhood));
  }, [dispatch, neighborhood]);

  useEffect(() => {
    dispatch(clearVenues());
    dispatch(clearItinerary());
  }, []);

  const venuesByCategory = () => {
    if (!venues) return {};
    const venuesSorted = {};
    venues.forEach((venue) => {
      !venuesSorted[venue.category]
        ? (venuesSorted[venue.category] = [venue])
        : venuesSorted[venue.category].push(venue);
    });
    return venuesSorted;
  };

  if (Object.values(venues).length < 4) return null;

  return <OptionsContainer venues={venuesByCategory()} isDessert={isDessert} />;
};

export default Randomizer;
