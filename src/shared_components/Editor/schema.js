import {Block} from 'slate';

const normalizeList = (editor, error) => {
  const {document} = editor.value;

  switch (error.code) {
    case 'next_sibling_type_invalid':
      // insert all first list's children into second list
      const firstListChild = error.child;
      const secondListChild = document.getNextSibling(firstListChild.key);

      editor.removeNodeByKey(secondListChild.key);
      editor.insertNodeByKey(firstListChild.key, firstListChild.nodes.size, secondListChild);
      // editor.unwrapNodeByKey(secondListChild.key, 'ordered-list')

      for (let i = 0; i < secondListChild.nodes.size; i++) {
        let listItemChildKey = secondListChild.nodes.get(i).key;
        editor.unwrapNodeByKey(listItemChildKey);
      }
      return;
    default:
      return;
  }
};

export const schema = {
  document: {
    nodes: [
      { // Title must be at top
        match: {type: 'heading-one'},
        min: 1, max: 1,
      },
      // { // At least one paragraph block
      //   match: {type: 'paragraph'},
      //   min: 1,
      // },
      {
        match: [
          // {type: 'heading-one'},
          {type: 'paragraph'},
          {type: 'bold'},
          {type: 'italic'},
          {type: 'underlined'},
          {type: 'strikethrough'},
          {type: 'link'},
          {type: 'code'},
          {type: 'mark'},
          {type: 'heading-two'},
          {type: 'heading-three'},
          {type: 'heading-four'},
          {type: 'heading-five'},
          {type: 'heading-six'},
          {type: 'unordered-list'},
          {type: 'ordered-list'},
          {type: 'list-item'},
          {type: 'todo-list'},
          {type: 'block-quote'},
          {type: 'block-code'},
        ],
      },
    ],
    normalize: (editor, error) => {
      const {node, child, index} = error;
      console.log(error.code);
      console.log(child, node, index);
      switch (error.code) {
        case 'child_type_invalid': {
          if (index === 0) {
            return editor.setNodeByKey(child.key, 'heading-one');
          } else {
            return editor.setNodeByKey(child.key, child.type === 'heading-one' ? 'paragraph' : child.type);
          }
        }
        case 'child_min_invalid': {

          if (index === 0) {
            const block = Block.create('heading-one');
            return editor.insertNodeByKey(editor.value.document.key, 0, block);
          } else {
            if (child.type === 'heading-one') {
              const block = Block.create('paragraph');
              return editor.insertNodeByKey(editor.value.document.key, index, block);
            } else {
              const block = Block.create(child.type);
              return editor.insertNodeByKey(editor.value.document.key, index, block);
            }
          }
        }
        case 'child_max_invalid': {
          if (index === 0) {
            return editor.setNodeByKey(child.key, 'heading-one');
          } else if (index === 1) {
            // remove first node, make current title
            editor.removeNodeByKey(editor.value.document.nodes.get(0).key)
            return editor.setNodeByKey(child.key, 'heading-one');
          }
          else {
            return editor.setNodeByKey(child.key, child.type === 'heading-one' ? 'paragraph' : child.type);
          }
        }
      }
    },
  },
  blocks: {
    'ordered-list': {
      nodes: [
        {
          match: [{type: 'ordered-list'}, {type: 'list-item'}],
        },
      ],
      next: [
        {type: 'list-item'},
        {type: 'paragraph'},
        {type: 'unordered-list'},
        {type: 'todo-list'}],
      normalize: normalizeList,
    },
    'unordered-list': {
      nodes: [
        {
          match: [{type: 'unordered-list'}, {type: 'list-item'}],
        },
      ],
      next: [
        {type: 'list-item'},
        {type: 'paragraph'},
        {type: 'ordered-list'},
        {type: 'todo-list'},
      ],
      normalize: normalizeList,
    },
    'todo-list': {
      nodes: [
        {
          match: [
            {type: 'todo-list'},
            {type: 'list-item'},
            {type: 'unordered-list'},
            {type: 'ordered-list'},
          ],
        },
      ],
      next: [{type: 'list-item'}, {type: 'paragraph'}],
      normalize: normalizeList,
    },
  },
};

