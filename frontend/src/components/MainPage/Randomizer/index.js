import "./index.css";
import { useState, useEffect } from "react";
import { getVenues, fetchVenuesByFilter } from "../../../store/venues";
import { useDispatch, useSelector } from "react-redux";
import OptionsContainer from "../OptionsContainer";

const Randomizer = ({ neighborhood, isDessert }) => {
  const dispatch = useDispatch();
  const venues = useSelector(getVenues);

  // const categories = ["restaurant", "activity", "dessert", "bar"];

  useEffect(() => {
    dispatch(fetchVenuesByFilter(neighborhood));
  }, [dispatch, neighborhood]);

  const venuesByCategory = () => {
    if (!venues) return {};
    const venuesSorted = {};
    venues.forEach((venue) => {
      // console.log(venue);
      !venuesSorted[venue.category]
        ? (venuesSorted[venue.category] = [venue])
        : venuesSorted[venue.category].push(venue);
    });
    return venuesSorted;
  };

  console.log(venuesByCategory());

  return <OptionsContainer venues={venuesByCategory()} isDessert={isDessert} />;
};

export default Randomizer;
