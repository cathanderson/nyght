import jwtFetch from "./jwt";

const RECEIVE_VENUE = "venues/RECEIVE_VENUE";
const RECEIVE_VENUES = "venues/RECEIVE_VENUES";
const CLEAR_VENUES = "venues/CLEAR_VENUES";

export const receiveVenue = (venue) => ({
  type: RECEIVE_VENUE,
  venue,
});

export const receiveVenues = (venues) => ({
  type: RECEIVE_VENUES,
  venues,
});

export const clearVenues = () => ({
  type: CLEAR_VENUES,
});

export const getVenues = ({ venues }) => (venues ? Object.values(venues) : []);

export const fetchVenue = (id) => async (dispatch) => {
  const res = await jwtFetch(`/api/venues/${id}`);
  const venue = await res.json();
  dispatch(receiveVenue(venue));
};

export const fetchVenues = () => async (dispatch) => {
  const res = await jwtFetch("/api/venues");
  const venues = await res.json();
  dispatch(receiveVenues(venues));
};

export const fetchVenuesByFilter = (neighborhood) => async (dispatch) => {
  const res = await jwtFetch(`/api/venues/neighborhood/${neighborhood}`);
  const venues = await res.json();
  dispatch(receiveVenues(venues));
};

const venuesReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_VENUE:
      newState[action.venue._id] = action.venue;
      return newState;
    case RECEIVE_VENUES:
      return { ...newState, ...action.venues };
    case CLEAR_VENUES:
      return {};
    default:
      return state;
  }
};

export default venuesReducer;
