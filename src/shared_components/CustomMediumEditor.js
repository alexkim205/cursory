import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import jQuery from 'jquery';

// Font styles
import '@fortawesome/fontawesome-free/css/all.min.css';

// Editor styles
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import 'medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.min.css';

import {EditorWrapper} from './CustomMediumEditor.style';

if (typeof document !== 'undefined') {
  var MediumEditor = require('medium-editor');
  window.jQuery = window.$ = jQuery;
  require('medium-editor-insert-plugin')(window.$);
  // var MediumInsert = require('medium-editor-insert-plugin/dist/js/medium-editor-insert-plugin');
  // window['MediumInsert'] = MediumInsert.MediumInsert;
}

class CustomMediumEditor extends React.Component {

  static defaultProps = {
    tag: 'div',
  };

  static propTypes = {
    tag: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.object,
    text: PropTypes.string,
  };

  state = {
    text: this.props.text,
  };

  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this);

    this.medium = new MediumEditor(dom, this.props.options);
    this.medium.subscribe('editableInput', e => {
      this._updated = true;
      this.change(dom.innerHTML);
    });
    jQuery(dom).mediumInsert({
      editor: this.medium,
    });

  }

  componentDidUpdate() {
    this.medium.restoreSelection();
  }

  componentWillUnmount() {
    this.medium.destroy();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.state.text && !this._updated) {
      this.setState({text: nextProps.text});
    }

    if (this._updated) this._updated = false;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !(JSON.stringify(this.props) === JSON.stringify(nextProps) && this.state === nextState);
  }

  render() {
    const {
      options,
      text,
      tag,
      contentEditable,
      dangerouslySetInnerHTML,
      ...props
    } = this.props;
    props.dangerouslySetInnerHTML = {__html: this.state.text};

    if (this.medium) {
      this.medium.saveSelection();
    }

    return <EditorWrapper {...props}/>;
  }

  change(text) {
    if (this.props.onChange) this.props.onChange(text, this.medium);
  }

}

export {CustomMediumEditor};
