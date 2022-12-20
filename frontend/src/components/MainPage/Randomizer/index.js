import "./index.css";
import { useState, useEffect } from "react";
import {
  getVenues,
  fetchVenues,
  fetchVenuesByFilter
} from "../../../store/venues";
import { useDispatch, useSelector } from "react-redux";
import OptionsContainer from "../OptionsContainer";

const Randomizer = ({ neighborhood }) => {
  const dispatch = useDispatch();
  const venues = useSelector(getVenues);
  const venuesByCategory = (venues) => {
    if (!venues) return {};
    const venuesSorted = {};
    venues.forEach((venue) => {
      !venuesSorted[venue.category]
        ? (venuesSorted[venue.category] = [])
        : venuesSorted[venue.category].push(venue);
    });
    return venuesSorted;
  };

  const categories = ["restaurant", "activity", "dessert", "bar"];

  useEffect(() => {
    categories.forEach((category) => {
      dispatch(fetchVenuesByFilter(neighborhood, category));
    });
  }, [dispatch]);
  return <OptionsContainer venues={venuesByCategory} />;
};

export default Randomizer;
