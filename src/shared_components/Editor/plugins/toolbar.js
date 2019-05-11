import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {PortalWithState} from 'react-portal';

import {Button, Icon, Toolbar} from './toolbar.style';
import {AnimateToolBar} from './toolbar.animation';
import {getVisibleSelectionRect} from '../utils/range';

import {
  hasBlock,
  hasMark,
  isList,
  toggleBlock,
  toggleMark,
} from './';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class ToolBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.toolbarRef = React.createRef();
  }

  static propTypes = {
    value: PropTypes.object.isRequired,
    editor: PropTypes.object.isRequired,
    editorRef: PropTypes.object.isRequired,
    // shouldOpen: PropTypes.bool.isRequired,
  };

  state = {isOpen: false, buttonPressed: false};

  updateMenuAttributes = () => {
    const {isOpen} = this.state;
    const {value} = this.props;
    const menu = this.toolbarRef.current;

    if (!isOpen) return;

    if (value.isBlurred || value.isCollapsed) {
      menu.removeAttribute('style');
      menu.classList.remove('active');
      return;
    }

    const rect = getVisibleSelectionRect();
    if (!rect) return;
    const top = (rect.top + window.scrollY) - menu.offsetHeight;
    const left = rect.left + window.scrollX - menu.offsetWidth / 2 + rect.width / 2; // eslint-disable-line
    menu.style.opacity = 1;
    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;
    menu.classList.add('active');
  };

  handleMouseDown = () => {
    this.setState({buttonPressed: true});
  };
  handleMouseUp = () => {
    this.setState({buttonPressed: false});
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleMouseDown, false);
    document.addEventListener('mouseup', this.handleMouseUp, false);
    this.updateMenuAttributes();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleMouseDown, false);
    document.removeEventListener('mouseup', this.handleMouseUp, false);
  }

  componentDidUpdate() {
    this.updateMenuAttributes();
  }

  renderMarkButton = (type, icon) => {
    const {value} = this.props;
    const isActive = hasMark(value, type);

    return (
        <Button
            active={isActive}
            onMouseDown={event => toggleMark(event, this.props.editor, type)}
        >
          <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
        </Button>
    );
  };
  renderBlockButton = (type, icon) => {
    const {value} = this.props;
    const {document, blocks, startBlock} = value;

    let isActive = hasBlock(value, type);

    // if type is list and document isn't empty
    if (isList(type) && blocks.size > 0) {
      const listItem = document.getNode(startBlock.key);
      const list = document.getParent(listItem.key);
      isActive = listItem && list && list.type === type;
    }

    return (
        <Button
            active={isActive}
            onMouseDown={event => toggleBlock(event, this.props.editor, type)}
        >
          <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
        </Button>
    );
  };

  onOpen = () => {
    this.setState({isOpen: true});
  };
  onClose = () => {
    this.setState({isOpen: false});
  };

  render() {
    const {value: {selection}} = this.props.editor;
    console.log(this.state.buttonPressed);
    const shouldOpen = selection.isExpanded && selection.isFocused && !this.state.buttonPressed;
    // const {shouldOpen} = this.props;

    // console.log('should open: ', shouldOpen);

    return (
        <React.Fragment>
          <PortalWithState
              defaultOpen={false}
              closeOnOutsideClick
              closeOnEsc
              onOpen={this.onOpen}
              onClose={this.onClose}>
            {
              ({openPortal, closePortal, portal}) => {
                if (shouldOpen) {
                  openPortal();
                } else {
                  closePortal();
                }

                return (
                    <React.Fragment>
                      {portal(
                          <Toolbar ref={this.toolbarRef}>
                            <Button onMouseDown={this.onClickImage}>
                              <Icon>image</Icon>
                            </Button>
                            {this.renderMarkButton('bold', 'bold')}
                            {this.renderMarkButton('italic', 'italic')}
                            {/*{this.renderMarkButton('underlined', 'underline')}*/}
                            {/*{this.renderMarkButton('strikethrough', 'strikethrough')}*/}
                            {this.renderMarkButton('link', 'link')}
                            {this.renderMarkButton('code', 'code')}
                            {this.renderMarkButton('mark', 'highlighter')}
                            {this.renderBlockButton('heading-two', 'heading')}
                            {this.renderBlockButton('heading-three', 'heading')}
                            {/*{this.renderBlockButton('block-quote', 'quote-left')}*/}
                            {/*{this.renderBlockButton('block-code', 'angle-double-right')}*/}
                            {this.renderBlockButton('ordered-list', 'list-ol')}
                            {this.renderBlockButton('unordered-list', 'list-ul')}
                            {/*{this.renderBlockButton('todo-list', 'format_list_bulleted')}*/}
                          </Toolbar>,
                      )}
                    </React.Fragment>
                );
              }
            }
          </PortalWithState>
        </React.Fragment>
    );
  }
}

export function ToolBarPlugin(options) {
  return {
    renderEditor(props, editor, next) {
      // const {toolbarShouldOpen, ...otherProps} = props;
      const children = next();

      return (
          <React.Fragment>
            {children}
            <ToolBarComponent value={editor.value} editor={editor} editorRef={props.ref}/>
          </React.Fragment>
      );
    },
    // onClick(event, editor, next) {
    //   if (editor.value.selection.isBlurred) {
    //     editor.moveToRangeOfDocument().focus();
    //   } else {
    //     return next();
    //   }
    // },
  };
}
