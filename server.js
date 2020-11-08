require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

console.log(process.env.API_TOKEN);

const app = express();

app.use(morgan("dev"));

app.use(function validateBearerToken(req, res, next) {
  console.log("validate bearer token middleware");
  //move to the next middleware
  next();
});

function handleGetMovie(req, res) {
  res.send("MOVIES!!");
}

app.get("/movie", handleGetMovie);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
