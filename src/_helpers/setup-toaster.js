import { ToastContainer } from "react-toastify";
import React from "react";

export const renderToaster = () => (
  <ToastContainer
    position="bottom-center"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnVisibilityChange={false}
    draggable={false}
    pauseOnHover
  />
);
