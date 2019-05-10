import {Value} from 'slate';

const existingValue = JSON.parse(localStorage.getItem('content'));

const initialValue = Value.fromJSON(
    existingValue || {
      document: {
        nodes: [
          {
            "object": "block",
            "type": "title",
            "nodes": [
              {
                "object": "text",
                "text": "Place your title here..."
              }
            ]
          },
        ],
      },
    });

export {initialValue};
