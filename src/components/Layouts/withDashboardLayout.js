import React from "react";

import { Toolbar } from "../../App";

export const withDashboardLayout = Component => {
  class WithDashboardLayout extends React.Component {
    render() {
      return (
        <React.Fragment>
          <Toolbar />
          <Component {...this.props} />
        </React.Fragment>
      );
    }
  }

  return WithDashboardLayout;
};

export default withDashboardLayout;
