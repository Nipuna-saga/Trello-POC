import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "reset-css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/landing-view";

import BoardDetail from "./components/board-detail-view";
import "./components/main.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/board/:id" component={BoardDetail} />
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
