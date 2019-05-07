import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {editorActions} from '../_actions';
import {CustomEditor} from '../shared_components/Editor';
// import {CustomMediumEditor} from '../shared_components';

class EditorPage extends React.Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    discard: PropTypes.func.isRequired,
  };

  state = {
    text: '',
  };

  handleChange = (text) => {
    this.setState({text});
  };

  render() {
    // const {save, discard} = this.props;

    return (
        <React.Fragment>
          <CustomEditor/>
          {/*<CustomMediumEditor*/}
              {/*tag={'div'}*/}
              {/*text={this.state.text}*/}
              {/*options={options}*/}
              {/*onChange={this.handleChange}/>*/}
          {/*<button onClick={() => save(1)}>*/}
          {/*Save Entry*/}
          {/*</button>*/}
          {/*<button onClick={() => discard(1)}>*/}
          {/*Discard Entry*/}
          {/*</button>*/}
        </React.Fragment>
    );
  }
}

// function mapStateToProps(state) => {

// }

const mapDispatchToProps = {
  save: (entry_id) => editorActions.save(entry_id),
  discard: (entry_id) => editorActions.discard(entry_id),
};

const connectedEditorPage = connect(
    null,
    mapDispatchToProps,
)(EditorPage);

export {connectedEditorPage as EditorPage};
