import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState, React } from "react";
import MapStyles from "./MapStyles";
import pin from "../../assets/icons/pin.png";
import { Link } from "react-router-dom";

const MapContainer = ({ activity, restaurant, bar, dessert }) => {
  const [selected, setSelected] = useState({});

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
      lng: -73.94170604212119,
      lat: 40.71209060417673,
    },
    harlem: {
      lng: -73.94730604212119,
      lat: 40.82009060417673,
    },
  };

  let defaultZooms = {
    midtown: 15,
    village: 15,
    williamsburg: 14.5,
    harlem: 14,
  };

  let locations = {
    activity: {
      name: activity.title,
      location: {
        lng: parseFloat(activity.lng.$numberDecimal),
        lat: parseFloat(activity.lat.$numberDecimal),
      },
      address: activity.address,
      resLink: activity.resLink,
    },
    restaurant: {
      name: `Have dinner at ${restaurant.title}`,
      location: {
        lng: parseFloat(restaurant.lng.$numberDecimal),
        lat: parseFloat(restaurant.lat.$numberDecimal),
      },
      address: restaurant.address,
      resLink: restaurant.resLink,
    },
  };

  if (bar) {
    locations.bar = {
      name: `Have drinks at ${bar.title}`,
      location: {
        lng: parseFloat(bar.lng.$numberDecimal),
        lat: parseFloat(bar.lat.$numberDecimal),
      },
      address: bar.address,
      resLink: bar.resLink,
    };
  } else {
    locations.dessert = {
      name: `Have dessert at ${dessert.title}`,
      location: {
        lng: parseFloat(dessert.lng.$numberDecimal),
        lat: parseFloat(dessert.lat.$numberDecimal),
      },
      address: dessert.address,
      resLink: dessert.resLink,
    };
  }

  const mapContainerStyles = {
    height: "80vh",
    width: "80%",
  };

  if (window.google === undefined) {
    return (
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
            >
              <>
                <h4>
                  <Link to={{ pathname: selected.resLink }} target="_blank">
                    {selected.name}
                  </Link>
                </h4>
                <div>{selected.address}</div>
              </>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    );
  } else {
    return (
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
          >
            <>
              <h4>
                <Link to={{ pathname: selected.resLink }} target="_blank">
                  {selected.name}
                </Link>
              </h4>
              <div>{selected.address}</div>
            </>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
};

export default MapContainer;
