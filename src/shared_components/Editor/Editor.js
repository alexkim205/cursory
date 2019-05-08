import React from 'react';
import PropTypes from 'prop-types';

// Slate Main
import {Editor} from 'slate-react';
import {Value} from 'slate';
// Slate plugins
import CollapseOnEscape from 'slate-collapse-on-escape';
import {MarkdownShortcutPlugin, KeyboardPlugin, RenderPlugin} from './plugins';
import Lists from "@convertkit/slate-lists"


import {processfile} from '../../_helpers/process-image';

import {Button, Icon, Toolbar} from './Editor.style';
import {initialValue} from './initial-value';
import {schema} from './schema';

// https://docs.slatejs.org/guides/commands-and-queries

const plugins = [
  CollapseOnEscape(),
  MarkdownShortcutPlugin(),
  KeyboardPlugin(),
  RenderPlugin(),
  // Lists({
  //   blocks: {
  //     ordered_list: "ordered-list",
  //     unordered_list: "unordered-list",
  //     list_item: "list-item",
  //   },
  // })
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
          {/*<Toolbar>*/}
          {/*<Button onMouseDown={this.onClickImage}>*/}
          {/*<Icon>image</Icon>*/}
          {/*</Button>*/}
          {/*{this.renderMarkButton('bold', 'format_bold')}*/}
          {/*{this.renderMarkButton('italic', 'format_italic')}*/}
          {/*{this.renderMarkButton('underlined', 'format_underlined')}*/}
          {/*{this.renderMarkButton('strikethrough', 'format_strikethrough')}*/}
          {/*{this.renderMarkButton('code', 'code')}*/}
          {/*{this.renderBlockButton('heading-one', 'looks_one')}*/}
          {/*{this.renderBlockButton('heading-two', 'looks_two')}*/}
          {/*{this.renderBlockButton('block-quote', 'format_quote')}*/}
          {/*{this.renderBlockButton('numbered-list', 'format_list_numbered')}*/}
          {/*{this.renderBlockButton('bulleted-list', 'format_list_bulleted')}*/}
          {/*</Toolbar>*/}
          <Editor
              spellCheck={false}
              ref={this.ref}
              value={this.state.value}
              onChange={this.onChange}
              plugins={plugins}
          />
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

}

export {CustomEditor};
