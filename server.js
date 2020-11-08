require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const MOVIEDEX = require("./moviedex.json");

console.log(process.env.API_TOKEN);

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get("Authorization");
  console.log("validate bearer token middleware");
  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }
  next();
});

app.get("/movie", function handleGetMovie(req, res) {
  let response = MOVIEDEX;
  //filter by genre
  if (req.query.genre) {
    response = response.filter((movies) =>
      movies.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    );
  }
  //filter by country
  if (req.query.country) {
    response = response.filter((movies) =>
      movies.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }
  //filter by average vote
  if (req.query.avg_vote) {
    response = response.filter(
      (movies) => Number(movies.avg_vote) >= Number(req.query.avg_vote)
    );
  }
  res.json(response);
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
