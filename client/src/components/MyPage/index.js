import React, { Component, useState } from "react";

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { MovieSelection } from "../Reviews";
import { MyAppBar } from "../Landing";

const MyPage = () => {
//   const serverURL = "http://localhost:5001"; 
  const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3025"; 

  const [trailerLink, setTrailerLink] = useState();
  const [movieTitles, setMovieTitles] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();

  const saveTrailerLink = async () => {
    const url = serverURL + "/api/saveTrailerLink";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: selectedMovie.id,
        trailerLink: trailerLink,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  const callApiGetMovies = async () => {
    const url = serverURL + "/api/getMovies";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  React.useEffect(() => {
    callApiGetMovies().then((res) => {
      var parsed = JSON.parse(res.express);
      setMovieTitles(parsed);
    });
  }, []);

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
            <Typography style={{ marginTop: 30 }} align="center" variant="h5">
              Watch Movie Trailers
            </Typography>
            <Typography variant={"body1"} align="center">
              <React.Fragment>
                The purpose of this page is to watch movie trailers for the
                selected movie and also update the movie trailer's link. The app
                will save the movie trailer link in the database and prefill it
                next time you visit
              </React.Fragment>
            </Typography>
          </Grid>

          <Grid item>
            <MovieSelection
              movieTitles={movieTitles}
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
            />
          </Grid>
          {selectedMovie ? (
            <>
              <Grid item>
                <Box
                  sx={{
                    backgroundColor: "primary.dark",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                >
                  <iframe
                    width="420"
                    height="315"
                    src={selectedMovie.trailer_link}
                  ></iframe>
                </Box>
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Trailer Link"
                  value={trailerLink ?? selectedMovie.trailer_link}
                  onChange={(event) => {
                    setTrailerLink(event.target.value);
                  }}
                />
              </Grid>

              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={saveTrailerLink}
                >
                  Update Trailer Link
                </Button>
              </Grid>
            </>
          ) : null}
        </Grid>
      </Container>
    </>
  );
};

export default MyPage;
