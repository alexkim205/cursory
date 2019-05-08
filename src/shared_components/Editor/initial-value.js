import {Value} from 'slate';

const existingValue = JSON.parse(localStorage.getItem('content'));

const initialValue = Value.fromJSON(
    existingValue || {
      document: {
        nodes: [
          {
            object: 'block',
            type: 'paragraph',
            nodes: [
              {
                object: 'text',
                leaves: [
                  {
                    text: 'Hello this is some initial text.',
                  },
                ],
              },
            ],
          },
        ],
      },
    });

export {initialValue};
