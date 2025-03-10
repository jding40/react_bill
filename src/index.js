import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import sum from "@/test";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { Provider } from "react-redux";
import store from "@/store";

console.log(sum(1, 4));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
