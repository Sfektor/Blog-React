// Импорты react
import React from "react";
import ReactDOM from "react-dom/client";
// Внутринние компоненты
import App from "./components/app/app";
// Импорты redux
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
