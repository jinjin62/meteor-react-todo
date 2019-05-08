import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import "./main.html";
import App from "../imports/ui/containers/App/index.js";
import * as serviceWorker from "./serviceWorker";
import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
  ReactDOM.render(<App />, document.getElementById("root"));

  serviceWorker.unregister();
});
