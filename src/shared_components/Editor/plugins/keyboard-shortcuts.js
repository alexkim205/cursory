import {isKeyHotkey} from 'is-hotkey';
import {
  preventEventBeforeToggleBlock,
  preventEventBeforeToggleMark,
  isList,
  unwrapLists,
  removeAllMarks, increaseItemDepth, decreaseItemDepth,
} from './helper-functions';

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

/**
 * Define hot key bindings
 *
 */
const
    isH1Hotkey = isKeyHotkey('mod+1'),
    isH2Hotkey = isKeyHotkey('mod+2'),
    isH3Hotkey = isKeyHotkey('mod+3'),
    isH4Hotkey = isKeyHotkey('mod+4'),
    isH5Hotkey = isKeyHotkey('mod+5'),
    isH6Hotkey = isKeyHotkey('mod+6'),
    isLineSeparatorHotkey = isKeyHotkey('mod+h'),
    isBoldHotkey = isKeyHotkey('mod+b'),
    isItalicHotkey = isKeyHotkey('mod+i'),
    isUnderlineHotkey = isKeyHotkey('mod+u'),
    isStrikethroughHotkey = isKeyHotkey('mod+shift+s'),
    isLinkHotkey = isKeyHotkey('mod+k'),
    isUnorderedListHotkey = isKeyHotkey('mod+l'),
    isOrderedListHotkey = isKeyHotkey('mod+shift+l'),
    isQuoteHotkey = isKeyHotkey('mod+q'),
    isTodoHotkey = isKeyHotkey('mod+alt+shift+l'),
    isCodeHotkey = isKeyHotkey('mod+shift+c'),
    isCodeBlockHotkey = isKeyHotkey('mod+shift+d'),
    isMarkHotkey = isKeyHotkey('mod+m'),
    isFileHotkey = isKeyHotkey('mod+shift+f'),
    isSaveHotkey = isKeyHotkey('mod+s'),

    isSoftWrapHotkey = isKeyHotkey('shift+enter'),
    isWrapHotkey = isKeyHotkey('enter'),
    isIncreaseTabHotkey = isKeyHotkey('tab'),
    isDecreaseTabHotkey = isKeyHotkey('shift+tab');

/**
 * On backspace, if at the start of a non-paragraph, convert it back into a
 * paragraph node.
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {Function} next
 */

function onBackspace(event, editor, next) {
  const {value} = editor;
  const {selection} = value;
  if (selection.isExpanded) return next();
  if (selection.start.offset !== 0) return next();

  const {startBlock} = value;
  if (startBlock.type === 'paragraph') return next();

  event.preventDefault();
  unwrapLists(event, editor);
}

/**
 * On return, if at the end of a node type that should not be extended,
 * create a new paragraph below it.
 *
 * @param {Event} event
 * @param {Editor} editor
 * @param {Function} next
 */

function onEnter(event, editor, next) {
  const {value} = editor;
  const {selection} = value;
  const {start, end, isExpanded} = selection;
  if (isExpanded) return next();
  const {startBlock} = value;

  if (start.offset === 0 && startBlock.text.length === 0)
    return onBackspace(event, editor, next);
  if (end.offset !== startBlock.text.length) return next();

  // Handle block if it's list
  // 1. If list-item is empty, break out
  if (isList(startBlock.type)) {
    return next();
  }
  // If block is not list it should soft wrap or break out
  // 1. if it shouldn't be extended (e.g., headers, block-quote/code), it should break
  else {
    event.preventDefault();
    editor.splitBlock().setBlocks('paragraph');
    // removeAllMarks(event, editor);
  }
}

function onShiftEnter(event, editor, next) {
  const {value} = editor;
  const {selection} = value;
  const {start, end, isExpanded} = selection;
  if (isExpanded) return next();
  const {startBlock} = value;

  if (startBlock.type !== 'block-quote' && startBlock.type !== 'block-code') {
    // if list or header, just treat like normal enter
    return onEnter(event, editor, next);
  } else {
    // soft wrap if not list
    return editor.insertText('\n');
  }
}

function KeyboardPlugin(options) {
  return {
    onKeyDown(event, editor, next) {

      // Marks are toggled
      if (isBoldHotkey(event)) {
        preventEventBeforeToggleMark(event, editor, 'bold');
      } else if (isItalicHotkey(event)) {
        preventEventBeforeToggleMark(event, editor, 'italic');
      } else if (isUnderlineHotkey(event)) {
        preventEventBeforeToggleMark(event, editor, 'underlined');
      } else if (isStrikethroughHotkey(event)) {
        preventEventBeforeToggleMark(event, editor, 'strikethrough');
      } else if (isLinkHotkey(event)) {
        preventEventBeforeToggleMark(event, editor, 'link');
      } else if (isCodeHotkey(event)) {
        preventEventBeforeToggleMark(event, editor, 'code');
      } else if (isMarkHotkey(event)) {
        preventEventBeforeToggleMark(event, editor, 'mark');
      }
      // Blocks are toggled
      else if (isH1Hotkey(event)) {
        preventEventBeforeToggleBlock(event, editor, 'heading-one');
      } else if (isH2Hotkey(event)) {
        preventEventBeforeToggleBlock(event, editor, 'heading-two');
      } else if (isH3Hotkey(event)) {
        preventEventBeforeToggleBlock(event, editor, 'heading-three');
      } else if (isH4Hotkey(event)) {
        preventEventBeforeToggleBlock(event, editor, 'heading-four');
      } else if (isH5Hotkey(event)) {
        preventEventBeforeToggleBlock(event, editor, 'heading-five');
      } else if (isH6Hotkey(event)) {
        preventEventBeforeToggleBlock(event, editor, 'heading-six');
      } else if (isUnorderedListHotkey(event)) {
        preventEventBeforeToggleBlock(event, editor, 'unordered-list');
      } else if (isOrderedListHotkey(event)) {
        preventEventBeforeToggleBlock(event, editor, 'ordered-list');
      } else if (isTodoHotkey(event)) {
        preventEventBeforeToggleBlock(event, editor, 'todo-list');
      } else if (isQuoteHotkey(event)) {
        preventEventBeforeToggleBlock(event, editor, 'block-quote');
      } else if (isCodeBlockHotkey(event)) {
        preventEventBeforeToggleBlock(event, editor, 'block-code');
      }
      // Miscellaneous
      else if (isSoftWrapHotkey(event)) {
        return onShiftEnter(event, editor, next);
      } else if (isWrapHotkey(event)) {
        return onEnter(event, editor, next);
      } else if (event.key === 'Backspace') {
        return onBackspace(event, editor, next);
      }
        // TOdO INCREASE DECREASE TAB
      // } else if (isIncreaseTabHotkey(event)) {
      //   increaseItemDepth(event, editor);
      // } else if (isDecreaseTabHotkey(event)) {
      //   decreaseItemDepth(event, editor);
      // }
      else {
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

export {KeyboardPlugin};
