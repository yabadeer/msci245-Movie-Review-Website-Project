import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Home from '../Home';
import PrivateRoute from '../Navigation/PrivateRoute.js';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }

  componentDidMount() {
    //
  }


  componentWillUnmount() {
    this.listener();
  }


  render() {
    return (
<<<<<<< HEAD
      <Router>
        <div>
          <PrivateRoute exact path="/" component={Home} />
        </div>
      </Router>
=======
	  <Router>
	    <div>
        <PrivateRoute exact path="/" component={Home}/>
	    </div>
	  </Router>
>>>>>>> e067bf0c72ce07d9d037f53882f8d9ce8a91de13
    );
  }
}

export default App;