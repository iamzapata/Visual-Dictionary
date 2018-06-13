import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "Components/App/";

ReactDOM.render(
  <Provider store={store}>
    <App header="Visual Dictionary" />
  </Provider>,
  document.getElementById("app-root")
);
