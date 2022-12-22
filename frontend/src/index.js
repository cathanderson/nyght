import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/Modal";
import configureStore from "./store/store";
import * as venueActions from "./store/venues";
import * as itineraryActions from "./store/itineraries";
import jwtFetch from "./store/jwt";
import * as emailActions from "./store/emails";

let store = configureStore({});

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.jwtFetch = jwtFetch;
  window.venueActions = venueActions;
  window.itineraryActions = itineraryActions;
  window.emailActions = emailActions;
}

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
