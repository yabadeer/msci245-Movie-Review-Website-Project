import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Container, Grid } from "@material-ui/core";
import image from "./landingpage.jpg";
import history from "../Navigation/history";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function MyAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Movies
          </Typography>
          <Button color="inherit" onClick={() => history.push("/")}>
            Landing
          </Button>
          <Button color="inherit" onClick={() => history.push("/Search")}>
            Search
          </Button>
          <Button color="inherit" onClick={() => history.push("/Reviews")}>
            Reviews
          </Button>
          <Button color="inherit" onClick={() => history.push("/MyPage")}>
            Movie Trailers
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export const Landing = () => {
  return (
    <div>
      <MyAppBar />

      <Container>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Typography
            style={{ textAlign: "center", marginTop: 30 }}
            variant="h5"
          >
            My Movies App
          </Typography>
          <Typography style={{ textAlign: "center" }} variant="h6">
            Search movies with title, director, or actor or submit a movie
            review
          </Typography>
        </Grid>
        <Grid item style={{ alignContent: "center" }}>
          <img
            src={image}
            height={500}
            width={"100%"}
            style={{ alignSelf: "center" }}
          />
        </Grid>
      </Container>
    </div>
  );
};
