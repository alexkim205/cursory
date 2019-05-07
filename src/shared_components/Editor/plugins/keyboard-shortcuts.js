import {isKeyHotkey} from 'is-hotkey';

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
    isTodoHotkey = isKeyHotkey('mod+t'),
    isCodeHotkey = isKeyHotkey('mod+shift+c'),
    isCodeBlockHotkey = isKeyHotkey('mod+shift+d'),
    isMarkHotkey = isKeyHotkey('mod+m'),
    isFileHotkey = isKeyHotkey('mod+shift+f'),
    isSaveHotkey = isKeyHotkey('mod+s');

/**
 * Check if the current selection has a mark with `type` in it.
 *
 * @param {String} type
 * @return {Boolean}
 */

function hasMark(type) {
  const {value} = this.state;
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
    const isList = hasBlock(value, 'list-item');

    // If contains list elements, unwrap it and normalize it to a paragraph
    if (isList) {
      editor.setBlocks(isActive ? 'paragraph' : block).
          unwrapBlock('unordered-list').
          unwrapBlock('ordered-list').
          unwrapBlock('todo-list');
    } else {
      editor.setBlocks(isActive ? 'paragraph' : block);
    }
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
        preventEventBeforeToggleBlock(event, editor, 'code');
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
