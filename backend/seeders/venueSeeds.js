const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const Venue = require("../models/Venue");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    insertSeeds();
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

const data = [
  {
    neighborhood: "midtown",
    category: "restaurant",
    title: "Philippe Chow",
    lat: 40.7640451702822,
    lng: -73.9703347582011,
    address: "33 E 60th St, New York, NY 10065",
    resLink: "https://www.opentable.com/r/philippe-new-york"
  },
  {
    neighborhood: "midtown",
    category: "restaurant",
    title: "Totto Ramen Midtown East",
    lat: 40.756142053315,
    lng: -73.9681331863265,
    address: "248 E 52nd St, New York, NY 10022",
    resLink: "https://www.tottoramen.com/midtown-east"
  },
  {
    neighborhood: "midtown",
    category: "restaurant",
    title: "The Ribbon — Midtown 44st",
    lat: 40.7577078976798,
    lng: -73.9872577309333,
    address: "229 West 43rd Street, 220 W 44th St, New York, NY 10036",
    resLink: "https://www.theribbonnyc.com/reservations"
  },
  {
    neighborhood: "midtown",
    category: "restaurant",
    title: "Barolo East",
    lat: 40.7547346773273,
    lng: -73.970745774667,
    address: "214 E 49th St, New York, NY 10017",
    resLink: "https://www.opentable.com/r/barolo-east-new-york?ref=1068"
  },
  {
    neighborhood: "midtown",
    category: "restaurant",
    title: "Souvlaki GR Kouzina",
    lat: 40.7572444551104,
    lng: -73.9680826352273,
    address: "231 E 53rd St, New York, NY 10022",
    resLink: "https://resy.com/cities/ny/souvlaki-gr-kouzina"
  },
  {
    neighborhood: "midtown",
    category: "restaurant",
    title: "Los Tacos No.1",
    lat: 40.7573019294485,
    lng: -73.9876221995337,
    address: "229 W 43rd St, New York, NY 10036",
    resLink: "https://www.lostacos1.com/"
  },
  {
    neighborhood: "midtown",
    category: "restaurant",
    title: "MáLà Project Midtown West",
    lat: 40.7568561368005,
    lng: -73.980551373275,
    address: "41 W 46th St, New York, NY 10036",
    resLink: "https://resy.com/cities/ny/mala-project-bryant-park"
  },
  {
    neighborhood: "midtown",
    category: "restaurant",
    title: "Beyond Sushi",
    lat: 40.7632546235477,
    lng: -73.9772137248917,
    address: "62 W 56th St, New York, NY 10019",
    resLink: "https://resy.com/cities/ny/beyond-sushi"
  },
  {
    neighborhood: "midtown",
    category: "restaurant",
    title: "Random Access",
    lat: 40.7489832397707,
    lng: -73.990346688617,
    address: "138 W 32nd St, New York, NY 10001",
    resLink: "https://resy.com/cities/ny/random-access"
  },
  {
    neighborhood: "midtown",
    category: "restaurant",
    title: "Bryant Park Grill",
    lat: 40.753159520794,
    lng: -73.982977199984,
    address: "25 W 40th St, New York, NY 10018",
    resLink: "https://resy.com/cities/ny/bryant-park-grill"
  },
  {
    neighborhood: "midtown",
    category: "activity",
    title: "See Funny Girl",
    lat: 40.7633172358823,
    lng: -73.9842653758999,
    address: "245 W 52nd St, New York, NY 10019",
    resLink: "https://funnygirlonbroadway.com/tickets/"
  },
  {
    neighborhood: "midtown",
    category: "activity",
    title: "Visit the Museum of Modern Art",
    lat: 40.7614106916124,
    lng: -73.977649980508,
    address: "11 W 53rd St, New York, NY 10019",
    resLink: "https://www.moma.org/"
  },
  {
    neighborhood: "midtown",
    category: "activity",
    title: "Get a pre-dinner snack at Grand Central Market",
    lat: 40.7524645702221,
    lng: -73.9766893570851,
    address: "89 E 42nd St, New York, NY 10017",
    resLink: "https://www.grandcentralterminal.com/grand-central-market/"
  },
  {
    neighborhood: "midtown",
    category: "activity",
    title: "See & Juliet on Broadway",
    lat: 40.7558029060215,
    lng: -73.9848337687109,
    address: "124 W 43rd St, New York, NY 10036",
    resLink: "https://www.todaytix.com/nyc/shows/25598-and-juliet-on-broadway"
  },
  {
    neighborhood: "midtown",
    category: "activity",
    title: "See Hadestown on Broadway",
    lat: 40.7606508409753,
    lng: -73.9856777309458,
    address: "219 W 48th St, New York, NY 10036",
    resLink: "https://www.todaytix.com/nyc/shows/14748-hadestown"
  },
  {
    neighborhood: "midtown",
    category: "activity",
    title: "Take a walk through Central Park",
    lat: 40.7658983359996,
    lng: -73.9762657474023,
    address: "New York, NY",
    resLink: "https://www.centralparknyc.org/"
  },
  {
    neighborhood: "midtown",
    category: "activity",
    title: "Visit Central Park Zoo",
    lat: 40.7675992361868,
    lng: -73.9717905856573,
    address: "East 64th Street, New York, NY 10021",
    resLink: "http://www.centralparkzoo.com/"
  },
  {
    neighborhood: "midtown",
    category: "activity",
    title: "Go bowling at Bowlero Times Square",
    lat: 40.7576040327011,
    lng: -73.9872812835614,
    address: "222 W 44th St, New York, NY 10036",
    resLink: "https://www.bowlero.com/location/bowlero-times-square"
  },
  {
    neighborhood: "midtown",
    category: "activity",
    title: "Take a walk through Bryant Park",
    lat: 40.7535244935123,
    lng: -73.9831688418755,
    address: "New York, NY 10018",
    resLink: "https://bryantpark.org/"
  },
  {
    neighborhood: "midtown",
    category: "activity",
    title: "Play ping pong at SPIN New York 54",
    lat: 40.7609585074223,
    lng: -73.9744664299535,
    address: "7 E 54th St, New York, NY 10022",
    resLink:
      "https://wearespin.com/location/new-york-54/advanced-reservations/?utm_content=location"
  },
  {
    neighborhood: "midtown",
    category: "bar",
    title: "The Rum House",
    lat: 40.7595739126703,
    lng: -73.9865878484881,
    address: "228 W 47th St, New York, NY 10036",
    resLink: "http://www.therumhousenyc.com/"
  },
  {
    neighborhood: "midtown",
    category: "bar",
    title: "Pocket Bar NYC",
    lat: 40.763363500595,
    lng: -73.9921813025156,
    address: "455 W 48th St, New York, NY 10036",
    resLink: "https://www.pocketbarnyc.com/"
  },
  {
    neighborhood: "midtown",
    category: "bar",
    title: "The Rickey",
    lat: 40.7643215082708,
    lng: -73.981809520927,
    address: "210 W 55th St #1, New York, NY 10019",
    resLink: "https://taogroup.com/venues/the-rickey-cocktail-lounge-new-york/"
  },
  {
    neighborhood: "midtown",
    category: "bar",
    title: "The Long Room",
    lat: 40.7563619379417,
    lng: -73.9842539703155,
    address: "120 W 44th St, New York, NY 10036",
    resLink: "https://resy.com/cities/ny/the-long-room"
  },
  {
    neighborhood: "midtown",
    category: "bar",
    title: "Ardesia Wine Bar",
    lat: 40.7661136378268,
    lng: -73.9918070704704,
    address: "510 W 52nd St, New York, NY 10019",
    resLink: "http://www.ardesia-ny.com/"
  },
  {
    neighborhood: "midtown",
    category: "bar",
    title: "Bar Orai",
    lat: 40.7566033024492,
    lng: -73.9692329811021,
    address: "212 E 52nd St 2nd fl, New York, NY 10022",
    resLink: "https://resy.com/cities/ny/bar-orai"
  },
  {
    neighborhood: "midtown",
    category: "bar",
    title: "Pebble Bar",
    lat: 40.7592256526682,
    lng: -73.9805222156041,
    address: "67 W 49th St, New York, NY 10112",
    resLink: "https://resy.com/cities/ny/pebble-bar"
  },
  {
    neighborhood: "midtown",
    category: "bar",
    title: "Valerie",
    lat: 40.7562786108504,
    lng: -73.9812213290551,
    address: "45 W 45th St, New York, NY 10036",
    resLink: "http://valerienewyorkcity.com/"
  },
  {
    neighborhood: "midtown",
    category: "bar",
    title: "Vanguard Wine Bar (Midtown West)",
    lat: 40.762650031232,
    lng: -73.9851860644053,
    address: "252 W 51st St, New York, NY 10019",
    resLink: "http://vanguard-nyc.com/"
  },
  {
    neighborhood: "midtown",
    category: "bar",
    title: "On the Rocks",
    lat: 40.7637676305488,
    lng: -73.992221288854,
    address: "696 10th Ave, New York, NY 10019",
    resLink: "https://www.yelp.com/biz/on-the-rocks-new-york-2"
  },
  {
    neighborhood: "midtown",
    category: "dessert",
    title: "Lady M Cake Boutique - New York City",
    lat: 40.7527615975624,
    lng: -73.9836343519315,
    address: "36 W 40th St, New York, NY 10018",
    resLink: "http://www.ladym.com/"
  },
  {
    neighborhood: "midtown",
    category: "dessert",
    title: "Wafels & Dinges",
    lat: 40.7545480014156,
    lng: -73.9840709826554,
    address: "6th Avenue &, W 42nd St, New York, 10018",
    resLink: "http://wafels.com/"
  },
  {
    neighborhood: "midtown",
    category: "dessert",
    title: "Schmackary's",
    lat: 40.7599965690923,
    lng: -73.9910624426006,
    address: "362 W 45th St, New York, NY 10036",
    resLink: "http://www.schmackarys.com/"
  },
  {
    neighborhood: "midtown",
    category: "dessert",
    title: "La Maison du Chocolat",
    lat: 40.7589436255963,
    lng: -73.9798473185068,
    address: "30 W 49th St, New York, NY 10020",
    resLink: "https://www.lamaisonduchocolat.com/en_us"
  },
  {
    neighborhood: "midtown",
    category: "dessert",
    title: "Angelina Bakery NYC",
    lat: 40.7549687926121,
    lng: -73.9916542053355,
    address: "575 8th Ave, New York, NY 10018",
    resLink: "https://www.angelinabakery.com/"
  },
  {
    neighborhood: "midtown",
    category: "dessert",
    title: "Surreal Creamery",
    lat: 40.7419935678734,
    lng: -73.9775703679252,
    address: "538 2nd Ave, New York, NY 10016",
    resLink: "https://www.surrealcreamery.com/"
  },
  {
    neighborhood: "midtown",
    category: "dessert",
    title: "Amorino Gelato and Cafe",
    lat: 40.7594914401382,
    lng: -73.9884338344851,
    address: "721 8th Ave, New York, NY 10036",
    resLink: "http://www.amorino.com/"
  },
  {
    neighborhood: "midtown",
    category: "dessert",
    title: "Eclair bakery",
    lat: 40.7566323935229,
    lng: -73.9666382097375,
    address: "305 E 53rd St, New York, NY 10022",
    resLink: "http://www.eclairbakery-nyc.com/"
  },
  {
    neighborhood: "midtown",
    category: "dessert",
    title: "Doughnuttery",
    lat: 40.7670302429659,
    lng: -73.9827507902143,
    address: "Turnstyle Underground Market, 1000 8th Ave, New York, NY 10019",
    resLink: "http://doughnuttery.com/'"
  },
  {
    neighborhood: "midtown",
    category: "dessert",
    title: "Little Pie Company",
    lat: 40.7594085629942,
    lng: -73.9933036468523,
    address: "424 W 43rd St, New York, NY 10036",
    resLink: "http://littlepiecompany.com/"
  },
  {
    neighborhood: "village",
    category: "restaurant",
    title: "Pasquale Jones",
    lat: 40.7210916959045,
    lng: -73.9968335038559,
    address: "187 Mulberry St, New York, NY 10012",
    resLink: "https://resy.com/cities/ny/pasquale-jones"
  },
  {
    neighborhood: "village",
    category: "restaurant",
    title: "Pranakhon",
    lat: 40.733726523882,
    lng: -73.9932086719168,
    address: "88 University Pl, New York, NY 10003",
    resLink: "https://resy.com/cities/ny/pranakhon"
  },
  {
    neighborhood: "village",
    category: "restaurant",
    title: "Rubirosa",
    lat: 40.7226548770233,
    lng: -73.9960833698514,
    address: "235 Mulberry St, New York, NY 10012",
    resLink: "https://resy.com/cities/ny/rubirosa"
  },
  {
    neighborhood: "village",
    category: "restaurant",
    title: "Flex Mussels",
    lat: 40.737446362748,
    lng: -73.9996645581144,
    address: "154 W 13th St, New York, NY 10011",
    resLink: "https://resy.com/cities/ny/flex-mussels-west-village"
  },
  {
    neighborhood: "village",
    category: "restaurant",
    title: "Malaparte",
    lat: 40.7368643205397,
    lng: -74.008030228893,
    address: "753 Washington St, New York, NY 10014",
    resLink: "https://resy.com/cities/ny/malaparte"
  },
  {
    neighborhood: "village",
    category: "restaurant",
    title: "Matsunori",
    lat: 40.7209081164504,
    lng: -73.9898240168038,
    address: "151 Allen St, New York, NY 10002",
    resLink: "https://resy.com/cities/ny/matsunori"
  },
  {
    neighborhood: "village",
    category: "restaurant",
    title: "RedFarm",
    lat: 40.7341905809401,
    lng: -74.0064117463554,
    address: "529 Hudson St, New York, NY 10014",
    resLink: "https://www.redfarmnyc.com/location/west-village"
  },
  {
    neighborhood: "village",
    category: "restaurant",
    title: "Van Da",
    lat: 40.7234025374168,
    lng: -73.983151227556,
    address: "234 E 4th St, New York, NY 10009",
    resLink: "https://resy.com/cities/ny/van-da"
  },
  {
    neighborhood: "village",
    category: "restaurant",
    title: "Claudette",
    lat: 40.7330439552034,
    lng: -73.9959840419597,
    address: "24 5th Ave, New York, NY 10011",
    resLink: "https://resy.com/cities/ny/claudette"
  },
  {
    neighborhood: "village",
    category: "restaurant",
    title: "Nami Nori",
    lat: 40.730197296141,
    lng: -74.0032284631993,
    address: "33 Carmine St, New York, NY 10014",
    resLink: "https://resy.com/cities/ny/nami-nori"
  },
  {
    neighborhood: "village",
    category: "activity",
    title: "Immerse yourself in color at the Color Factory",
    lat: 40.7256998025316,
    lng: -74.0052371423858,
    address: "251 Spring St, New York, NY 10013",
    resLink: "https://colorfactory.co/"
  },
  {
    neighborhood: "village",
    category: "activity",
    title: "Play games (and maybe grab a pre-dinner drink) at Barcade",
    lat: 40.7290382671696,
    lng: -73.9895003649168,
    address: "6 St Marks Pl, New York, NY 10003",
    resLink: "http://barcadestmarks.com/"
  },
  {
    neighborhood: "village",
    category: "activity",
    title: "Paint (and maybe have a pre-dinner drink) at Paint N Pour",
    lat: 40.7192860437045,
    lng: -73.9915662836249,
    address: "53 Delancey St, New York, NY 10002",
    resLink: "https://www.paintnpournyc.com/locations/lower-east-side/"
  },
  {
    neighborhood: "village",
    category: "activity",
    title: "Check out sustainability-themed art at Arcadia Earth",
    lat: 40.7290125403588,
    lng: -73.993507239247,
    address: "718 Broadway, New York, NY 10003",
    resLink: "https://www.arcadia-earth.com/"
  },
  {
    neighborhood: "village",
    category: "activity",
    title: "Check out some art at ARTECHOUSE",
    lat: 40.7425514071419,
    lng: -74.0065382154003,
    address: "439 W 15th St, New York, NY 10011",
    resLink: "http://artechouse.com/location/nyc"
  },
  {
    neighborhood: "village",
    category: "activity",
    title: "Listen to some jokes at the Comedy Cellar",
    lat: 40.7301806640133,
    lng: -74.0005404956145,
    address: "117 MacDougal St, New York, NY 10012",
    resLink: "http://comedycellar.com/"
  },
  {
    neighborhood: "village",
    category: "activity",
    title: "Visit the exhibits at the Museum of Illusions",
    lat: 40.7396758303522,
    lng: -74.0029115070724,
    address: "77 8th Ave, New York, NY 10014",
    resLink: "http://newyork.museumofillusions.us/"
  },
  {
    neighborhood: "village",
    category: "activity",
    title: "Explore the shelves at Strand Books",
    lat: 40.7331777686562,
    lng: -73.9907299440649,
    address: "828 Broadway, New York, NY 10003",
    resLink: "http://www.strandbooks.com/"
  },
  {
    neighborhood: "village",
    category: "activity",
    title: "See what's playing at the Wild Project",
    lat: 40.7229000860294,
    lng: -73.983296386565,
    address: "195 E 3rd St, New York, NY 10009",
    resLink: "http://www.thewildproject.org/"
  },
  {
    neighborhood: "village",
    category: "activity",
    title: "Take a cooking class at Red Inside",
    lat: 40.7299177037152,
    lng: -74.0007665656779,
    address: "109 MacDougal St #2, New York, NY 10012",
    resLink: "http://www.redinsideculinary.com/"
  },
  {
    neighborhood: "village",
    category: "bar",
    title: "The Wayland",
    lat: 40.7251166176702,
    lng: -73.9778186154008,
    address: "700 E 9th St, New York, NY 10009",
    resLink: "https://resy.com/cities/ny/the-wayland"
  },
  {
    neighborhood: "village",
    category: "bar",
    title: "Death & Company",
    lat: 40.7258649064573,
    lng: -73.9845702686391,
    address: "433 E 6th St, New York, NY 10009",
    resLink: "http://www.deathandcompany.com/"
  },
  {
    neighborhood: "village",
    category: "bar",
    title: "Air's Champagne Parlor",
    lat: 40.7306365679374,
    lng: -74.0001016315728,
    address: "127 MacDougal St, New York, NY 10012",
    resLink: "http://airschampagneparlor.com/"
  },
  {
    neighborhood: "village",
    category: "bar",
    title: "B'artusi",
    lat: 40.733872234304,
    lng: -74.0059285056366,
    address: "520 Hudson St, New York, NY 10014",
    resLink: "https://resy.com/cities/ny/bartusi"
  },
  {
    neighborhood: "village",
    category: "bar",
    title: "Temple Bar",
    lat: 40.7258667011051,
    lng: -73.9949270641817,
    address: "332 Lafayette St, New York, NY 10012",
    resLink: "https://resy.com/cities/ny/temple-bar"
  },
  {
    neighborhood: "village",
    category: "bar",
    title: "Amor Y Amargo",
    lat: 40.725613262573,
    lng: -73.9841316153999,
    address: "95 Avenue A, New York, NY 10009",
    resLink: "https://www.amoryamargo.com/"
  },
  {
    neighborhood: "village",
    category: "bar",
    title: "Accidental Bar",
    lat: 40.7236928524896,
    lng: -73.9787367450838,
    address: "98 Loisaida Ave, New York, NY 10009",
    resLink: "https://resy.com/cities/ny/accidental-bar'"
  },
  {
    neighborhood: "village",
    category: "bar",
    title: "Temperance Wine Bar",
    lat: 40.7299426143848,
    lng: -74.0031964884156,
    address: "40 Carmine St, New York, NY 10014",
    resLink: "https://resy.com/cities/ny/temperance_wine_bar"
  },
  {
    neighborhood: "village",
    category: "bar",
    title: "cloudM rooftop bar",
    lat: 40.7206039935684,
    lng: -73.9935176314423,
    address: "189 Bowery, New York, NY 10002",
    resLink: "https://resy.com/cities/ny/cloudm"
  },
  {
    neighborhood: "village",
    category: "bar",
    title: "Mace",
    lat: 40.7330885485695,
    lng: -73.9980745940011,
    address: "35 W 8th St, New York, NY 10011",
    resLink: "http://www.macenewyork.com/"
  },
  {
    neighborhood: "village",
    category: "dessert",
    title: "Morgenstern’s Finest Ice Cream",
    lat: 40.7271440937907,
    lng: -73.9998809138264,
    address: "88 W Houston St, New York, NY 10012",
    resLink: "http://www.morgensternsnyc.com/"
  },
  {
    neighborhood: "village",
    category: "dessert",
    title: "Mochii",
    lat: 40.726319018624,
    lng: -73.9844649750944,
    address: "116 E 7th St, New York, NY 10009",
    resLink: "https://www.mochiinyc.com/"
  },
  {
    neighborhood: "village",
    category: "dessert",
    title: "Baonanas",
    lat: 40.7269205228971,
    lng: -73.9851705021321,
    address: "93 E 7th St, New York, NY 10009",
    resLink: "http://www.baonanas.com/"
  },
  {
    neighborhood: "village",
    category: "dessert",
    title: "Mango Mango Artisan Lab",
    lat: 40.7290878027452,
    lng: -73.9887107361288,
    address: "23 St Marks Pl, New York, NY 10003",
    resLink: "http://mangomangodessert.com/"
  },
  {
    neighborhood: "village",
    category: "dessert",
    title: "The Alley",
    lat: 40.7295739082832,
    lng: -73.9909846263135,
    address: "68 Cooper Sq, New York, NY 10003",
    resLink: "https://www.the-alley.us/"
  },
  {
    neighborhood: "village",
    category: "dessert",
    title: "Sweet Rehab",
    lat: 40.7267191539089,
    lng: -74.0020370047336,
    address: "135 Sullivan St, New York, NY 10012",
    resLink: "https://www.sweetrehabnyc.com/"
  },
  {
    neighborhood: "village",
    category: "dessert",
    title: "Lafayette Grand Café & Bakery",
    lat: 40.7275061653303,
    lng: -73.9936841308847,
    address: "380 Lafayette St, New York, NY 10003",
    resLink: "http://lafayetteny.com/#menus"
  },
  {
    neighborhood: "village",
    category: "dessert",
    title: "Stuffed Ice Cream",
    lat: 40.7280001232735,
    lng: -73.9852839155135,
    address: "139 1st Ave., New York, NY 10003",
    resLink: "https://www.stuffedicecreamnyc.com/"
  },
  {
    neighborhood: "village",
    category: "dessert",
    title: "Gelateria Gentile",
    lat: 40.722958573529,
    lng: -73.9941081054489,
    address: "229 Elizabeth St, New York, NY 10012",
    resLink: "http://www.gelateriagentile.com/"
  },
  {
    neighborhood: "village",
    category: "dessert",
    title: "Boba Guys",
    lat: 40.7260976029074,
    lng: -73.9986241811803,
    address: "145 Greene St, New York, NY 10012",
    resLink: "http://www.bobaguys.com/"
  },
  {
    neighborhood: "williamsburg",
    category: "restaurant",
    title: "Le Crocodile",
    lat: 40.7219843073683,
    lng: -73.9580598954736,
    address: "80 Wythe Ave, Brooklyn, NY 11249",
    resLink: "https://resy.com/cities/ny/le-crocodile?date=2022-12-18&seats=2"
  },
  {
    neighborhood: "williamsburg",
    category: "restaurant",
    title: "Laser Wolf Brooklyn",
    lat: 40.72102,
    lng: -73.9586,
    address: "97 Wythe Ave, Brooklyn, NY 11249",
    resLink: "https://www.laserwolfbrooklyn.com/reservations"
  },
  {
    neighborhood: "williamsburg",
    category: "restaurant",
    title: "Fedoroff's Roast Pork",
    lat: 40.7189832709415,
    lng: -73.955385657231,
    address: "178 N 10th St, Brooklyn, NY 11211",
    resLink: "https://www.fedoroffs.com"
  },
  {
    neighborhood: "williamsburg",
    category: "restaurant",
    title: "Oasis",
    lat: 40.7183643008494,
    lng: -73.9575825173204,
    address: "168 Bedford Ave, Brooklyn, NY 11249",
    resLink: "https://www.facebook.com/profile.php?id=100063725313642"
  },
  {
    neighborhood: "williamsburg",
    category: "restaurant",
    title: "Anthony & Son Panini Shoppe",
    lat: 40.7179837694659,
    lng: -73.9450682001336,
    address: "433 Graham Ave, Brooklyn, NY 11211",
    resLink: "https://www.paninishoppe.com"
  },
  {
    neighborhood: "williamsburg",
    category: "restaurant",
    title: "Santa Fe BK",
    lat: 40.7180320596637,
    lng: -73.9566971578039,
    address: "178 N 8th St, Brooklyn, NY 11211",
    resLink: "https://santafebk.com"
  },
  {
    neighborhood: "williamsburg",
    category: "restaurant",
    title: "Bonnie's",
    lat: 40.7178869964258,
    lng: -73.9464792173204,
    address: "398 Manhattan Ave, Brooklyn, NY 11211",
    resLink: "https://www.bonniesbrooklyn.com/make-a-reservation"
  },
  {
    neighborhood: "williamsburg",
    category: "restaurant",
    title: "Lilia",
    lat: 40.7176747189607,
    lng: -73.9523795866391,
    address: "567 Union Ave, Brooklyn, NY 11211",
    resLink: "https://www.lilianewyork.com"
  },
  {
    neighborhood: "williamsburg",
    category: "restaurant",
    title: "Cozy Royale",
    lat: 40.7170355974659,
    lng: -73.943005076837,
    address: "434 Humboldt St, Brooklyn, NY 11211",
    resLink: "resy.com/cities/ny/cozy-royale"
  },
  {
    neighborhood: "williamsburg",
    category: "restaurant",
    title: "Llama Inn",
    lat: 40.7167648571157,
    lng: -73.9505820308148,
    address: "50 Withers St, Brooklyn, NY 11211",
    resLink: "https://resy.com/cities/ny/llama-inn?"
  },
  {
    neighborhood: "williamsburg",
    category: "activity",
    title: "Spend a Day Outdoors in McCarren Park",
    lat: 40.7210681134056,
    lng: -73.9524440234043,
    address: "776 Lorimer St, Brooklyn, NY 11222",
    resLink: "https://www.nycgovparks.org/parks/mccarren-park"
  },
  {
    neighborhood: "williamsburg",
    category: "activity",
    title: "Watch Movies and Dine at Nitehawk Cinema",
    lat: 40.7161673457041,
    lng: -73.9625535443094,
    address: "136 Metropolitan Ave, Brooklyn, NY 11249",
    resLink: "https://nitehawkcinema.com"
  },
  {
    neighborhood: "williamsburg",
    category: "activity",
    title: "Have Fun at Madame Morbid’s Trolley Tours",
    lat: 40.7181730960764,
    lng: -73.9554612019798,
    address: "N. 9th and, Driggs Ave, Brooklyn, NY 11211",
    resLink: "https://www.madamemorbid.com"
  },
  {
    neighborhood: "williamsburg",
    category: "activity",
    title: "Unearth Old New York at the City Reliquary",
    lat: 40.7139973333772,
    lng: -73.9557936731447,
    address: "370 Metropolitan Ave, Brooklyn, NY 11211",
    resLink: "https://www.cityreliquary.org"
  },
  {
    neighborhood: "williamsburg",
    category: "activity",
    title: "Visit the Brooklyn Art Library",
    lat: 40.7174594640039,
    lng: -73.9509996730507,
    address: "28 Frost St Williamsburg, NY 11211",
    resLink: "https://brooklynartlibrary.org"
  },
  {
    neighborhood: "williamsburg",
    category: "activity",
    title: "Shop at Desert Island",
    lat: 40.7139141690697,
    lng: -73.950831815249,
    address: "540 Metropolitan Ave, Brooklyn, NY 11211",
    resLink: "https://www.desertislandbrooklyn.com"
  },
  {
    neighborhood: "williamsburg",
    category: "activity",
    title: "Celebrate Diversity at the Williamsburg Art and Historical Center",
    lat: 40.7105660488076,
    lng: -73.963643261277,
    address: "135 Broadway, Brooklyn, NY 11211",
    resLink: "https://www.wahcenter.net"
  },
  {
    neighborhood: "williamsburg",
    category: "activity",
    title: "Tour at the Brooklyn Brewery",
    lat: 40.721795004188,
    lng: -73.9577622459342,
    address: "79 N 11th St, Brooklyn, NY 11249",
    resLink: "https://brooklynbrewery.com"
  },
  {
    neighborhood: "williamsburg",
    category: "activity",
    title: "SPARE SOME TIME AT BROOKLYN BOWL",
    lat: 40.7219849538686,
    lng: -73.9574242170985,
    address: "61 Wythe Ave, Brooklyn, NY 11211",
    resLink: "https://www.brooklynbowl.com/food"
  },
  {
    neighborhood: "williamsburg",
    category: "activity",
    title: "Shop at the Brooklyn Flea",
    lat: 40.7026062005588,
    lng: -73.9877647043801,
    address: "80 Pearl St, Brooklyn, NY 11201",
    resLink: "https://brooklynflea.com"
  },
  {
    neighborhood: "williamsburg",
    category: "bar",
    title: "BARCADE",
    lat: 40.712075747755,
    lng: -73.9510561002443,
    address: "388 Union Ave, Brooklyn, NY 11211",
    resLink: "https://barcadebrooklyn.com"
  },
  {
    neighborhood: "williamsburg",
    category: "bar",
    title: "RADEGAST HALL & BIERGARTEN",
    lat: 40.7166531811627,
    lng: -73.9614816001461,
    address: "113 N 3rd St, Brooklyn, NY 11249",
    resLink: "https://radegasthall.com/menus/"
  },
  {
    neighborhood: "williamsburg",
    category: "bar",
    title: "The Commodore",
    lat: 40.713994333381,
    lng: -73.9559046305916,
    address: "366 Metropolitan Ave, Brooklyn, NY 11211",
    resLink: "https://www.thecommodorebrooklyn.com"
  },
  {
    neighborhood: "williamsburg",
    category: "bar",
    title: "Pokito",
    lat: 40.7117349663317,
    lng: -73.9618136305917,
    address: "155 S 4th St, Brooklyn, NY 11211",
    resLink: "https://www.pokito.nyc"
  },
  {
    neighborhood: "williamsburg",
    category: "bar",
    title: "Fresh Kills",
    lat: 40.714721913028,
    lng: -73.9615888001466,
    address: "161 Grand St, Brooklyn, NY 11249",
    resLink: "http://freshkillsbar.com"
  },
  {
    neighborhood: "williamsburg",
    category: "bar",
    title: "Night of Joy",
    lat: 40.7170574383235,
    lng: -73.9499705729203,
    address: "667 Lorimer St, Brooklyn, NY 11211",
    resLink: "http://nightofjoybar.com"
  },
  {
    neighborhood: "williamsburg",
    category: "bar",
    title: "Sauced",
    lat: 40.7126964380517,
    lng: -73.962380061277,
    address: "331 Bedford Ave, Brooklyn, NY 11211",
    resLink: "https://www.saucedbklyn.com"
  },
  {
    neighborhood: "williamsburg",
    category: "bar",
    title: "The Four Horsemen",
    lat: 40.7130827761413,
    lng: -73.957353788263,
    address: "295 Grand St, Brooklyn, NY 11211",
    resLink: "https://www.fourhorsemenbk.com"
  },
  {
    neighborhood: "williamsburg",
    category: "bar",
    title: "Maison Premiere",
    lat: 40.7143256043028,
    lng: -73.9616002287421,
    address: "298 Bedford Ave, Brooklyn, NY 11249",
    resLink: "https://maisonpremiere.com"
  },
  {
    neighborhood: "williamsburg",
    category: "bar",
    title: "Westlight",
    lat: 40.722353897437,
    lng: -73.9565288729203,
    address: "111 N 12th St, Brooklyn, NY 11249",
    resLink: "https://www.westlightnyc.com/reservations/"
  },
  {
    neighborhood: "williamsburg",
    category: "dessert",
    title: "Dun-Well Doughnuts",
    lat: 40.707502842103,
    lng: -73.9403072170988,
    address: "222 Montrose Ave, Brooklyn, NY 11206",
    resLink: "https://www.dunwelldoughnuts.com"
  },
  {
    neighborhood: "williamsburg",
    category: "dessert",
    title: "Van Leeuwen Artisan Ice Cream",
    lat: 40.7183962476192,
    lng: -73.9618349801614,
    address: "204 Wythe Ave, Brooklyn, NY 11249",
    resLink: "https://vanleeuwenicecream.com/scoop-shops/?"
  },
  {
    neighborhood: "williamsburg",
    category: "dessert",
    title: "Pies 'n' Thighs",
    lat: 40.7112434394717,
    lng: -73.9613562440847,
    address: "166 S 4th St, Brooklyn, NY 11211",
    resLink: "https://piesnthighs.com"
  },
  {
    neighborhood: "williamsburg",
    category: "dessert",
    title: "Traif",
    lat: 40.7106454726631,
    lng: -73.9590184594274,
    address: "229 S 4th St, Brooklyn, NY 11211",
    resLink: "https://traifny.com"
  },
  {
    neighborhood: "williamsburg",
    category: "dessert",
    title: "Milk Bar",
    lat: 40.7139860367914,
    lng: -73.9554892305917,
    address: "382 Metropolitan Ave, Brooklyn, NY 11211",
    resLink: "https://milkbarstore.com"
  },
  {
    neighborhood: "williamsburg",
    category: "dessert",
    title: "Fortunato Brothers",
    lat: 40.7137456758983,
    lng: -73.946175901756,
    address: "289 Manhattan Ave, Brooklyn, NY 11211",
    resLink: "https://www.fortunatobrothers.com"
  },
  {
    neighborhood: "williamsburg",
    category: "dessert",
    title: "Martha's Country Bakery",
    lat: 40.7182504206288,
    lng: -73.9575592217553,
    address: "175 Bedford Ave, Brooklyn, NY 11211",
    resLink: "https://marthascountrybakery.com"
  },
  {
    neighborhood: "williamsburg",
    category: "dessert",
    title: "The Meatball Shop",
    lat: 40.7182529072984,
    lng: -73.9575060117578,
    address: "170 Bedford Ave, Brooklyn, NY 11249",
    resLink: "https://www.themeatballshop.com"
  },
  {
    neighborhood: "williamsburg",
    category: "dessert",
    title: "Gelateria Gentile",
    lat: 40.7162215363618,
    lng: -73.9638367199459,
    address: "253 Wythe Ave, Brooklyn, NY 11249",
    resLink: "https://www.gelateriagentile.com/en/"
  },
  {
    neighborhood: "williamsburg",
    category: "dessert",
    title: "Bakeri",
    lat: 40.7200420937608,
    lng: -73.9600978371502,
    address: "150 Wythe Ave, Brooklyn, NY 11211",
    resLink: "https://www.bakeribrooklyn.com"
  },
  {
    neighborhood: "harlem",
    category: "restaurant",
    title: "Dinosaur Bar-B-Que",
    lat: 40.8180979,
    lng: -73.9630334,
    address: "700 W 125th St, New York, NY 10027",
    resLink: "https://www.dinosaurbarbque.com/harlem/"
  },
  {
    neighborhood: "harlem",
    category: "restaurant",
    title: "Red Rooster",
    lat: 40.8081052,
    lng: -73.9469579,
    address: "310 Lenox Ave, New York, NY 10027",
    resLink: "https://www.redroosterharlem.com/reservations"
  },
  {
    neighborhood: "harlem",
    category: "restaurant",
    title: "Lolo's Seafood Shack",
    lat: 40.8053689315718,
    lng: -73.9559727920634,
    address: "303 W 116th St, New York, NY 10026",
    resLink: "https://lolosseafoodshack.com/"
  },
  {
    neighborhood: "harlem",
    category: "restaurant",
    title: "Abyssinia Ethiopian Restaurant",
    lat: 40.8162968913718,
    lng: -73.9460816462433,
    address: "268 W 135th St, New York, NY 10030",
    resLink: "http://www.abyssinianyc.com/"
  },
  {
    neighborhood: "harlem",
    category: "restaurant",
    title: "The Edge",
    lat: 40.8200552103504,
    lng: -73.9460294968845,
    address: "101 Edgecombe Ave, New York, NY 10030",
    resLink: "http://www.theedgeharlem.com/"
  },
  {
    neighborhood: "harlem",
    category: "restaurant",
    title: "La Salle Dumpling Room",
    lat: 40.8142232582681,
    lng: -73.9597900867195,
    address: "3141 Broadway, New York, NY 10027",
    resLink: "https://www.yelp.com/biz/la-salle-dumpling-room-new-york"
  },
  {
    neighborhood: "harlem",
    category: "restaurant",
    title: "Jacob Soul Food Restaurant",
    lat: 40.8103786650981,
    lng: -73.9440566885715,
    address: "373 Malcolm X Blvd, New York, NY 10027",
    resLink: "http://www.jacobrestaurant.com/"
  },
  {
    neighborhood: "harlem",
    category: "restaurant",
    title: "Harlem Shake",
    lat: 40.8072805160218,
    lng: -73.9463270732277,
    address: "100 W 124th St, New York, NY 10027",
    resLink: "http://www.harlemshakenyc.com/"
  },
  {
    neighborhood: "harlem",
    category: "restaurant",
    title: "Silvana",
    lat: 40.8046123440114,
    lng: -73.955837571376,
    address: "300 W 116th St, New York, NY 10026",
    resLink: "http://silvana-nyc.com/"
  },
  {
    neighborhood: "harlem",
    category: "restaurant",
    title: "Maison Harlem",
    lat: 40.8123385021014,
    lng: -73.9517132462434,
    address: "341 St Nicholas Ave, New York, NY 10027",
    resLink: "https://www.maisonharlem.com/"
  },
  {
    neighborhood: "harlem",
    category: "activity",
    title: "Gospel Brunch at Sylvia's",
    lat: 40.8086445,
    lng: -73.9466677,
    address: "328 Malcolm X Blvd, New York, NY 10027",
    resLink: "http://www.sylviasrestaurant.com/"
  },
  {
    neighborhood: "harlem",
    category: "activity",
    title: "Intimate speakeasy with smokin' hot jazz and blues at Room 623",
    lat: 40.8069481201509,
    lng: -73.9528182042076,
    address: "271 W 119th St, New York, NY 10026",
    resLink: "http://room623.com/"
  },
  {
    neighborhood: "harlem",
    category: "activity",
    title:
      "American Legion Post #398 with cheap booze and soulful jazz and blues",
    lat: 40.8141256040446,
    lng: -73.9467736865653,
    address: "248 W 132nd St, New York, NY 10027",
    resLink:
      "https://www.harlemonestop.com/organization/112/american-legion-post-398"
  },
  {
    neighborhood: "harlem",
    category: "activity",
    title: "Jazz at reborn classic nightclub Minton's Playhouse",
    lat: 40.8051157492173,
    lng: -73.9523015423267,
    address: "206 W 118th St, New York, NY 10026",
    resLink: "https://mintonsharlem.com/calendar/"
  },
  {
    neighborhood: "harlem",
    category: "activity",
    title: "Event at the Apollo Theater",
    lat: 40.8101966289768,
    lng: -73.950050637499,
    address: "253 W 125th St, New York, NY 10027",
    resLink: "https://www.apollotheater.org/"
  },
  {
    neighborhood: "harlem",
    category: "activity",
    title: "Live RnB and Soul at Ginny's Supper Club",
    lat: 40.8083262787811,
    lng: -73.9447481355816,
    address: "310 Malcolm X Blvd, New York, NY 10027",
    resLink: "https://www.ginnyssupperclub.com/"
  },
  {
    neighborhood: "harlem",
    category: "activity",
    title: "World class Jazz at Smoke",
    lat: 40.8013050020727,
    lng: -73.9681598382902,
    address: "2751 Broadway, New York, NY 10025",
    resLink: "https://www.smokejazz.com/"
  },
  {
    neighborhood: "harlem",
    category: "activity",
    title: "Visit the Studio Museum in Harlem",
    lat: 40.8090654789519,
    lng: -73.947563853975,
    address: "144 W 125th St, New York, NY 10027",
    resLink: "https://www.studiomuseum.org/"
  },
  {
    neighborhood: "harlem",
    category: "activity",
    title: "Experience live Gospel at Abyssinian Baptist Church",
    lat: 40.8169175481932,
    lng: -73.9414702710751,
    address: "132 W 138th St, New York, NY 10030",
    resLink: "https://www.abyssinian.org/"
  },
  {
    neighborhood: "harlem",
    category: "activity",
    title: "Hike through Morningside Park",
    lat: 40.8062823231374,
    lng: -73.9584639999108,
    address: "Morningside Dr, New York, NY 10026",
    resLink: "https://www.nycgovparks.org/parks/morningside-park/"
  },
  {
    neighborhood: "harlem",
    category: "bar",
    title: "At the Wallace",
    lat: 40.8289172782626,
    lng: -73.9484894882657,
    address: "3612 Broadway, New York, NY 10031",
    resLink: "http://www.atthewallace.com/"
  },
  {
    neighborhood: "harlem",
    category: "bar",
    title: "Shrine World Music Venue",
    lat: 40.8145180969309,
    lng: -73.9441484612792,
    address: "2271 Adam Clayton Powell Jr Blvd, New York, NY 10030",
    resLink: "http://www.shrinenyc.com/food.php"
  },
  {
    neighborhood: "harlem",
    category: "bar",
    title: "Harlem Nights Bar",
    lat: 40.8173848486618,
    lng: -73.9420302882658,
    address: "2361 Adam Clayton Powell Jr Blvd, New York, NY 10030",
    resLink: "http://www.harlemnights.nyc/"
  },
  {
    neighborhood: "harlem",
    category: "bar",
    title: "American Legion Post 398",
    lat: 40.8141634181945,
    lng: -73.9466859999107,
    address: "248 W 132nd St, New York, NY 10027",
    resLink:
      "https://www.harlemonestop.com/organization/112/american-legion-post-398"
  },
  {
    neighborhood: "harlem",
    category: "bar",
    title: "Uptown Burboun",
    lat: 40.8296106585203,
    lng: -73.9486066729234,
    address: "3631 Broadway, New York, NY 10031",
    resLink: "http://facebook.com/UptownBourbon"
  },
  {
    neighborhood: "harlem",
    category: "bar",
    title: "Corner Social",
    lat: 40.8088242707215,
    lng: -73.9451799440885,
    address: "321 Malcolm X Blvd, New York, NY 10027",
    resLink: "https://cornersocialnyc.com/menus/"
  },
  {
    neighborhood: "harlem",
    category: "bar",
    title: "Sugar Monk",
    lat: 40.8091267140871,
    lng: -73.9517642459372,
    address: "2292 Frederick Douglass Blvd, New York, NY 10027",
    resLink: "http://sugarmonklounge.com/"
  },
  {
    neighborhood: "harlem",
    category: "bar",
    title: "Harlem Public",
    lat: 40.8289524054689,
    lng: -73.9485174612787,
    address: "3612 Broadway, New York, NY 10031",
    resLink: "https://www.harlempublic.com/menus"
  },
  {
    neighborhood: "harlem",
    category: "bar",
    title: "Arts and Crafts Beer Parlor",
    lat: 40.8067633798608,
    lng: -73.9610715747727,
    address: "1135 Amsterdam Ave, New York, NY 10025",
    resLink: "http://www.artsandcraftsbarnyc.com/"
  },
  {
    neighborhood: "harlem",
    category: "bar",
    title: "Angel of Harlem",
    lat: 40.8081874722023,
    lng: -73.9523820864174,
    address: "2272 Frederick Douglass Blvd, New York, NY 10027",
    resLink: "http://www.angelofharlemnyc.com/"
  },
  {
    neighborhood: "harlem",
    category: "dessert",
    title: "Sugar Hill Creamery",
    lat: 40.8042716142581,
    lng: -73.9479234766215,
    address: "184 Malcolm X Blvd, New York, NY 10026",
    resLink: "http://www.sugarhillcreamery.com/"
  },
  {
    neighborhood: "harlem",
    category: "dessert",
    title: "Levain Bakery",
    lat: 40.8052816105504,
    lng: -73.9551947305951,
    address: "2167 Frederick Douglass Blvd, New York, NY 10026",
    resLink: "http://www.levainbakery.com/"
  },
  {
    neighborhood: "harlem",
    category: "dessert",
    title: "Insomnia Cookies",
    lat: 40.8037563462145,
    lng: -73.9638669017596,
    address: "1028 Amsterdam Ave, New York, NY 10025",
    resLink: "https://insomniacookies.com/goto/store/1068"
  },
  {
    neighborhood: "harlem",
    category: "dessert",
    title: "Double Dutch Espresso",
    lat: 40.8060993075484,
    lng: -73.954059730595,
    address: "2194 Frederick Douglass Blvd, New York, NY 10026",
    resLink: "http://www.doubledutchespresso.com/"
  },
  {
    neighborhood: "harlem",
    category: "dessert",
    title: "Hungarian Pastry Shop",
    lat: 40.8038166946901,
    lng: -73.9636504864175,
    address: "1030 Amsterdam Ave, New York, NY 10025",
    resLink:
      "https://www.facebook.com/Hungarian-Pastry-Shop-NYC-483854171661904/"
  },
  {
    neighborhood: "harlem",
    category: "dessert",
    title: "Tres Leches Cafe",
    lat: 40.7937778977129,
    lng: -73.9378415594309,
    address: "356 E 112th St, New York, NY 10029",
    resLink: "http://places.singleplatform.com/tres-leches-cafe/menu?ref=google"
  },
  {
    neighborhood: "harlem",
    category: "dessert",
    title: "Dulceria",
    lat: 40.8068314587977,
    lng: -73.9533100575819,
    address: "2220 Frederick Douglass Blvd, New York, NY 10026",
    resLink: "https://newyorkchileanfood.com/"
  },
  {
    neighborhood: "harlem",
    category: "dessert",
    title: "Lee Lee's Baked Goods",
    lat: 40.8058816614711,
    lng: -73.9539976594306,
    address: "283 W 118th St, New York, NY 10026",
    resLink: "https://www.leeleesrugelach.com/"
  },
  {
    neighborhood: "harlem",
    category: "dessert",
    title: "MOJO Artisanal Mousse Bar",
    lat: 40.7886364640378,
    lng: -73.9486662305956,
    address: "177 E 100th St, New York, NY 10029",
    resLink: "http://mojodesserts.com/"
  },
  {
    neighborhood: "harlem",
    category: "dessert",
    title: "Sugar Hill Cafe",
    lat: 40.82433217851,
    lng: -73.945557186417,
    address: "410 W 145th St, New York, NY 10031",
    resLink: "http://sugarhillcafe.com/"
  }
];

// evan added 121922 4:33 PM
data.forEach((venue) => {
  if (!venue.imageUrl) venue.imageUrl = "";
  venue.imageUrl = "https://nyght-seeds.s3.amazonaws.com/images/"
    .concat(
      venue.neighborhood,
      "/",
      venue.category,
      "/",
      venue.title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/gm, "")
    )
    .concat(".jpg");
});

const insertSeeds = () => {
  console.log("Resetting db and seeding users...");

  Venue.collection
    .drop()
    .then(() => Venue.insertMany(data))
    .then(() => {
      console.log("Done!");
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });
};
