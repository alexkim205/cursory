/*
 H1              meta+1         node
 H2              meta+2         node
 H3              meta+3         node
 Line Separator  meta+H         node
 Bold            meta+B         mark
 Italic          meta+I         mark
 Underline       meta+U         mark
 Strikethrough   meta+shift+S   mark
 Link            meta+K         mark
 List            meta+L         node
 Ordered List    meta+shift+L   node
 Quote           meta+Q         node
 Checklist/Todo  meta+T         node
 Code            meta+shift+C   mark
 Code Block      meta+shift+D   node
 Mark            meta+M         mark
 File?           meta+shift+F   -
 Save            meta+S         -
 */

import React from 'react';

/**
 * Checks if type is mark or block or neither
 *
 * @param {String} type
 * @return {String} 'mark' || 'block' || 'system'
 */
function isMarkorBlockorNeither(type) {
  switch (type) {
    case 'bold':
    case 'italic':
    case 'underlined':
    case 'strikethrough':
    case 'link':
    case 'code':
    case 'mark':
      return 'mark';
    case 'heading-one':
    case 'heading-two':
    case 'heading-three':
    case 'heading-four':
    case 'heading-five':
    case 'heading-six':
    case 'unordered-list':
    case 'ordered-list':
    case 'list-item':
    case 'todo-list':
    case 'block-quote':
    case 'code':
      return 'block';
    default:
      return 'system';
  }
}

/**
 * Checks if type is list
 *
 * @param {String} type
 * @return {Bool}
 */
function isList(type) {
  switch (type) {
    case 'unordered-list':
    case 'ordered-list':
    case 'list-item':
    case 'todo-list':
      return true;
    default:
      return false;
  }
}

/**
 * Check if the current selection has a mark with `type` in it.
 *
 * @param {String} type
 * @return {Boolean}
 */

function hasMark(value, type) {
  return value.activeMarks.some(mark => mark.type === type);
}

/**
 * Prevent event before toggling mark
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {String} mark
 * @returns {null}
 */
function preventEventBeforeToggleMark(event, editor, mark) {
  event.preventDefault();
  editor.toggleMark(mark);
}

/**
 * Check if the any of the currently selected blocks are of `type`.
 *
 * @param {Object} value
 * @return {Boolean}
 */

function hasBlock(value, type) {
  return value.blocks.some(node => node.type === type);
}

/**
 * Unwrap list blocks and set to default
 * @param {Event} event
 * @param {Editor} editor
 */
function unwrapLists(event, editor) {
  editor.setBlocks('paragraph').
      unwrapBlock('unordered-list').
      unwrapBlock('ordered-list').
      unwrapBlock('todo-list');
}

/**
 * Wrap list blocks
 * @param {Event} event
 * @param {Editor} editor
 */
function wrapLists(event, editor, block) {
  editor.unwrapBlock('unordered-list').
      unwrapBlock('ordered-list').
      unwrapBlock('todo-list').
      wrapBlock(block);
}

/**
 * Prevent event before toggling block
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {String} block
 * @returns {null}
 */
function preventEventBeforeToggleBlock(event, editor, block) {
  event.preventDefault();

  const {value} = editor;
  const {document} = value;

  // Handle everything but lists.
  if (block !== 'unordered-list' && block !== 'ordered-list' && block !== 'todo-list') {
    const isActive = hasBlock(value, block);
    const blockIsList = hasBlock(value, 'list-item');

    // If contains list elements, unwrap it and normalize it to a paragraph
    if (blockIsList) {
      editor.setBlocks(isActive ? 'paragraph' : block).
          unwrapBlock('unordered-list').
          unwrapBlock('ordered-list').
          unwrapBlock('todo-list');
    } else {
      editor.setBlocks(isActive ? 'paragraph' : block);
    }
  }
  // Handle unordered-list, ordered-list, and todo-list
  else {
    const blockIsList = hasBlock(value, 'list-item');
    const isType = value.blocks.some(node => {
      return !!document.getClosest(node.key, parent => parent.type === block);
    });

    // If current block type is same as block type that was pressed, unwrap and set to default
    if (blockIsList && isType) {
      unwrapLists(event, editor);
    }
    // If block types aren't the same, convert to requested block
    else if (blockIsList) {
      wrapLists(event, editor, block);
    }
    // If not a list block, set all blocks to list-items and wrap with block type
    else {
      editor.setBlocks('list-item').wrapBlock(block);
    }
  }
}

export {
  preventEventBeforeToggleMark,
  preventEventBeforeToggleBlock,
  isMarkorBlockorNeither,
  unwrapLists,
  wrapLists,
  isList,
};
