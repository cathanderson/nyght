export const MapStyles = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [
      {
        color: "#202c3e",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        gamma: 0.01,
      },
      {
        lightness: 20,
      },
      {
        weight: "1.39",
      },
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        weight: "0.96",
      },
      {
        saturation: "9",
      },
      {
        visibility: "on",
      },
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        lightness: 30,
      },
      {
        saturation: "9",
      },
      {
        color: "#29446b",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        saturation: 20,
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        lightness: 20,
      },
      {
        saturation: -20,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        lightness: 10,
      },
      {
        saturation: -30,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#193a55",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        saturation: 25,
      },
      {
        lightness: 25,
      },
      {
        weight: "0.01",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        lightness: -20,
      },
    ],
  },
];

// export const MapStyles = [
//   {
//     featureType: "landscape.natural",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         visibility: "on",
//       },
//       {
//         color: "#e0efef",
//       },
//     ],
//   },
//   {
//     featureType: "poi",
//     elementType: "geometry.fill",
//     stylers: [
//       {
//         visibility: "on",
//       },
//       {
//         hue: "#1900ff",
//       },
//       {
//         color: "#c0e8e8",
//       },
//     ],
//   },
//   {
//     featureType: "poi",
//     elementType: "labels",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "road",
//     elementType: "geometry",
//     stylers: [
//       {
//         visibility: "off",
//       },
//       {
//         lightness: 100,
//       },
//       {
//         visibility: "simplified",
//       },
//     ],
//   },
//   {
//     featureType: "road",
//     elementType: "labels",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "transit.line",
//     elementType: "geometry",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "transit",
//     elementType: "icon",
//     stylers: [
//       {
//         visibility: "off",
//       },
//     ],
//   },
//   {
//     featureType: "water",
//     elementType: "all",
//     stylers: [
//       {
//         color: "#7dcdcd",
//       },
//     ],
//   },
// ];

export default MapStyles;
