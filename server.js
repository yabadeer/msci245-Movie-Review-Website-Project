let mysql = require("mysql");
let config = require("./config.js");
const fetch = require("node-fetch");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const { response } = require("express");
const app = express();
const port = process.env.PORT || 5001;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "client/build")));

app.post("/api/loadUserSettings", (req, res) => {
  let connection = mysql.createConnection(config);
  let userID = req.body.userID;

  let sql = `SELECT mode FROM user WHERE userID = ?`;
  console.log(sql);
  let data = [userID];
  console.log(data);

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);
    //let obj = JSON.parse(string);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/getMovies", (req, res) => {
  let connection = mysql.createConnection(config);

  let sql = `SELECT * FROM movies`;
  let data = [];

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);
    res.send({ express: string });
  });
  connection.end();
});

app.post("/api/addReview", (req, res) => {
  let connection = mysql.createConnection(config);

  let sql = `INSERT INTO Review (userId, reviewTitle, reviewContent, reviewScore, movieId) VALUES (?, ?, ?, ?, ?);`;
  let data = [
    req.body.userId,
    req.body.reviewTitle,
    req.body.reviewContent,
    req.body.reviewScore,
    req.body.movieId,
  ];

  connection.query(sql, data, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
  });
  connection.end();
});

app.post("/api/search", (req, res) => {
  let connection = mysql.createConnection(config);

  let sql = `SELECT distinct movies.id, movies.name, CONCAT(directors.first_name, ' ', directors.last_name) as director, CONCAT(actors.first_name, ' ', actors.last_name) as actor FROM movies
  INNER JOIN movies_directors ON movies.id = movies_directors.movie_id
  INNER JOIN directors on movies_directors.director_id = directors.id
  INNER JOIN roles on movies.id = roles.movie_id
  INNER JOIN actors on roles.actor_id = actors.id`;

  let word = " WHERE";
  let part2 = "";

  if (req.body.title !== undefined) {
    word = " AND";
    part2 += word;
    part2 += ` movies.name = '${req.body.title}'`;
  }

  if (req.body.actor !== undefined) {
    word = " AND";
    part2 += word;
    part2 += ` CONCAT(actors.first_name, ' ', actors.last_name) = '${req.body.actor}'`;
  }

  if (req.body.director !== undefined) {
    word = " AND";
    part2 += word;
    part2 += ` CONCAT(directors.first_name, ' ', directors.last_name) = '${req.body.director}'`;
  }

  sql += part2;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    let string = JSON.stringify(results);
    res.send({ express: string });
  });

  connection.end();
});

app.post("/api/saveTrailerLink", (req, res) => {
  let connection = mysql.createConnection(config);

  let sql = `UPDATE movies SET trailer_link = '${req.body.trailerLink}' WHERE id = ${req.body.movieId};`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
  });
  connection.end();
});

// app.listen(port, () => console.log(`Listening on port ${port}`)); //for the dev version
app.listen(port, '172.31.31.77'); //for the deployed version, specify the IP address of the server
