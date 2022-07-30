import React, { Component, useState } from "react";

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { MyAppBar } from "../Landing";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Search = () => {
  //   const serverURL = "http://localhost:5001"; //enable for dev mode
  const serverURL =
    "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3025";

  const [title, setTitle] = useState();
  const [actor, setActor] = useState();
  const [director, setDirector] = useState();

  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();

  const search = async () => {
    const url = serverURL + "/api/search";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        actor: actor,
        director: director,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    var parsed = JSON.parse(body.express);
    console.log(body.express);

    setResults(parsed);
  };

  return (
    <>
      <MyAppBar />

      <Container>
        <Grid
          container
          spacing={3}
          style={{ minWidth: "100%" }}
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item>
            <Typography
              style={{ textAlign: "center", marginTop: 30 }}
              variant="h5"
            >
              Search Movies
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              id="standard-basic"
              label="Movie Title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              id="standard-basic"
              label="Actor Full Name"
              value={actor}
              onChange={(event) => {
                setActor(event.target.value);
              }}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              id="standard-basic"
              label="Director Full Name"
              value={director}
              onChange={(event) => {
                setDirector(event.target.value);
              }}
            />
          </Grid>

          <Grid item>
            <Button variant="contained" color="primary" onClick={search}>
              Search
            </Button>
          </Grid>
          <Grid item>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Movie Title</TableCell>
                    <TableCell align="right">Movie Director</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.director}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {results
              ? results.map((result) => {
                  return;
                })
              : null}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Search;
