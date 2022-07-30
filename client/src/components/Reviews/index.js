import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  MenuItem,
  TextField,
  RadioGroup,
  Radio,
  Button,
  FormControlLabel,
  FormLabel,
  Container,
} from "@material-ui/core";
import { MyAppBar } from "../Landing";

//Dev mode
// const serverURL = "http://localhost:5001"; //enable for dev mode

//Deployment mode instructions
const serverURL =
  "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3025";
//To find your port number:
//ssh to ov-research-4.uwaterloo.ca and run the following command:
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const Review = () => {
  const [movieTitles, setMovieTitles] = useState([]);

  const [userId, setUserId] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredReview, setEnteredReview] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [showUserData, setShowUserData] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const resetStatusOnSubmit = () => {
    setShowUserData(false);
    setSuccessMessage(null);
    setErrorMessage(null);
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

  const addReview = async () => {
    const url = serverURL + "/api/addReview";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: selectedMovie.id,
        userId: userId,
        reviewTitle: enteredTitle,
        reviewContent: enteredReview,
        reviewScore: selectedRating,
      }),
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

  const onSubmit = () => {
    resetStatusOnSubmit();

    if (enteredTitle === "") {
      setErrorMessage("Please enter your movie review title");
    } else if (enteredReview === "") {
      setErrorMessage("Please enter your movie review");
    } else if (selectedRating === "") {
      setErrorMessage("Please select the movie rating");
    } else {
      addReview();
      setSuccessMessage("Your movie review has been received!");
      setShowUserData(true);
    }
  };

  return (
    <>
      {successMessage ? <p> {successMessage} </p> : null}

      {errorMessage ? <p>{errorMessage}</p> : null}

      {showUserData ? (
        <>
          <Typography variant="h5">{selectedMovie.name}</Typography>
          <Typography variant="h5">
            You gave {selectedMovie.name} {selectedRating} Stars
          </Typography>
          <Typography variant="h5">{enteredReview}</Typography>
        </>
      ) : null}

      <Grid>
        <MovieSelection
          movieTitles={movieTitles}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      </Grid>

      <Grid>
        <ReviewTitle
          enteredTitle={enteredTitle}
          setEnteredTitle={setEnteredTitle}
        />
      </Grid>
      <Grid>
        <ReviewBody
          enteredReview={enteredReview}
          setEnteredReview={setEnteredReview}
        />
      </Grid>
      <Grid>
        <ReviewRating
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />
      </Grid>

      <Button variant="contained" color="primary" onClick={onSubmit}>
        Submit Review!
      </Button>
    </>
  );
};

export const MovieSelection = (props) => {
  const { movieTitles, selectedMovie, setSelectedMovie } = props;

  return (
    <FormControl style={{ marginTop: 30, width: "100%" }}>
      <InputLabel id="select-movie-title">Select a Movie</InputLabel>
      <Select
        labelId="select-movie-title"
        id="select-movie-title"
        value={selectedMovie ?? null}
        onChange={(event) => {
          setSelectedMovie(event.target.value);
        }}
      >
        {movieTitles.map((movie, key) => {
          return (
            <MenuItem value={movie} key={key}>
              {movie.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const ReviewTitle = (props) => {
  const { enteredTitle, setEnteredTitle } = props;

  return (
    <FormControl style={{ marginTop: 30, width: "100%" }}>
      <TextField
        id="standard-basic"
        label="Review Title"
        value={enteredTitle}
        onChange={(event) => {
          setEnteredTitle(event.target.value);
        }}
      />
    </FormControl>
  );
};

const ReviewBody = (props) => {
  const { enteredReview, setEnteredReview } = props;

  return (
    <FormControl style={{ marginTop: 30, width: "100%" }}>
      <TextField
        id="standard-multiline-flexible"
        label="Multiline Review"
        multiline
        value={enteredReview}
        inputProps={{ maxLength: 200 }}
        onChange={(event) => {
          setEnteredReview(event.target.value);
        }}
      />
    </FormControl>
  );
};

const ReviewRating = (props) => {
  const { selectedRating, setSelectedRating } = props;
  const ratings = ["1", "2", "3", "4", "5"];

  return (
    <FormControl style={{ marginTop: 30 }}>
      <FormLabel id="select-a-rating">Select a Rating</FormLabel>
      <RadioGroup
        row
        aria-labelledby="select-a-rating"
        name="radio-buttons-group"
        value={selectedRating}
        onChange={(event) => {
          setSelectedRating(event.target.value);
        }}
      >
        {ratings.map((rating, key) => {
          return (
            <FormControlLabel
              key={key}
              value={rating}
              control={<Radio />}
              label={rating}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

const fetch = require("node-fetch");

const opacityValue = 0.9;

const theme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#000000",
    },
    primary: {
      main: "#52f1ff",
    },
    secondary: {
      main: "#b552f7",
    },
  },
});

const styles = (theme) => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(30),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(8),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 200,
    paddingBottom: theme.spacing(4),
  },
});

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0,
    };
  }

  componentDidMount() {
    //this.loadUserSettings();
  }

  loadUserSettings() {
    this.callApiLoadUserSettings().then((res) => {
      //console.log("loadUserSettings returned: ", res)
      var parsed = JSON.parse(res.express);
      console.log("loadUserSettings parsed: ", parsed[0].mode);
      this.setState({ mode: parsed[0].mode });
    });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  };

  render() {
    const { classes } = this.props;

    const mainMessage = (
      <>
        <MyAppBar />
        <Container>
          <Grid
            container
            spacing={5}
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <Typography
              style={{ textAlign: "center", marginTop: 50 }}
              variant="h5"
            >
              Review a Movie!
            </Typography>
          </Grid>
          <Grid item spacing={5}>
            <Review />
          </Grid>
        </Container>
      </>
    );

    return <div className={classes.root}>{mainMessage}</div>;
  }
}

Reviews.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Reviews);
