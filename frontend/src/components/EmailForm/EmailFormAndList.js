import "./EmailFormAndList.css";
import { useEffect, useState } from "react";
import jwtFetch from "../../store/jwt";
import {
  fetchList,
  getList,
  createEmail,
  deleteEmail,
  updateEmails,
} from "../../store/emails";
import { useDispatch, useSelector } from "react-redux";
import { getItinerary } from "../../store/itineraries";
import { clearVenues, fetchVenue, getVenues } from "../../store/venues";
import { useParams } from "react-router-dom";

function EmailFormAndList({ visible, google }) {
  const [mailerState, setMailerState] = useState("");
  const list = useSelector(getList);
  const { itineraryId } = useParams();
  const dispatch = useDispatch();
  const itinerary = useSelector((state) => state.itineraries);
  const currentUser = useSelector((state) => state.session.user);
  const venues = useSelector(getVenues);
  const [updateDisabled, setUpdateDisabled] = useState({});
  const [emails, setEmailed] = useState({});

  useEffect(() => {
    dispatch(fetchList(itineraryId));
  }, [dispatch, itineraryId, list.length]);

  useEffect(() => {
    list.forEach((email, idx) => {
      setEmailed((emails) => ({
        ...emails,
        [idx]: email.email,
      }));
    });
  }, [list]);

  const handleBlur = (e) => {
    const idx = e.currentTarget.idx;
    setUpdateDisabled({
      ...updateDisabled,
      [e.currentTarget.idx]: true,
    });
    dispatch(updateEmails(e.currentTarget.email, e.currentTarget.value));

    e.currentTarget.removeEventListener("blur", handleBlur);
  };

  function handleStateChange(e) {
    setMailerState(e.target.value);
  }

  const addEmail = (e) => {
    const size = Object.keys(emails).length;
    e.preventDefault();
    if (mailerState.length > 0) {
      dispatch(createEmail(itineraryId, mailerState));
      setMailerState("");
    }
  };

  const handleDelete = (e, email) => {
    e.preventDefault();
    dispatch(deleteEmail(email._id, itineraryId));
    dispatch(fetchList(itineraryId));
  };

  const handleUpdate = (e, idx, email) => {
    const input = document.querySelector(`.update-input-${idx}`);
    e.preventDefault();
    setUpdateDisabled({
      ...updateDisabled,
      [idx]: false,
    });
    input.addEventListener("blur", handleBlur);
    input.idx = idx;
    input.email = email;
  };

  let emailList;

  if (list.length === 0) {
    emailList = (
      <div id="no-emails-div">No emails yet! Add one on the left 😉</div>
    );
  } else {
    emailList = list.map((email, idx) => {
      return (
        <div id="emails-list-item">
          <li>
            <input
              id="emails-list-item-input"
              className={`update-input-${idx}`}
              type="email"
              value={emails[idx]}
              onChange={(e) => setEmailed({ ...emails, [idx]: e.target.value })}
              disabled={idx in updateDisabled ? updateDisabled[idx] : true}
            ></input>
          </li>
          <button
            id="emails-list-item-button"
            className="email-form-list-button"
            onClick={(e) => handleDelete(e, email)}
          >
            Delete
          </button>
          <button
            id="emails-list-item-button"
            className="email-form-list-button"
            onClick={(e) => handleUpdate(e, idx, email)}
          >
            Edit
          </button>
        </div>
      );
    });
  }

  const submitEmail = async (e) => {
    e.preventDefault();
    visible(false);
    const emails = list.map((item) => item.email);
    let restaurant, dessert, bar, activity;
    for (let venue of venues) {
      switch (venue.category) {
        case "activity":
          activity = venue;
          break;
        case "bar":
          bar = venue;
          break;
        case "restaurant":
          restaurant = venue;
          break;
        case "dessert":
          dessert = venue;
          break;
        default:
          break;
      }
    }
    const response = await jwtFetch("/api/itineraries/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        list: emails,
        title: itinerary.title,
        activity: activity,
        restaurant: restaurant,
        dessertOrBar: itinerary.isDessert ? dessert : bar,
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        if (resData.status === "success") {
          alert("Message Sent");
        } else if (resData.status === "fail") {
          alert("Message failed to send");
        }
      })
      .then(() => {
        setMailerState({
          email: "",
        });
      });
  };

  return (
    <div id="email-form-list-container">
      <div id="outter-top-email-form-list-container">
        <div id="inner-top-email-form-list-container">
          <form id="add-email-form" onSubmit={addEmail}>
            <h4 id="email-form-list-subheader">Add a friend's email:</h4>
            <input
              id="add-email-text-input"
              type="email"
              placeholder="Add email"
              onChange={handleStateChange}
              value={mailerState}
            />
            <input
              id="add-email-submit-input"
              className="email-form-list-button"
              type="submit"
              value="Add email"
            />
          </form>
        </div>
        <div id="inner-top-email-form-list-container">
          <h4 id="email-form-list-subheader">Itinerary email list:</h4>
          <ul id="emails-list">{emailList}</ul>
        </div>
      </div>
      <div id="outter-bottom-email-form-list-container">
        <form id="send-email-form" onSubmit={submitEmail}>
          <input
            id="send-email-button"
            className="email-form-list-button"
            type="submit"
            value="Send emails"
          />
        </form>
      </div>
    </div>
  );
}

export default EmailFormAndList;
