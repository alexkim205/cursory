import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { history } from "./_helpers";
import { alertActions } from "./_actions";

const Home = props => <h1>Home</h1>;
const Test = props => <h1>Test</h1>;

class App extends React.Component {
  static propTypes = {
    // dispatch: PropTypes.dsa
  }

  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/test" component={Test} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };

export default App;
