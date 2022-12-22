import jwtFetch from "./jwt";

const RECEIVE_LIST = "emails/RECEIVE_LIST";
const REMOVE_EMAIL = "emails/REMOVE_EMAIL";
const ADD_EMAIL = "emails/ADD_EMAIL"

export const removeEmail = (email) => ({
  type: REMOVE_EMAIL,
  email,
});

export const receiveList = (list) => ({
  type: RECEIVE_LIST,
  list,
});

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email
})

export const getList = (state) =>
  state.emails ? Object.values(state.emails) : [];

export const fetchList = (itineraryId) => async (dispatch) => {
  const res = await jwtFetch(`/api/emails/${itineraryId}`);
  const data = await res.json();
  dispatch(receiveList(data));
};

export const createEmail = (itineraryId, email) => async (dispatch) => {
  const res = await jwtFetch(`/api/emails/${itineraryId}`, {
    method: "POST",
    body: JSON.stringify({email: email}),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(addEmail(data));
  return data;
};

export const deleteEmail = (id) => async (dispatch) => {
  const res = await jwtFetch(`/api/emails/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(removeEmail(data));
};

const emailsReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_LIST:
      return action.list;
    case ADD_EMAIL:
      const size = Object.keys(newState).length;
      newState[size] = action.email;
      return newState;
    case REMOVE_EMAIL:
      const keys = Object.keys(newState);
      const keyToDelete = keys.find((key) => newState[key].id === action.email.id);
      delete newState[keyToDelete];
      return newState;
    default:
      return state;
  }
};

export default emailsReducer;
