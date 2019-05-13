import {isKeyHotkey} from 'is-hotkey';
import {
  toggleBlock,
  toggleMark,
  increaseItemDepth,
  decreaseItemDepth,
  handleMultipleBlocks,
} from './helper-functions';
import {isMarkorBlockorNeither, isList, hasBlock, hasMark} from '../utils';

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
 Quote           meta+shift+U   node
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
    isQuoteHotkey = isKeyHotkey('mod+shift+u'),
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
  if (isList(startBlock.type)) {
    return decreaseItemDepth(event, editor);
  }
  else {
    return next();
  }

  // event.preventDefault();
  // unwrapLists(event, editor);
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

  if (start.offset === 0 && startBlock.text.length === 0) {
    // decrease indent if in list
    if (isList(startBlock.type)) {
      console.log('start+list');
      return decreaseItemDepth(event, editor);
    }
    // if normal block thats empty, treat as backspace
    else {
      console.log('start+notlist');
      return onBackspace(event, editor, next);
    }
  }

  // if middle of text, treat as enter
  if (end.offset !== startBlock.text.length) {
    if (startBlock.type === 'block-quote' || startBlock.type === 'block-code') {
      console.log('middle+block');
      return onShiftEnter(event, editor, next);
    }
    // if anything else, just make new
    else if (isList(startBlock.type)) {
      console.log('middle+list');
      return next();
    }
    // if header or anything else, just make new line
    else {
      event.preventDefault();
      editor.withoutNormalizing(() => {
        editor.splitBlock().setBlocks('paragraph');
      });
    }
  }

  // if end of text
  if (end.offset === startBlock.text.length) {
    // and list
    if (isList(startBlock.type)) {
      console.log('end+list');
      return next();
    }
    // not list
    else {
      console.log('end+notlist');
      event.preventDefault();
      editor.withoutNormalizing(() => {
        editor.splitBlock().setBlocks('paragraph');
      });

    }
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

function onTab(event, editor) {
  handleMultipleBlocks(event, editor, () => increaseItemDepth(event, editor));
}

function onShiftTab(event, editor) {
  handleMultipleBlocks(event, editor, () => decreaseItemDepth(event, editor));
}

function KeyboardPlugin(options) {
  return {
    onKeyDown(event, editor, next) {

      // Marks are toggled
      if (isBoldHotkey(event)) {
        toggleMark(event, editor, 'bold');
      } else if (isItalicHotkey(event)) {
        toggleMark(event, editor, 'italic');
      } else if (isUnderlineHotkey(event)) {
        toggleMark(event, editor, 'underlined');
      } else if (isStrikethroughHotkey(event)) {
        toggleMark(event, editor, 'strikethrough');
      } else if (isLinkHotkey(event)) {
        toggleMark(event, editor, 'link');
      } else if (isCodeHotkey(event)) {
        toggleMark(event, editor, 'code');
      } else if (isMarkHotkey(event)) {
        toggleMark(event, editor, 'mark');
      }
      // Blocks are toggled
      else if (isH1Hotkey(event)) {
        toggleBlock(event, editor, 'heading-one');
      } else if (isH2Hotkey(event)) {
        toggleBlock(event, editor, 'heading-two');
      } else if (isH3Hotkey(event)) {
        toggleBlock(event, editor, 'heading-three');
      } else if (isH4Hotkey(event)) {
        toggleBlock(event, editor, 'heading-four');
      } else if (isH5Hotkey(event)) {
        toggleBlock(event, editor, 'heading-five');
      } else if (isH6Hotkey(event)) {
        toggleBlock(event, editor, 'heading-six');
      } else if (isUnorderedListHotkey(event)) {
        toggleBlock(event, editor, 'unordered-list');
      } else if (isOrderedListHotkey(event)) {
        toggleBlock(event, editor, 'ordered-list');
      } else if (isTodoHotkey(event)) {
        toggleBlock(event, editor, 'todo-list');
      } else if (isQuoteHotkey(event)) {
        toggleBlock(event, editor, 'block-quote');
      } else if (isCodeBlockHotkey(event)) {
        toggleBlock(event, editor, 'block-code');
      }
      // Miscellaneous
      else if (isSoftWrapHotkey(event)) {
        return onShiftEnter(event, editor, next);
      } else if (isWrapHotkey(event)) {
        return onEnter(event, editor, next);
      } else if (event.key === 'Backspace') {
        return onBackspace(event, editor, next);
      } else if (isIncreaseTabHotkey(event)) {
        onTab(event, editor);
      } else if (isDecreaseTabHotkey(event)) {
        onShiftTab(event, editor);
      }
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
