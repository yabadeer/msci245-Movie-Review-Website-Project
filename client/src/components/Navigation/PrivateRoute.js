import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from "../Home";
import Search from "../Search";
import MyPage from "../MyPage";
import history from "./history";
import Reviews from "../Reviews";
import { Landing } from "../Landing";

export default function PrivateRoute(
  {
    //authenticated,
    //...rest
  }
) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/Search" exact component={Search} />
        <Route path="/Reviews" exact component={Reviews} />
        <Route path="/MyPage" exact component={MyPage} />
      </Switch>
    </Router>
  );
}
