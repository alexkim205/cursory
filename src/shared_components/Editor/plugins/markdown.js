import {
  toggleMark, toggleBlock,
  isMarkorBlockorNeither, unwrapLists, isList,
} from './helper-functions';

/**
 * Get the block type for a series of auto-markdown shortcut `chars`.
 *
 * @param {String} chars
 * @return {String} block
 */

function getType(chars) {
  switch (chars) {
    case '*':
    case '-':
      return 'unordered-list';
    case '1.':
      return 'ordered-list';
    case '+':
      return 'todo-list';
    case '>':
      return 'block-quote';
    case '#':
      return 'heading-one';
    case '##':
      return 'heading-two';
    case '###':
      return 'heading-three';
    case '####':
      return 'heading-four';
    case '#####':
      return 'heading-five';
    case '######':
      return 'heading-six';
    default:
      return null;
  }
}

/**
 * On space, if it was after an auto-markdown shortcut, convert the current
 * node into the shortcut's corresponding type.
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {Function} next
 */

function onSpace(event, editor, next) {
  const {value} = editor;
  const {selection} = value;
  if (selection.isExpanded) return next();

  const {startBlock} = value;
  const {start} = selection;
  const chars = startBlock.text.slice(0, start.offset).replace(/\s*/g, '');
  const type = getType(chars);
  if (!type) return next();

  // Don't activate markdown shortcuts in blocks
  if (isMarkorBlockorNeither(type) === 'block' &&
      isMarkorBlockorNeither(startBlock.type) === 'block') {
    return next();
  }

  console.log(type);
  if (isMarkorBlockorNeither(type) === 'mark') {
    toggleMark(event, editor, type);
  } else if (isMarkorBlockorNeither(type) === 'block') {
    toggleBlock(event, editor, type);
  } else {
    return next();
  }
  // event.preventDefault();
  //
  // editor.setBlocks(type);
  //
  // if (type === 'list-item') {
  //   editor.wrapBlock('bulleted-list');
  // }

  editor.moveFocusToStartOfNode(startBlock).delete();
}

function MarkdownShortcutPlugin(options) {
  return {
    onKeyDown(event, editor, next) {
      switch (event.key) {
        case ' ':
          return onSpace(event, editor, next);
        default:
          return next();
      }

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

export {MarkdownShortcutPlugin};
