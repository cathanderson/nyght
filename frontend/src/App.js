import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import NavBar from "./components/NavBar/NavBar";

import MainPage from "./components/MainPage/MainPage";
import AboutPage from "./components/AboutPage/AboutPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ItineraryShowPage from "./components/ItineraryShowPage/ItineraryShowPage";
import ItineraryEditPage from "./components/ItineraryEditPage/index.js";
// import ShowContainer from "./components/ItineraryShowPage/ShowContainer";
import EmailFormPage from "./components/EmailPage/EmailFormPage";

import { getCurrentUser } from "./store/session";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/test">
            <EmailFormPage />
          </Route>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/about">
            <AboutPage />
          </Route>
          <ProtectedRoute exact path="/profile" component={ProfilePage} />
          <ProtectedRoute
            exact
            path="/itineraries/:itineraryId"
            component={ItineraryShowPage}
          />
          <ProtectedRoute
            exact
            path="/itineraries/:itineraryId/edit"
            component={ItineraryEditPage}
          />
        </Switch>
      </>
    )
  );
}

export default App;
