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

  console.log(restaurant)

  const onSelect = (item) => {
    setSelected(item);
  };


  let defaultCenters = {
    midtown: {
      lng: -73.98170604212119,
      lat: 40.75809060417673,
    },
    village: {
      lng: -73.99270604212119,
      lat: 40.72509060417673,
    },
    williamsburg: {
      lng: -73.98170604212119,
      lat: 40.75809060417673,
    },
    harlem: {
      lng: -73.98170604212119,
      lat: 40.75809060417673,
    },
  };

  let defaultZooms = {
    midtown: 15,
    village: 15,
    williamsburg: 15,
    harlem: 15,
  }

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
        zoom={defaultZooms[restaurant.neighborhood]}
        center={defaultCenters[restaurant.neighborhood]}
        options={{
          styles: MapStyles,
        }}
      >
        {Object.values(locations).map((item) => {
          return (
            <Marker
              key={item.name}
              position={item.location}
              onClick={() => onSelect(item)}
              icon={pin}
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
