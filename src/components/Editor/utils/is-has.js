/**
 * Checks if type is mark or block or neither
 *
 * @param {String} type
 * @return {String} 'mark' || 'block' || 'system'
 */
export function isMarkorBlockorNeither(type) {
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
export function isList(type) {
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
 * Returns which list type it is
 *
 * @param {Document} document
 * @param {Node} node
 * @return {String}
 */
export function whichList(document, node) {
  if (!node || !isList(node.type)) return;
  // console.log(node)
  const listItem = document.getNode(node.key);
  const list = document.getParent(listItem.key);
  return listItem && list ? list.type : null;
}

/**
 * Check if the current selection has a mark with `type` in it.
 *
 * @param value
 * @param {String} type
 * @return {Boolean}
 */

export function hasMark(value, type) {
  return value.activeMarks.some(mark => mark.type === type);
}

/**
 * Check if the any of the currently selected blocks are of `type`.
 *
 * @param {Object} value
 * @return {Boolean}
 */

export function hasBlock(value, type) {
  return value.blocks.some(node => node.type === type);
}
