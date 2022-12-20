import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../store/session";
import ItinerariesList from "./ItinerariesList";
import "./ProfilePage.css";

function ProfilePage() {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  // off the bat will have to fetch all of the user's itineraries then feed that
  // collection as a prop to a separate ItineratiesList component

  return (
    <>
      <main id="profile-page-container">
        <div id="profile-page-header-container">
          <h2 id="profile-page-header">Hey there {currentUser.firstName}!</h2>
        </div>
        {/* this will be the real function that's used */}
        {/* <ItinerariesList itineraries={itineraries}/> */}
        <ItinerariesList />
      </main>
    </>
  );
}

export default ProfilePage;
