import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../Home/index.js";

import PrivateRoute from "../Navigation/PrivateRoute.js";

const App = () => {
  return (
    <Router>
      <div>
        <PrivateRoute exact path="/" component={Home} />
      </div>
    </Router>
  );
};

export default App;
