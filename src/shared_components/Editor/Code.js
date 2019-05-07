import React from 'react';

export function CodeNode(props) {
  return (
      <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
}

