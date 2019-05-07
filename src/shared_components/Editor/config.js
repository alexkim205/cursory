import {isKeyHotkey} from 'is-hotkey';

const DEFAULT_NODE = 'paragraph';

const isSaveKey = isKeyHotkey('mod+s');

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');
const isStrikethroughHotKey = isKeyHotkey('mod+shift+s');

export {
  DEFAULT_NODE,

  isSaveKey,

  isBoldHotkey,
  isItalicHotkey,
  isUnderlinedHotkey,
  isCodeHotkey,
  isStrikethroughHotKey,
};
