import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class LandingPage extends React.Component {
  static propTypes = {

  };

  render() {
    // const {save, discard} = this.props;

    return (
        <React.Fragment>
          <h1>Account Page</h1>
        </React.Fragment>
    );
  }
}

// function mapStateToProps(state) => {

// }

// const mapDispatchToProps = {
//   save: (entry_id) => editorActions.save(entry_id),
//   discard: (entry_id) => editorActions.discard(entry_id),
// };

const connectedLandingPage = connect(
    null,
    // mapDispatchToProps,
)(LandingPage);

export {LandingPage};
