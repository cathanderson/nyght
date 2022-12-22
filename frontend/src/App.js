import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import NavBar from "./components/NavBar/NavBar";

import MainPage from "./components/MainPage/MainPage";
import AboutPage from "./components/AboutPage/AboutPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ItineraryShowPage from "./components/ItineraryShowPage/ItineraryShowPage";
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
          {/* <AuthRoute exact path="/" component={MainPage} />
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/signup" component={SignupForm} /> */}
        </Switch>
      </>
    )
  );
}

export default App;
