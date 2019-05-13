import React from 'react';
import PropTypes from 'prop-types';

// Slate Main
import {Editor} from 'slate-react';
import {Value} from 'slate';
// Slate plugins
import CollapseOnEscape from 'slate-collapse-on-escape';
import {
  MarkdownShortcutPlugin,
  KeyboardPlugin,
  RenderPlugin,
  ToolBarPlugin,
  MarginPlugin,
} from './plugins';
// import {renderBlockButton, renderMarkButton} from './plugins';

import {processfile} from '../../_helpers/process-image';

import {initialValue} from './initial-value';
import {schema} from './schema';
import {HelpButton} from './components';

// https://docs.slatejs.org/guides/commands-and-queries

const plugins = [
  MarginPlugin(),
  CollapseOnEscape(),
  MarkdownShortcutPlugin(),
  KeyboardPlugin(),
  RenderPlugin(),
  ToolBarPlugin(),
];

class CustomEditor extends React.Component {

  /**
   * Deserialize the initial editor value.
   *
   * @type {Object}
   */

  state = {
    value: initialValue,
  };

  /**
   * Store a reference to the `editor`.
   *
   * @param {Editor} editor
   */

  ref = editor => {
    this.editor = editor;
  };

  render() {

    return (
        <React.Fragment>
          <Editor
              spellCheck={false}
              ref={this.ref}
              value={this.state.value}
              onChange={this.onChange}
              className={'editor-container'}
              plugins={plugins}
              schema={schema}
              placeholder={'Type here to get started...'}
          />
          {this.editor &&
          <HelpButton editorRef={this.editor}/>
          }
        </React.Fragment>
    );
  }

  /**
   * On change, save the new `value`.
   *
   * @param {Editor} editor
   */

  onChange = ({value}) => {
    // Check to see if document changed before saving.
    if (value.document != this.state.value.document) {
      // Save the value to local storage
      const content = JSON.stringify(value.toJSON());
      // const content = Plain.serialize(value)
      localStorage.setItem('content', content);
    }

    this.setState({value});
  };

  // /**
  //  * On select (mouse up), tell toolbar to open.
  //  *
  //  * @param {Editor} editor
  //  */
  // onSelect = ({value}) => {
  //   const {selection} = value;
  //   const shouldOpen = selection.isExpanded && selection.isFocused;
  //   this.setState({toolbarShouldOpen: shouldOpen})
  // }

}

export {CustomEditor};
