import jwtFetch from "./jwt";

const RECEIVE_ITINERARY = "itineraries/RECEIVE_ITINERARY";
const RECEIVE_ITINERARIES = "itineraries/RECEIVE_ITINERARIES";
const REMOVE_ITINERARY = "itineraries/REMOVE_ITINERARY";
const CLEAR_ITINERARY = "itineraries/CLEAR_ITINERARY";

export const removeItinerary = (itinerary) => ({
  type: REMOVE_ITINERARY,
  itinerary
});

export const receiveItinerary = (itinerary) => ({
  type: RECEIVE_ITINERARY,
  itinerary
});

export const receiveItineraries = (itineraries) => ({
  type: RECEIVE_ITINERARIES,
  itineraries
});

export const clearItinerary = () => ({
  type: CLEAR_ITINERARY,
});

export const getItineraries = (state) =>
  state.itineraries ? Object.values(state.itineraries) : [];
export const getItinerary = (itineraryId) => (state) =>
  state.itineraries ? state.itineraries[itineraryId] : null;

export const fetchItinerary = (itineraryId) => async (dispatch) => {
  const res = await jwtFetch(`/api/itineraries/${itineraryId}`);
  const data = await res.json();
  dispatch(receiveItinerary(data));
};

export const fetchItinerariesByUser = (userId) => async (dispatch) => {
  const res = await jwtFetch(`/api/itineraries/users/${userId}`);
  const data = await res.json();
  dispatch(receiveItineraries(data));
};

export const createItinerary = (userId, itinerary) => async (dispatch) => {
  const res = await jwtFetch(`/api/itineraries/users/${userId}`, {
    method: "POST",
    body: JSON.stringify(itinerary),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  dispatch(receiveItinerary(data));
  console.log(data);
  return data;
};

export const deleteItinerary = (itineraryId) => async (dispatch) => {
  await jwtFetch(`/api/itineraries/${itineraryId}`, {
    method: "DELETE"
  });
  dispatch(removeItinerary(itineraryId));
};

export const updateItinerary = (itinerary) => async (dispatch) => {
  const res = await jwtFetch(`/api/itineraries/${itinerary._id}`, {
    method: "PATCH",
    body: JSON.stringify(itinerary),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await res.json();
  dispatch(receiveItinerary(data));
  return data;
};

const itinerariesReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_ITINERARY:
      newState[action.itinerary._id] = action.itinerary;
      return newState[action.itinerary._id];
    case RECEIVE_ITINERARIES:
      return { ...action.itineraries };
    case CLEAR_ITINERARY:
      return {};
    default:
      return state;
  }
};

export default itinerariesReducer;
