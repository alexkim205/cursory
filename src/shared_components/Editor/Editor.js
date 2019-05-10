import React from 'react';
import PropTypes from 'prop-types';

// Slate Main
import {Editor} from 'slate-react';
import {Value} from 'slate';
// Slate plugins
import CollapseOnEscape from 'slate-collapse-on-escape';
import {MarkdownShortcutPlugin, KeyboardPlugin, RenderPlugin} from './plugins';
import {renderBlockButton, renderMarkButton} from './plugins';

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
];

class CustomEditor extends React.Component {

  componentDidMount() {

  }

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
          {this.editor &&
          <Toolbar>
            <Button onMouseDown={this.onClickImage}>
              <Icon>image</Icon>
            </Button>
            {renderMarkButton(this.editor, 'bold', 'bold')}
            {renderMarkButton(this.editor, 'italic', 'italic')}
            {renderMarkButton(this.editor, 'underlined', 'underline')}
            {renderMarkButton(this.editor, 'strikethrough', 'strikethrough')}
            {renderMarkButton(this.editor, 'link', 'link')}
            {renderMarkButton(this.editor, 'code', 'code')}
            {renderMarkButton(this.editor, 'mark', 'highlighter')}
            {renderBlockButton(this.editor, 'heading-one', 'heading')}
            {renderBlockButton(this.editor, 'heading-two', 'heading')}
            {renderBlockButton(this.editor, 'block-quote', 'quote-left')}
            {renderBlockButton(this.editor, 'block-code', 'angle-double-right')}
            {renderBlockButton(this.editor, 'ordered-list', 'list-ol')}
            {renderBlockButton(this.editor, 'unordered-list', 'list-ul')}
            {/*{this.renderBlockButton('todo-list', 'format_list_bulleted')}*/}
          </Toolbar>
          }
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
