import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {editorActions} from '../_actions';
import {CustomMediumEditor} from '../shared_components';

const options = {
  buttonLabels: 'fontawesome',
  spellcheck: false,
  targetBlank: true,
  disableDoubleReturn: true,
  toolbar: {
    /* These are the default options for the toolbar,
     if nothing is passed this is what is used */
    allowMultiParagraphSelection: true,
    buttons: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'anchor',
      'quote',
      'pre',
      'orderedlist',
      'unorderedlist',
      'h1',
      'h2',
      'h3'],
    diffLeft: 0,
    diffTop: -10,
    firstButtonClass: 'medium-editor-button-first',
    lastButtonClass: 'medium-editor-button-last',
    relativeContainer: null,
    standardizeSelectionStart: true,
    static: false,
    /* options which only apply when static is true */
    align: 'center',
    sticky: false,
    updateOnEmptySelection: false,
  },
  autoLink: true,
  imageDragging: true,
  anchorPreview: {
    /* These are the default options for anchor preview,
     if nothing is passed this is what it used */
    hideDelay: 500,
    previewValueSelector: 'a',
  },
  anchor: {
    /* These are the default options for anchor form,
     if nothing is passed this is what it used */
    customClassOption: null,
    customClassOptionText: 'Button',
    linkValidation: false,
    placeholderText: 'Paste or type a link',
    targetCheckbox: true,
    targetCheckboxText: 'Open in new window',
  },
  placeholder: {
    /* This example includes the default options for placeholder,
     if nothing is passed this is what it used */
    text: 'Type your text',
    hideOnClick: true,
  },
  paste: {
    /* This example includes the default options for paste,
     if nothing is passed this is what it used */
    forcePlainText: true,
    cleanPastedHTML: false,
    cleanReplacements: [],
    cleanAttrs: ['class', 'style', 'dir'],
    cleanTags: ['meta'],
    unwrapTags: [],
  },
  keyboardCommands: {
    /* This example includes the default options for keyboardCommands,
     if nothing is passed this is what it used */
    commands: [
      {
        command: 'bold',
        key: 'B',
        meta: true,
        shift: false,
        alt: false,
      },
      {
        command: 'italic',
        key: 'I',
        meta: true,
        shift: false,
        alt: false,
      },
      {
        command: 'underline',
        key: 'U',
        meta: true,
        shift: false,
        alt: false,
      },
    ],
  },
};

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
