import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../store/session";
import { fetchItinerariesByUser } from "../../store/itineraries";
import ItinerariesList from "./ItinerariesList";
import "./ProfilePage.css";

function ProfilePage() {
  const currentUser = useSelector((state) => state.session.user);
  const itineraries = useSelector((state) => Object.values(state.itineraries));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(fetchItinerariesByUser(currentUser._id));
  }, []);

  return (
    <>
      <main id="profile-page-container">
        <div id="profile-page-header-container">
          <h2 id="profile-page-header">Hey there {currentUser.firstName}!</h2>
        </div>
        <ItinerariesList itineraries={itineraries}/>
      </main>
    </>
  );
}

export default ProfilePage;
