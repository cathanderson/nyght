import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../store/session";
import {
  fetchItinerariesByUser,
  getItineraries,
} from "../../store/itineraries";
import ItinerariesList from "./ItinerariesList";
import { clearVenues } from "../../store/venues";
import "./ProfilePage.css";

function ProfilePage() {
  const currentUser = useSelector((state) => state.session.user);
  const itineraries = useSelector(getItineraries);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearVenues());
    dispatch(getCurrentUser());
    dispatch(fetchItinerariesByUser(currentUser._id));
  }, []);

  return (
    <>
      <main id="profile-page-container">
        <div id="profile-page-header-container">
          <h2 id="profile-page-header">Hey there {currentUser.firstName}!</h2>
        </div>
        <ItinerariesList itineraries={itineraries} />
      </main>
    </>
  );
}

export default ProfilePage;
