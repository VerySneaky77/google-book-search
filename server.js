const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");

// Routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
