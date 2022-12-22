import jwtFetch from "./jwt";

const RECEIVE_LIST = "emails/RECEIVE_LIST";
const REMOVE_EMAIL = "emails/REMOVE_EMAIL";

export const removeEmail = (email) => ({
  type: REMOVE_EMAIL,
  email,
});

export const receiveList = (list) => ({
  type: RECEIVE_LIST,
  list,
});

export const getList = (state) =>
  state.emails ? Object.values(state.emails) : [];

export const fetchList = (itineraryId) => async (dispatch) => {
  const res = await jwtFetch(`/api/emails/${itineraryId}`);
  const data = await res.json();
  dispatch(receiveList(data));
};

export const createEmail = (itineraryId, email) => async (dispatch) => {
  // debugger;
  const res = await jwtFetch(`/api/emails/${itineraryId}`, {
    method: "POST",
    body: JSON.stringify(email),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  debugger;
  dispatch(receiveList(email));
  return data;
};

export const deleteEmail = (id, itineraryId) => async (dispatch) => {
  const res = await jwtFetch(`/api/emails/${itineraryId}`, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(receiveList(data));
};

const emailsReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_LIST:
      return action.list;
    default:
      return state;
  }
};

export default emailsReducer;
