import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {editorActions} from '../_actions';
import {CustomMediumEditor} from '../shared_components';

const options = {
  toolbar: {
    /* These are the default options for the toolbar,
     if nothing is passed this is what is used */
    allowMultiParagraphSelection: true,
    buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote'],
    diffLeft: 0,
    diffTop: -10,
    firstButtonClass: 'medium-editor-button-first',
    lastButtonClass: 'medium-editor-button-last',
    relativeContainer: null,
    standardizeSelectionStart: false,
    static: false,
    /* options which only apply when static is true */
    align: 'center',
    sticky: false,
    updateOnEmptySelection: false
  }
}

class EditorPage extends React.Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    discard: PropTypes.func.isRequired,
  };

  state = {
    text: 'Lorem ipsum my ass.',
  };

  handleChange = (text, medium) => {
    this.setState({text});
  };

  render() {
    const {save, discard} = this.props;

    return (
        <React.Fragment>
          <CustomMediumEditor
              tag={'div'}
              text={this.state.text}
              options={options}
              onChange={this.handleChange}/>
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
