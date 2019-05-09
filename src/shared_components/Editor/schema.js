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
      {
        match: [
          {type: 'paragraph'},
          {type: 'bold'},
          {type: 'italic'},
          {type: 'underlined'},
          {type: 'strikethrough'},
          {type: 'link'},
          {type: 'code'},
          {type: 'mark'},
          {type: 'heading-one'},
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

