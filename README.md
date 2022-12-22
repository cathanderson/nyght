# NYGHT

# <p align="center"/> <img src="./frontend/src/assets/images/logo.png" width="500" height="175" />

Live link here (MUST ADD ONCE IMPLEMENTED).

## Background and Overview

NYGHT is a New York City plan generator fit for couples looking for new date ideas and groups of friends looking for new places to try in different neighborhoods across the city.

To create a plan, the user can navigate to the home page, select a neighborhood, whether they'd prefer an after dinner cocktail or dessert, and modify the provided plan by clicking a venue and toggling through available options in that category.

Once the user is satisfied with their plan, they can hit confirm. This will bring them to the itinerary's page which includes a map for their plan and functionality to email their plan to themself and their friends. They also have the ability to modify/cancel their plan from that page.

## Technologies and APIs Used

- MongoDB
- Express
- React/Redux
- Nodejs
- Google Maps API
- AWS
- nodemailer

## Feature Highlights

### Nodemailer Frontend & Backend

One of the many features in NYGHT is the ability for the user to send out emails to themselves and others.

```js
 const submitEmail = async (e) => {
    e.preventDefault();
    visible(false);
    const emails = list.map((item) => item.email);
    const response = await jwtFetch("/api/itineraries/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: currentUser.firstName,
        list: emails,
        title: itinerary.title,
        activity: venues[0],
        restaurant: venues[1],
        dessertOrBar: venues[2],
      }),
    })

    ...
  };
```

Upon submitting an email, a request is made to the backend where the server will send an email out. With the use of Nodemailer-Express-Handlebars, the server can, instead of using plain text, utilize an HTML template to create the email. Included in the itinerary email is all the parameters displayed above within `body: JSON.stringify({...})`.

```js
router.post("/send", (req, res) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: `${req.body.list}`,
    subject: `Message From NYGHT`,
    template: "email",
    context: {
      name: `${req.body.firstName}`,
      title: `${req.body.title}`,
      activity: `${req.body.activity.title}`,
      activityAddress: `${req.body.activity.address}`,
      restaurant: `${req.body.restaurant.title}`,
      restaurantAddress: `${req.body.restaurant.address}`,
      dessertOrBar: `${req.body.dessertOrBar.title}`,
      dessertOrBarAddress: `${req.body.dessertOrBar.address}`,
    },
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.json({ status: `fail: ${err}` });
    } else {
      console.log("Message sent");
      res.json({ status: "success" });
    }
  });
});
```

The server responds to the request and provides the context to the email template. Individual key-value pairs are distributed to allow the template to easily reference each one.

### Google Maps API Implementation

Upon navigating to an itinerary show page, the user will see three cards displaying the venues that make up their plan plus a map that includes pins denoting the venues' locations.

The map's default zoom amount and center location change dynamically depending on the neighborhood associated with the plan. This was accomplished by assigning each neighborhood to an appropriate zoom amount and center location inside of respective defaultZooms and defaultCenters objects.

```js
    //MapContainer.js

const MapContainer = ({ activity, restaurant, bar, dessert }) => {

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

    ...

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
      ...
      </GoogleMap>
    </LoadScript>
  );
};
```
