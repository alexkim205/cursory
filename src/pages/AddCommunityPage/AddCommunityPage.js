import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';

import withAuthorization from '../../components/Session/withAuthorization';
import {isUser} from '../../components/Session';
import {withFirebase} from '../../components/Firebase';
import {ROUTES} from '../../_constants';
import {FullWrapper} from '../../components';

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from 'react-live';
import { DragDropContext } from 'react-beautiful-dnd';
import {FloatingWidget} from './FloatingWidget';


const INITIAL_STATE = {
  name: '',
  description: '',
  code: '<React.Fragment></React.Fragment>',
  error: null,
};

class AddCommunityPage extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {...INITIAL_STATE};

  render() {
    const {name, description, code} = this.state;

    return (
        <FullWrapper>
          <h1>Create a Community</h1>
          <input
              name="name"
              value={name}
              onChange={this.onChange}
              type="text"
              placeholder="Name your community"
          />
          <input
              name="description"
              value={description}
              onChange={this.onChange}
              type="text"
              placeholder="Who's it for?"
          />

          <LiveProvider code={code}>
            <LiveEditor/>
            <LiveError/>
            <LivePreview/>
          </LiveProvider>

          {/*<FloatingWidget/>*/}

        </FullWrapper>
    );
  }
}

const connectedPage = compose(
    withAuthorization(isUser),
    withRouter,
    withFirebase,
)(AddCommunityPage);

export {connectedPage as AddCommunityPage};
