import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";
//File renders the information from the Application component to the DOM to be read by client

ReactDOM.render(<Application/>, document.getElementById("root"));
