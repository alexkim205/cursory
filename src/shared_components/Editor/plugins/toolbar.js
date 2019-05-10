import React from 'react';
import {
  hasBlock,
  hasMark,
  isList,
  toggleBlock,
  toggleMark,
} from './';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Button} from '../Editor.style';

export {
  renderBlockButton, renderMarkButton,
};

function renderMarkButton(editor, type, icon) {
  const {value} = editor;
  const isActive = hasMark(value, type);

  return (
      <Button
          active={isActive}
          onMouseDown={event => toggleMark(event, editor, type)}
      >
        <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
      </Button>
  );
}

function renderBlockButton(editor, type, icon) {
  const {value} = editor;
  const {document, blocks, startBlock} = value;

  let isActive = hasBlock(value, type);

  // if type is list and document isn't empty
  if (isList(type) && blocks.size > 0) {
    const listItem = document.getNode(startBlock.key);
    const list = document.getParent(listItem.key);
    isActive = listItem && list && list.type === type;
  }

  return (
      <Button
          active={isActive}
          onMouseDown={event => toggleBlock(event, editor, type)}
      >
        <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
      </Button>
  );
}

