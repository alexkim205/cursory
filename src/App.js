import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { history } from "./_helpers";
import { editorActions } from "./_actions";

const Home = () => <h1>Home</h1>;
const Test = () => <h1>Test</h1>;

class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      // this.props.dispatch(alertActions.clear());
    });
  }

  render() {
    const { dispatch } = this.props;
    console.log(dispatch)

    return (
      <React.Fragment>
        <button onClick={() => dispatch(editorActions.save(1))}>Save Entry</button>
        <button onClick={() => dispatch(editorActions.discard(1))}>
          Discard Entry
        </button>
        <Router history={history}>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/test" component={Test} />
          </div>
        </Router>
        <ToastContainer autoClose={2000} />
      </React.Fragment>
    );
  }
}

// function mapStateToProps(state) {
//   return {};
// }

export default connect()(App);
