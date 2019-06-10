import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./_helpers";
import FirebaseInstance, { FirebaseContext } from "./components/Firebase";

import "./_styles/main.scss";
import "./_styles/typography.scss";
import "./_styles/editor.scss";
import "react-toastify/dist/ReactToastify.css";

import { App } from "./App/App";

// Debug Log
if (process.env.NODE_ENV !== "production") {
  localStorage.setItem("debug", "writing-react:*");
}

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={FirebaseInstance}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root"),
);
