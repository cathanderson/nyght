import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState, React } from "react";
import MapStyles from "./MapStyles";
import pin from "../../assets/icons/pin.png";

const MapContainer = ({ activity, restaurant, bar, dessert }) => {

  const [selected, setSelected] = useState({});

  const onSelect = (item) => {
    setSelected(item);
  };

  let defaultCenter = {
    lng: -73.98772938211399,
    lat: 40.74694716164171,
  };

  let locations = {
    activity: {
      name: activity.title,
      location: {
        lng: parseFloat(activity.lng.$numberDecimal),
        lat: parseFloat(activity.lat.$numberDecimal),
      },
    },
    restaurant: {
      name: restaurant.title,
      location: {
        lng: parseFloat(restaurant.lng.$numberDecimal),
        lat: parseFloat(restaurant.lat.$numberDecimal),
      },
    },
  };

  if (bar) {
    locations.bar = {
      name: bar.title,
      location: {
        lng: parseFloat(bar.lng.$numberDecimal),
        lat: parseFloat(bar.lat.$numberDecimal),
      },
    };
  } else {
    locations.dessert = {
      name: dessert.title,
      location: {
        lng: parseFloat(dessert.lng.$numberDecimal),
        lat: parseFloat(dessert.lat.$numberDecimal),
      },
    };
  }

  const mapContainerStyles = {
    height: "80vh",
    width: "80%",
  };

  console.log(Object.values(locations));

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
