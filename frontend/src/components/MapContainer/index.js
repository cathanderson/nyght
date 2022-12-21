import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState, React } from "react";
import MapStyles from "./MapStyles";
import pin from "../../assets/icons/pin.png";

const MapContainer = () => {
  const [selected, setSelected] = useState({});

  const onSelect = (item) => {
    setSelected(item);
  };

  let defaultCenter = {
    lng: -73.98772938211399,
    lat: 40.74694716164171,
  };

  let locations = {
    1: {
      name: "Philippe Chow",
      location: {
        lng: -73.9703347582011,
        lat: 40.7640451702822,
      },
    },
    2: {
      name: "The Rum House",
      location: {
        lng: -73.9865878484881,
        lat: 40.7595739126703,
      },
    },
    3: {
      name: "Visit the Museum of Modern Art",
      location: {
        lng: -73.977649980508,
        lat: 40.7614106916124,
      },
    },
  };

  const mapContainerStyles = {
    height: "80vh",
    width: "80%",
  };
  console.log(process.env);

  return (
    // <LoadScript googleMapsApiKey="AIzaSyB1BxZST3Zm7-b1cgmTBnFoRCYHZ6NkI10">
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyles}
        zoom={13}
        center={defaultCenter}
        // options={{
        //   styles: MapStyles,
        // }}
      >
        {Object.values(locations).map((item) => {
          return (
            <Marker
              key={item.name}
              position={item.location}
              onClick={() => onSelect(item)}
              //   icon={pin}
            />
          );
        })}
        {selected.location && (
          <InfoWindow
            position={selected.location}
            clickable={true}
            onCloseClick={() => setSelected({})}
          ></InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
