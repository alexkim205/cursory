import React from "react";
import PropTypes from "prop-types"
import { compose } from "redux";

import { withDashboardLayout } from "../../components/Layouts";

class TagsPage extends React.Component {
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
)(TagsPage);

export { connectedComponent as TagsPage };