import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  MenuItem,
  TextField,
  RadioGroup,
  Radio,
  Button,
  FormControlLabel,
  FormLabel
} from "@material-ui/core";

//Dev mode
//const serverURL = ""; //enable for dev mode

//Deployment mode instructions
const serverURL = "http://ov-research-4.uwaterloo.ca:3025"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number: 
//ssh to ov-research-4.uwaterloo.ca and run the following command: 
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";


const Review = () => {

  const movieTitles = ["Spider-Man", "Happy Gilmore", "Hacksaw Ridge", "Inception", "Saving Private Ryan"];

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

  const onSubmit = () => {
    resetStatusOnSubmit();

    if (enteredTitle === "") {
      setErrorMessage("Please enter your movie review title");
    } else if (enteredReview === "") {
      setErrorMessage("Please enter your movie review");
    } else if (selectedRating === "") {
      setErrorMessage("Please select the movie rating");
    } else {
      setSuccessMessage("Your movie review has been received!");
      setShowUserData(true);
    }
  };

  return (
    <>
      {successMessage ? (
        <p> {successMessage} </p>
      ) : null}

      {errorMessage ? <p>{errorMessage}</p> : null}

      {showUserData ? (
        <>
          <Typography variant="h5">{selectedMovie}</Typography>
          <Typography variant="h5">
            You gave {selectedMovie} {selectedRating} Stars
          </Typography>
          <Typography variant="h5">{enteredReview}</Typography>
        </>
      ) : null}

      <MovieSelection
        movieTitles={movieTitles}
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
      />
      <ReviewTitle
        enteredTitle={enteredTitle}
        setEnteredTitle={setEnteredTitle}
      />
      <ReviewBody
        enteredReview={enteredReview}
        setEnteredReview={setEnteredReview}
      />

      <ReviewRating
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
      />

      <Button variant="contained" color="secondary" onClick={onSubmit}>
        Submit Review!
      </Button>
    </>
  );
};



const MovieSelection = (props) => {
  const {movieTitles, selectedMovie, setSelectedMovie} = props;

  return (
    <FormControl>
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
              {movie}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

const ReviewTitle = (props) => {
  const {enteredTitle, setEnteredTitle} = props;

  return (
    <FormControl>
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
}

const ReviewBody = (props) => {
  const {enteredReview, setEnteredReview} = props;

  return (
    <FormControl>
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
}

const ReviewRating = (props) => {
  const {selectedRating, setSelectedRating} = props;
  const ratings = ["1", "2", "3", "4", "5"];

  return (
    <FormControl>
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
    type: 'dark',
    background: {
      default: "#000000"
    },
    primary: {
      main: "#52f1ff",
    },
    secondary: {
      main: "#b552f7",
    },
  },
});

const styles = theme => ({
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
    [theme.breakpoints.down('xs')]: {
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
  }
  
});


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0,
    }
  };

  componentDidMount() {
    //this.loadUserSettings();
  }


  loadUserSettings() {
    this.callApiLoadUserSettings()
      .then(res => {
        //console.log("loadUserSettings returned: ", res)
        var parsed = JSON.parse(res.express);
        console.log("loadUserSettings parsed: ", parsed[0].mode)
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
        userID: this.state.userID
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  }

  render() {
    const { classes } = this.props;

    const mainMessage = (
      <Grid
        container
        spacing={1}
        style={{ maxWidth: '25%', minHeight: "100vh" }}
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        className={classes.mainMessageContainer}
      >
        <Grid item>
          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="left"
          >
            <React.Fragment>Review a Movie!</React.Fragment>
          </Typography>
        </Grid>
        <Review />
      </Grid>
    );

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <Paper className={classes.paper}>{mainMessage}</Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
