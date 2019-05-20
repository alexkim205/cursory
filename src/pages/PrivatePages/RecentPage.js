import React from "react";
import PropTypes from "prop-types"
import { compose } from "redux";

import { withDashboardLayout } from "../../components/Layouts";

class RecentPage extends React.Component {
    static propTypes = {
        // aProp: PropTypes.object.isRequired,
    }
    state = {}
    render() {
        return (
            <React.Fragment>
            
            </React.Fragment>
        )
    }
}

const connectedComponent = compose(
  withDashboardLayout
)(RecentPage);

export { connectedComponent as RecentPage };