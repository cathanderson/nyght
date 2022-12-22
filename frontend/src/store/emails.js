import jwtFetch from "./jwt";

const RECEIVE_LIST = "emails/RECEIVE_LIST";
const REMOVE_EMAIL = "emails/REMOVE_EMAIL";
const ADD_EMAIL = "emails/ADD_EMAIL";
const UPDATE_EMAIL = "emails/UPDATE_EMAIL";

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
  email,
});

export const updateEmail = (email) => ({
  type: UPDATE_EMAIL,
  email,
});

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
    body: JSON.stringify({ email: email }),
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

export const updateEmails = (email, newEmail) => async (dispatch) => {
  console.log(`here: ${newEmail}`);
  const res = await jwtFetch(`/api/emails/${email._id}`, {
    method: "PATCH",
    body: JSON.stringify({ email: newEmail }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(updateEmail(data));
};

const emailsReducer = (state = {}, action) => {
  const newState = { ...state };
  const keys = Object.keys(newState);
  switch (action.type) {
    case RECEIVE_LIST:
      return action.list;
    case ADD_EMAIL:
      const size = Object.keys(newState).length;
      newState[size] = action.email;
      return newState;
    case REMOVE_EMAIL:
      const keyToDelete = keys.find(
        (key) => newState[key].id === action.email.id
      );
      delete newState[keyToDelete];
      return newState;
    case UPDATE_EMAIL:
      console.log(`action email:`);
      console.log(action.email);
      const keyToUpdate = keys.find(
        (key) => newState[key]._id === action.email._id
      );
      newState[keyToUpdate] = action.email;
      return newState;
    default:
      return state;
  }
};

export default emailsReducer;
