// import React from 'react';
// import PropTypes from 'prop-types';
//
// // Slate Main
// import {Editor, getEventRange, getEventTransfer} from 'slate-react';
// import {Value} from 'slate';
// // Slate plugins
// import CollapseOnEscape from 'slate-collapse-on-escape';
// // import Lists from '@convertkit/slate-lists';
//
// import {processfile} from '../../_helpers/process-image';
//
// import {
//   DEFAULT_NODE,
//   isSaveKey,
//   isBoldHotkey,
//   isItalicHotkey,
//   isUnderlinedHotkey,
//   isStrikethroughHotKey,
//   isCodeHotkey,
// } from './config';
//
// // import {CodeNode} from './Code';
// // import {BoldMark} from './Bold';
// import {ImageNode} from './Image';
// import {Button, Icon, Toolbar} from './Editor.style';
// import {initialValue} from './initial-value';
// import {schema} from './schema';
//
// // https://docs.slatejs.org/guides/commands-and-queries
//
// const plugins = [
//   CollapseOnEscape(),
// ];
//
// /**
//  * A change function to standardize inserting images.
//  *
//  * @param {Editor} editor
//  * @param {String} src
//  * @param {Range} target
//  */
//
// function insertImage(editor, src, target) {
//   if (target) {
//     editor.select(target);
//   }
//
//   editor.insertBlock({
//     type: 'image',
//     data: {src},
//   });
//
// }
//
// class CustomEditor extends React.Component {
//
//   /**
//    * Deserialize the initial editor value.
//    *
//    * @type {Object}
//    */
//
//   state = {
//     value: initialValue,
//   };
//
//   static propTypes = {
//     // value: PropTypes.instanceOf(Value).isRequired,
//     // onChange: PropTypes.func.isRequired,
//   };
//
//   /**
//    * Check if the current selection has a mark with `type` in it.
//    *
//    * @param {String} type
//    * @return {Boolean}
//    */
//
//   hasMark = type => {
//     const {value} = this.state;
//     return value.activeMarks.some(mark => mark.type === type);
//   };
//
//   /**
//    * Check if the any of the currently selected blocks are of `type`.
//    *
//    * @param {String} type
//    * @return {Boolean}
//    */
//
//   hasBlock = type => {
//     const {value} = this.state;
//     return value.blocks.some(node => node.type === type);
//   };
//
//   /**
//    * Store a reference to the `editor`.
//    *
//    * @param {Editor} editor
//    */
//
//   ref = editor => {
//     this.editor = editor;
//   };
//
//   render() {
//
//     return (
//         <React.Fragment>
//           <Toolbar>
//             <Button onMouseDown={this.onClickImage}>
//               <Icon>image</Icon>
//             </Button>
//             {this.renderMarkButton('bold', 'format_bold')}
//             {this.renderMarkButton('italic', 'format_italic')}
//             {this.renderMarkButton('underlined', 'format_underlined')}
//             {this.renderMarkButton('strikethrough', 'format_strikethrough')}
//             {this.renderMarkButton('code', 'code')}
//             {this.renderBlockButton('heading-one', 'looks_one')}
//             {this.renderBlockButton('heading-two', 'looks_two')}
//             {this.renderBlockButton('block-quote', 'format_quote')}
//             {this.renderBlockButton('numbered-list', 'format_list_numbered')}
//             {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
//           </Toolbar>
//           <Editor
//               schema={schema}
//               autoFocus
//               placeholder="Enter some rich text..."
//               ref={this.ref}
//               value={this.state.value}
//               onChange={this.onChange}
//               onKeyDown={this.onKeyDown}
//               onDrop={this.onDropOrPaste}
//               onPaste={this.onDropOrPaste}
//               renderNode={this.renderNode}
//               renderMark={this.renderMark}
//               plugins={plugins}
//           />
//           <pre>
//             {/*{JSON.stringify(this.state.value, undefined, 2)}*/}
//           </pre>
//         </React.Fragment>
//     );
//   }
//
//   /**
//    * Render a mark-toggling toolbar button.
//    *
//    * @param {String} type
//    * @param {String} icon
//    * @return {Element}
//    */
//
//   renderMarkButton = (type, icon) => {
//     const isActive = this.hasMark(type);
//
//     return (
//         <Button
//             active={isActive}
//             onMouseDown={event => this.onClickMark(event, type)}
//         >
//           {/*<Icon>{icon}</Icon>*/}
//           {type}
//         </Button>
//     );
//   };
//
//   /**
//    * Render a block-toggling toolbar button.
//    *
//    * @param {String} type
//    * @param {String} icon
//    * @return {Element}
//    */
//
//   renderBlockButton = (type, icon) => {
//     let isActive = this.hasBlock(type);
//
//     if (['numbered-list', 'bulleted-list'].includes(type)) {
//       const {value: {document, blocks}} = this.state;
//
//       if (blocks.size > 0) {
//         const parent = document.getParent(blocks.first().key);
//         isActive = this.hasBlock('list-item') && parent && parent.type === type;
//       }
//     }
//
//     return (
//         <Button
//             active={isActive}
//             onMouseDown={event => this.onClickBlock(event, type)}
//         >
//           {/*<Icon>{icon}</Icon>*/}
//           {type}
//         </Button>
//     );
//   };
//
//   /**
//    * Render a Slate node.
//    *
//    * @param {Object} props
//    * @return {Element}
//    */
//
//   renderNode = (props, editor, next) => {
//     const {attributes, children, node, isFocused} = props;
//
//     switch (node.type) {
//       case 'block-quote':
//         return <blockquote {...attributes}>{children}</blockquote>;
//       case 'bulleted-list':
//         return <ul {...attributes}>{children}</ul>;
//       case 'heading-one':
//         return <h1 {...attributes}>{children}</h1>;
//       case 'heading-two':
//         return <h2 {...attributes}>{children}</h2>;
//       case 'list-item':
//         return <li {...attributes}>{children}</li>;
//       case 'numbered-list':
//         return <ol {...attributes}>{children}</ol>;
//       case 'image': {
//         const src = node.data.get('src');
//         return <ImageNode src={src} selected={isFocused} {...attributes} />;
//       }
//       default:
//         return next();
//     }
//   };
//
//   /**
//    * Render a Slate mark.
//    *
//    * @param {Object} props
//    * @return {Element}
//    */
//
//   renderMark = (props, editor, next) => {
//     const {children, mark, attributes} = props;
//
//     switch (mark.type) {
//       case 'bold':
//         return <strong {...attributes}>{children}</strong>;
//       case 'code':
//         return <code {...attributes}>{children}</code>;
//       case 'italic':
//         return <em {...attributes}>{children}</em>;
//       case 'underlined':
//         return <u {...attributes}>{children}</u>;
//       case 'strikethrough':
//         return <s {...{attributes}}>{children}</s>;
//       default:
//         return next();
//     }
//   };
//
//   /**
//    * On change, save the new `value`.
//    *
//    * @param {Editor} editor
//    */
//
//   onChange = ({value}) => {
//     // Check to see if document changed before saving.
//     // if (value.document != this.state.value.document) {
//     //   // Save the value to local storage
//     //   const content = JSON.stringify(value.toJSON());
//     //   // const content = Plain.serialize(value)
//     //   localStorage.setItem('content', content);
//     // }
//
//     this.setState({value});
//   };
//
//   /**
//    * On clicking the image button, prompt for an image and insert it.
//    *
//    * @param {Event} event
//    */
//
//   onClickImage = (event, editor, next) => {
//     event.preventDefault();
//     const src = window.prompt('Enter the URL of the image:');
//     if (!src) return;
//     const transfer = getEventTransfer(event);
//     console.log(transfer);
//
//     this.handleUpload(event, editor, next, transfer);
//   };
//
//   /**
//    * Handle all forms of file uploads (drag and drop, paste url, choose file)
//    *
//    * @param {Event} event
//    * @param {Editor} editor
//    * @param {Function} next
//    * @param {String} type
//    * @param {Object} transfer
//    */
//   handleUpload = (event, editor, next, transfer) => {
//     const {type, text, files, fragment, html, node, rich} = transfer;
//
//     const target = getEventRange(event, editor);
//
//     switch (type) {
//       case 'files':
//         for (const file of files) {
//           processfile(file, (resizedURL) => editor.command(insertImage, resizedURL, target));
//         }
//         break;
//       case 'text':
//         processfile(text, (resizedURL) => editor.command(insertImage, resizedURL, target));
//         break;
//       default:
//         next();
//         break;
//     }
//   };
//
//   /**
//    * On drop, insert the image wherever it is dropped.
//    *
//    * @param {Event} event
//    * @param {Editor} editor
//    * @param {Function} next
//    */
//   onDropOrPaste = (event, editor, next) => {
//     const target = getEventRange(event, editor);
//     if (!target && event.type === 'drop') return next();
//
//     const transfer = getEventTransfer(event);
//     console.log(transfer);
//
//     this.handleUpload(event, editor, next, transfer);
//   };
//
//   /**
//    * On key down, if it's a formatting command toggle a mark.
//    *
//    * @param {Event} event
//    * @param {Editor} editor
//    * @return {Change}
//    */
//
//   onKeyDown = (event, editor, next) => {
//     let mark;
//
//     if (isBoldHotkey(event)) {
//       mark = 'bold';
//     } else if (isItalicHotkey(event)) {
//       mark = 'italic';
//     } else if (isUnderlinedHotkey(event)) {
//       mark = 'underlined';
//     } else if (isCodeHotkey(event)) {
//       mark = 'code';
//     } else if (isStrikethroughHotKey(event)) {
//       mark = 'strikethrough';
//     } else {
//       return next();
//     }
//
//     event.preventDefault();
//     editor.toggleMark(mark);
//   };
//
//   /**
//    * When a mark button is clicked, toggle the current mark.
//    *
//    * @param {Event} event
//    * @param {String} type
//    */
//
//   onClickMark = (event, type) => {
//     event.preventDefault();
//     this.editor.toggleMark(type);
//   };
//
//   /**
//    * When a block button is clicked, toggle the block type.
//    *
//    * @param {Event} event
//    * @param {String} type
//    */
//
//   onClickBlock = (event, type) => {
//     event.preventDefault();
//
//     const {editor} = this;
//     const {value} = editor;
//     const {document} = value;
//
//     // Handle everything but list buttons.
//     if (type !== 'bulleted-list' && type !== 'numbered-list') {
//       const isActive = this.hasBlock(type);
//       const isList = this.hasBlock('list-item');
//
//       if (isList) {
//         editor.setBlocks(isActive ? DEFAULT_NODE : type).
//             unwrapBlock('bulleted-list').
//             unwrapBlock('numbered-list');
//       } else {
//         editor.setBlocks(isActive ? DEFAULT_NODE : type);
//       }
//     } else {
//       // Handle the extra wrapping required for list buttons.
//       const isList = this.hasBlock('list-item');
//       const isType = value.blocks.some(block => {
//         return !!document.getClosest(block.key, parent => parent.type === type);
//       });
//
//       if (isList && isType) {
//         editor.setBlocks(DEFAULT_NODE).unwrapBlock('bulleted-list').unwrapBlock('numbered-list');
//       } else if (isList) {
//         editor.unwrapBlock(
//             type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list',
//         ).wrapBlock(type);
//       } else {
//         editor.setBlocks('list-item').wrapBlock(type);
//       }
//     }
//   };
//
// }
//
// export {CustomEditor};
