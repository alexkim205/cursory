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

import {Block} from 'slate';
import {findDOMRange} from 'slate-react';

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
    case 'block-code':
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
  if (!type) return false;
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
 * Checks if type is heading
 *
 * @param {String} type
 * @return {Bool}
 */
function isHeading(type) {
  if (!type) return false;
  switch (type) {
    case 'heading-one':
    case 'heading-two':
    case 'heading-three':
    case 'heading-four':
    case 'heading-five':
    case 'heading-six':
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
 * Check if the any of the currently selected blocks are of `type`.
 *
 * @param {Object} value
 * @return {Boolean}
 */

function hasBlock(value, type) {
  return value.blocks.some(node => node.type === type);
}

/**
 * Prevent event before toggling mark
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {String} mark
 * @returns {null}
 */
function toggleMark(event, editor, mark) {
  event.preventDefault();
  editor.toggleMark(mark);
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
 * Remove all marks, clean
 * @param {Event} event
 * @param {Editor} editor
 */
function removeAllMarks(event, editor) {
  editor.
      removeMark('bold').
      removeMark('italic').
      removeMark('underline').
      removeMark('strikethrough').
      removeMark('link').
      removeMark('code').
      removeMark('mark');
}

/**
 * Prevent event before toggling block
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {String} block
 * @returns {null}
 */
function toggleBlock(event, editor, block) {
  event.preventDefault();

  const {value} = editor;
  const {document, startBlock} = value;
  const listItem = document.getNode(startBlock.key);
  const previousListItem = document.getPreviousSibling(listItem.key);
  const list = document.getParent(listItem.key);
  const indexOfPrevious = previousListItem ? list.nodes.indexOf(previousListItem) : 0;

  const newList = Block.create({
    object: 'block',
    type: block,
  });
  console.log('previous', previousListItem);
  console.log(list, indexOfPrevious);
  console.log(newList);
  console.log(listItem);

  // Handle everything but lists.
  if (!isList(listItem.type) && !isList(block)) {
    const isActive = hasBlock(value, block);
    editor.setBlocks(isActive ? 'paragraph' : block);
  }
  // Handle normal -> lists
  else if (!isList(listItem.type) && isList(block)) {

    editor.withoutNormalizing(() => {
      // editor.setBlocks('list-item');
      editor.setNodeByKey(listItem.key, 'list-item');
      editor.insertNodeByKey(
          list.key,
          indexOfPrevious + 1,
          newList,
      );
      editor.moveNodeByKey(listItem.key, newList.key, 0);

    });
  }
  // Handle lists -> normal or other lists
  else {
    // TODO - maybe implement behavior to toggle list types,
    // for now don't do anything
    // console.log(listItem.type, block)
    // // If current block type is same as block type that was pressed don't do anything
    // if (list.type === block) {
    //   console.log('same type')
    //   return;
    // }
    // // If block types aren't same, convert to requested block
    // else if (list.type !== block) {
    //   console.log('different type')
    //   editor.insertNodeByKey(
    //       list.key,
    //       indexOfPrevious + 2,
    //       newList,
    //   )
    //   list.nodes.
    // }
    return;
  }

  // Handle unordered-list, ordered-list, and todo-list
  // else {
  //   const previousListItem = document.getPreviousSibling(listItem.key);
  //   const list = document.getParent(listItem.key);
  //
  //   // If current block type is same as block type that was pressed, unwrap and set to default
  //   if (list.type === block) {
  //     console.log('same type')
  //     unwrapLists(event, editor);
  //   }
  //   // If block types aren't the same, convert to requested block
  //   else if (list.type !== block) {
  //     console.log('different type')
  //     const newList = Block.create({
  //       object: 'block',
  //       type: block,
  //     })
  //     const indexOfPrevious = previousListItem ? list.nodes.indexOf(previousListItem) : 0;
  //     console.log(indexOfPrevious)
  //
  //     editor.withoutNormalizing(() => {
  //       editor.insertNodeByKey(
  //           list.key,
  //           indexOfPrevious + 1,
  //           newList,
  //       );
  //       // editor.setBlocks(previousListItem.type)
  //       editor.moveNodeByKey(listItem.key, newList.key, 0);
  //     });
  //
  //     return;
  //
  //   }
  // }
}

/**
 * increase item depth
 *
 */
function increaseItemDepth(event, editor) {
  event.preventDefault();

  const {document, startBlock} = editor.value;
  const listItem = document.getNode(startBlock.key);
  const previousListItem = document.getPreviousSibling(listItem.key);
  const list = document.getParent(listItem.key);

  if (!listItem) return;
  if (!previousListItem) return;

  // the previous list
  const existingList = previousListItem;

  // if previous element is already a list, add to end of it
  if (isList(existingList.type) && existingList.type !== 'list-item') {

    // if previous list item is a list and list item to indent is a paragraph,
    // make it a list that will be normalized.
    if (listItem.type === 'paragraph') {
      const newListItem = Block.create({
        object: 'block',
        type: 'list-item',
      });

      editor.withoutNormalizing(() => {
        editor.insertNodeByKey(
            previousListItem.key,
            previousListItem.nodes.size,
            newListItem,
        );
        // editor.setBlocks(previousListItem.type)
        editor.moveNodeByKey(listItem.key, newListItem.key, 0);
        editor.unwrapNodeByKey(listItem.nodes.get(0).key);

      });

      return;
    }

    editor.withoutNormalizing(() => {
      editor.moveNodeByKey(
          listItem.key,
          existingList.key,
          existingList.nodes.size,
      );
    });
  } else {

    // if previous list item is NOT a list and list item to indent is a paragraph,
    // indent as a paragraph
    // if (listItem.type === 'paragraph') {
    //   const range = findDOMRange(editor.value.selection)
    //   console.log(range)
    //   editor.moveFocusToStartOfText();
    //   editor.moveAnchorToStartOfText();
    //   editor.insertText('\t');
    //   editor.moveAnchorTo(listItem.key, range.startOffset+1);
    //   editor.moveFocusTo(listItem.key, range.endOffset+1);
    //   return;
    // }
    if (!isList(listItem.type)) {
      editor.insertText('\t');
      return;
    }

    const newList = Block.create({
      object: 'block',
      type: list.type,
    });
    const indexOfPrevious = list.nodes.indexOf(previousListItem);

    editor.withoutNormalizing(() => {
      editor.insertNodeByKey(
          list.key,
          indexOfPrevious + 1,
          newList,
      );
      editor.moveNodeByKey(listItem.key, newList.key, 0);
    });
  }
}

function decreaseItemDepth(event, editor) {
  event.preventDefault();

  const {document, startBlock} = editor.value;

  const listItem = document.getNode(startBlock.key); // item to move

  // if list item is not list then, remove \t if it exists
  if (!isList(listItem.type)) {
    const range = findDOMRange(editor.value.selection);
    // if theres \t at beginning
    if (range.startOffset !== 0 && listItem.text.charAt(range.startOffset - 1) === '\t') {
      editor.moveStartBackward(1);
      editor.insertText('');
      // editor.removeTextByKey(listItem.key, range.startOffset-1, 1)
    }
    return;
  }

  const list = document.getParent(listItem.key); // list to move from
  const parentList = document.getParent(list.key); // list to move to
  const parentListItem = document.getPreviousSibling(list.key); // list item to move after
  const parentIndex = parentList.nodes.indexOf(list); // index to move to

  const otherItems = list.nodes.skipUntil(item => item === listItem).rest();

  // if parent to move to is not a list, drop to paragraph and split block
  if (!isList(parentList.type)) {
    const newParagraphBlock = Block.create({
      object: 'block',
      type: 'paragraph',
    });
    const newListBlock = Block.create({
      object: 'block',
      type: list.type,
    });

    editor.withoutNormalizing(() => {
      // insert new block to end
      editor.insertNodeByKey(parentList.key, parentIndex + 1, newListBlock);

      // move rest of items to new list
      otherItems.forEach((item, index) =>
          editor.moveNodeByKey(item.key, newListBlock.key, newListBlock.nodes.size + index),
      );

      // editor.unwrapBlock('list-item');
      unwrapLists(event, editor);
      editor.setBlocks('paragraph');
    });

    return;
  }

  if (!otherItems.isEmpty()) {
    const newList = Block.create({
      object: 'block',
      type: list.type,
    });

    editor.withoutNormalizing(() => {
      // insert new block to end
      editor.insertNodeByKey(parentList.key, parentIndex + 1, newList);

      // move item to move to parent list
      editor.moveNodeByKey(listItem.key, parentList.key, parentIndex + 1);

      // move rest of items to new list
      otherItems.forEach((item, index) =>
          editor.moveNodeByKey(item.key, newList.key, newList.nodes.size + index),
      );
    });
  } else {
    editor.moveNodeByKey(listItem.key, parentList.key, parentIndex + 1);
  }
}

export {
  toggleBlock,
  toggleMark,
  isMarkorBlockorNeither,
  unwrapLists,
  wrapLists,
  isList,
  isHeading,
  removeAllMarks,
  increaseItemDepth,
  decreaseItemDepth,
  hasBlock,
  hasMark,
};
