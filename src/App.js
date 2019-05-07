import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Router, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';

import {history} from './_helpers';
import {Header, Footer} from './shared_components';
import {RootWrapper} from './App.style';
import {EditorPage} from './EditorPage';

const Home = () => <h1>Home</h1>;
const Test = () => <h1>Test</h1>;

class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {

    return (
        <RootWrapper>
          <Router history={history}>
            {/*<Header/>*/}
            <React.Fragment>
              <Route exact path="/" component={Home}/>
              <Route path="/editor" component={EditorPage}/>
              <Route path="/test" component={Test}/>
            </React.Fragment>
            {/*<Footer/>*/}
          </Router>
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
        </RootWrapper>
    );
  }
}

// function mapStateToProps(state) {
//   return {};
// }

export default connect()(App);
