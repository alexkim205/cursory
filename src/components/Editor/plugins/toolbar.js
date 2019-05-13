import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {PortalWithState} from 'react-portal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import camelCase from 'camelcase';

import {Button, Icon, Toolbar} from '../styles/toolbar.style';
import {getVisibleSelectionRect} from '../utils/range';

import {toggleBlock, toggleMark} from './';
import {isMarkorBlockorNeither, isList, hasBlock, hasMark, whichList} from '../utils';

// import {BrandIcon, LightIcon, RegularIcon, SolidIcon} from '../../../_assets/DynamicIcon';

class ToolBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.toolbarRef = React.createRef();
  }

  static propTypes = {
    value: PropTypes.object.isRequired,
    editor: PropTypes.object.isRequired,
    // shouldOpen: PropTypes.bool.isRequired,
  };

  state = {
    isOpen: false,
    buttonPressed: false,
    // disabled: {
    //   bold: false,
    //   italic: false,
    //   underline: false,
    //   strikethrough: false,
    //   link: false,
    //   code: false,
    //   headingOne: false,
    //   headingTwo: false,
    //   blockQuote: false,
    //   blockCode: false,
    //   unorderedList: false,
    //   orderedList: false,
    // },
  };

  updateMenuAttributes = () => {
    const {isOpen} = this.state;
    const {value} = this.props;
    const menu = this.toolbarRef.current;

    if (!isOpen) return;

    // console.log(menu, value.isBlurred, value.isCollapsed)
    // if (value.isBlurred || value.isCollapsed) {
    //   menu.removeAttribute('style');
    //   menu.classList.remove('active');
    //   return;
    // }

    const rect = getVisibleSelectionRect();
    if (!rect) return;
    let top = (rect.top + window.scrollY) - menu.offsetHeight;
    let left = rect.left + window.scrollX - menu.offsetWidth / 2 + rect.width / 2; // eslint-disable-line

    menu.style.opacity = 1;
    menu.style.top = `${top}px`;
    menu.style.left = `${left}px`;
    menu.classList.add('active');
  };

  handleMouseDown = (e) => {
    if (['path', 'svg'].includes(e.target.tagName) || e.target.id === 'toolbar') { // if clicked button or toolbar, ignore
      e.preventDefault();
      return;
    }
    this.setState({buttonPressed: true});
  };
  handleMouseUp = (e) => {
    if (['path', 'svg'].includes(e.target.tagName) || e.target.id === 'toolbar') { // if clicked button or toolbar, ignore
      e.preventDefault();
      return;
    }
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

  renderMarkButton = (type, icon, disabled = false) => {
    const {value} = this.props;
    const isActive = hasMark(value, type);

    return (
        <Button
            active={isActive}
            isDisabled={disabled}
            onMouseDown={disabled ?
                (e) => e.preventDefault() :
                event => toggleMark(event, this.props.editor, type)}
        >
          <FontAwesomeIcon icon={['far', icon]}/>
        </Button>
    );
  };
  renderBlockButton = (type, icon, disabled = false) => {
    const {value} = this.props;
    const {document, blocks, startBlock} = value;

    let isActive = hasBlock(value, type);

    // if type is list and document isn't empty
    if (isList(type) && blocks.size > 0) {

      // find if current block is list or not
      const listItem = document.getNode(startBlock.key);
      const list = document.getParent(listItem.key);
      isActive = listItem && list && list.type === type;
    }

    return (
        <Button
            active={isActive}
            isDisabled={disabled}
            onMouseDown={disabled ?
                (e) => e.preventDefault() :
                event => toggleBlock(event, this.props.editor, type)}
        >
          <FontAwesomeIcon icon={['far', icon]}/>
        </Button>
    );
  };

  renderButtons = () => {
    const {value} = this.props;
    const {document, blocks, startBlock} = value;

    const activeMarks = value.activeMarks;
    // const activeBlocks = value.blocks.map((block) => block.type);
    let disabledState = {
      // marks
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false,
      link: false,
      code: false,
      // blocks
      headingOne: false,
      headingTwo: false,
      blockQuote: false,
      blockCode: false,
      unorderedList: false,
      orderedList: false,
    };
    blocks.forEach((block, i) => {
      console.log(block);
      if (isList(block.type)) {
        const listType = whichList(document, block);
        console.log(listType);
        if (listType === 'ordered-list') {
          disabledState.unorderedList = true;
        } else if (listType === 'unordered-list') {
          disabledState.orderedList = true;
        }
        disabledState = {
          ...disabledState,
          headingOne: true,
          headingTwo: true,
          blockQuote: true,
          blockCode: true,
        };
      }
    });
    console.log(disabledState);

    return (
        <React.Fragment>
          {/* TODO - image*/}
          {/*<Button onMouseDown={this.onClickImage}>*/}
          {/*<Icon>image</Icon>*/}
          {/*</Button>*/}
          {this.renderMarkButton('bold', 'bold')}
          {this.renderMarkButton('italic', 'italic')}
          {this.renderMarkButton('underlined', 'underline')}
          {this.renderMarkButton('strikethrough', 'strikethrough')}
          {/* TODO -link*/}
          {this.renderMarkButton('link', 'link')}
          {this.renderMarkButton('code', 'code')}
          {this.renderMarkButton('mark', 'highlighter')}
          {this.renderBlockButton('heading-one', 'h1', disabledState.headingOne)}
          {this.renderBlockButton('heading-two', 'h2', disabledState.headingTwo)}
          {this.renderBlockButton('block-quote', 'quote-left', disabledState.blockQuote)}
          {this.renderBlockButton('block-code', 'brackets-curly', disabledState.blockCode)}
          {this.renderBlockButton('ordered-list', 'list-ol', disabledState.orderedList)}
          {this.renderBlockButton('unordered-list', 'list-ul', disabledState.unorderedList)}
          {/*{this.renderBlockButton('todo-list', 'format_list_bulleted')}*/}
        </React.Fragment>
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
    const shouldOpen = selection.isExpanded && selection.isFocused && !this.state.buttonPressed;
    // const {shouldOpen} = this.props;

    // if one of lists are active, disable all other lists
    // if (oneIsActive) {
    //
    // }

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
                          <Toolbar ref={this.toolbarRef} id={'toolbar'}>
                            {this.renderButtons()}
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
            <ToolBarComponent value={editor.value} editor={editor}/>
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
