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

import {isMarkorBlockorNeither, isList, hasBlock, hasMark} from '../utils';

/**
 * Prevent event before toggling mark
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {String} mark
 * @returns {null}
 */
export function toggleMark(event, editor, mark) {
  event.preventDefault();

  const {value} = editor;
  const {selection, blocks} = value;

  // if last block is empty, move end focus to start of second to last block
  if (blocks.size > 1 && selection.end.offset === 0) {
    editor.moveEndBackward(1);
    return toggleMark(event, editor, mark); // try again
  }

  editor.toggleMark(mark);
}

/**
 * Unwrap list blocks and set to default
 * @param {Event} event
 * @param {Editor} editor
 */
export function unwrapLists(event, editor) {
  editor.setBlocks('paragraph').
      unwrapBlock('unordered-list').
      unwrapBlock('ordered-list').
      unwrapBlock('todo-list');
}

/**
 * Handle multiple blocks, and call callback on all affected blocks
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {function} callbackSingle
 * @param {function} callbackMultiple - defines rules to follow if selected are different blocks
 */
export function handleMultipleBlocks(event, editor, callbackSingle, callbackMultiple = (blocks) => {

  // default loop through each element and toggle (works for lists)
  blocks.forEach((node, i) => {
        editor.moveToEndOfNode(node);
        callbackSingle();
      },
  );
}) {
  event.preventDefault();

  const {value} = editor;
  const {document, fragment, selection, blocks} = value;
  const n = blocks.size;
  // console.log('value blocks', value.blocks);
  const startNode = document.getParent(selection.start.key);
  const endNode = document.getParent(selection.end.key);

  // if last block is empty, move end focus to start of second to last block
  if (blocks.size > 1 && selection.end.offset === 0) {
    editor.moveEndBackward(1);
    return handleMultipleBlocks(event, editor, callbackSingle, callbackMultiple); // try again
  }

  // single block selected
  if (startNode === endNode) {
    // console.log('single block selected');
    callbackSingle();
  }
  // multiple blocks selected
  else {
    // console.log('multiple blocks selected', blocks);

    const currentStartTextNode = value.startText,
        currentEndTextNode = value.endText,
        currentStartTextOffset = selection.start.offset,
        currentEndTextOffset = selection.end.offset;
    // console.log('start', currentStartTextNode, currentStartTextOffset);
    // console.log('end', currentEndTextNode, currentEndTextOffset);
    callbackMultiple(blocks);

    editor.moveStartTo(currentStartTextNode.key, currentStartTextOffset);
    editor.moveEndTo(currentEndTextNode.key, currentEndTextOffset);
  }

}

/**
 * Toggle single or multiple blocks
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {String} block
 * @returns {null}
 */
export function toggleBlock(event, editor, block) {

  handleMultipleBlocks(event, editor,
      () => toggleSingleBlock(event, editor, block),
      (blocks) => {
        // if some are active, toggle nonactive ones
        const someAreActive = blocks.some((node) => node.type === block);
        const allAreActive = blocks.every((node) => node.type === block);

        if (someAreActive && !allAreActive) {
          // console.log('some active');
          blocks.forEach((node, i) => {
            editor.moveToEndOfNode(node);
            if (node.type !== block) {
              toggleSingleBlock(event, editor, block);
            }
          });
        }
        // if all are active or all are not active, toggle all
        else {
          // console.log('all active or none active');
          blocks.forEach((node, i) => {
            editor.moveToEndOfNode(node);
            toggleSingleBlock(event, editor, block);
          });
        }
      });
}

/**
 * Prevent event before toggling single block
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {String} block
 * @returns {null}
 */
export function toggleSingleBlock(event, editor, block) {
  event.preventDefault();

  const {value} = editor;
  const {document, startBlock} = value;

  const listItem = document.getNode(startBlock.key);
  const list = document.getParent(listItem.key);

  const previousListItem = document.getPreviousSibling(listItem.key);
  const indexOfPrevious = previousListItem ? list.nodes.indexOf(previousListItem) : 0;

  const parentListItem = document.getPreviousSibling(list.key); // list item to move after
  const parentList = document.getParent(list.key); // list to move to

  const otherItems = list.nodes.skipUntil(item => item === listItem).rest();

  const newList = Block.create({
    object: 'block',
    type: block,
  });

  // Handle everything but converting to and from lists.
  if (!isList(listItem.type) && !isList(block)) {
    const isActive = hasBlock(value, block);
    editor.setBlocks(isActive ? 'paragraph' : block);
  }
  // Handle normal -> lists
  else if (!isList(listItem.type) && isList(block)) {
    // console.log('normal -> list');

    // if block to toggle to is same as previous list, indent item
    // console.log(block, previousListItem.type);
    if (block === previousListItem.type) {
      // console.log('same type');
      increaseItemDepth(event, editor);
    }
    // else create new list of different type
    else {
      // console.log('different type');
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
  }
  // Handle lists -> normal or other lists
  else {
    // TODO - maybe implement behavior to toggle list types,
    // console.log('list -> normal')

    // revert to normal if toggle same block
    if (list.type === block) {
      editor.withoutNormalizing(() => {

        // decreaseIndent until block is paragraph
        while (editor.value.startBlock.type !== 'paragraph') {
          decreaseItemDepth(event, editor);
        }
      });
    }
    // TODO - convert to different list
    // else if (list.type !== block) {
    //   editor.setNodeByKey(list.key, block);
    // }
  }
}

/**
 * increase item depth
 *
 */
export function increaseItemDepth(event, editor) {
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

export function decreaseItemDepth(event, editor) {
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
