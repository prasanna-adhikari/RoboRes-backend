const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
// //////////////////////////////////////////////////
const db = require("./database/db");
const register_route = require("./routes/registerRoute");
const itemsRoute = require("./routes/itemsRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const feedRoute = require("./routes/feedbackRoute");
const path = require("path");

//////////////////////////////////////////////////////
const app = express();
console.log("started");
//////////////////////////////////////////////////////////
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
////////////////////////////////////////////////////////
app.use("/pictures", express.static(path.join(__dirname, "pictures")));
app.use(register_route);
app.use(itemsRoute);
app.use(cartRoute);
app.use(orderRoute);
app.use(feedRoute);

app.listen(5000);
