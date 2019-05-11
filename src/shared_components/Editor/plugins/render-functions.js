import React from 'react';

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
 Checklist/Todo  meta+shift+T   node
 Code            meta+shift+C   mark
 Code Block      meta+shift+D   node
 Mark            meta+M         mark
 File?           meta+shift+F   -
 Save            meta+S         -
 */

function RenderPlugin(options) {
  return {
    renderNode(props, editor, next) {
      const {attributes, children, node} = props;

      switch (node.type) {
        case 'paragraph':
          return <p {...attributes}>{children}</p>;
        case 'heading-one':
          return <h1 {...attributes}>{children}</h1>; // h1 too large
        case 'heading-two':
          return <h2 {...attributes}>{children}</h2>;
        case 'heading-three':
          return <h3 {...attributes}>{children}</h3>;
        case 'heading-four':
          return <h4 {...attributes}>{children}</h4>;
        case 'heading-five':
          return <h5 {...attributes}>{children}</h5>;
        case 'heading-six':
          return <h6 {...attributes}>{children}</h6>;
        case 'unordered-list':
          return <ul {...attributes}>{children}</ul>;
        case 'ordered-list':
          return <ol {...attributes}>{children}</ol>;
        case 'list-item':
          return <li {...attributes}>{children}</li>;
        case 'todo-list': // TODO
          return <ol {...attributes}>{children}</ol>;
        case 'block-quote':
          return <blockquote {...attributes}>{children}</blockquote>;
        case 'block-code':
          return (
              <pre>
                <code {...attributes}>{children}</code>
              </pre>
          );
        default:
          return next();
      }
    },
    renderMark(props, editor, next) {
      const {children, mark, attributes} = props;

      switch (mark.type) {
        case 'bold':
          return <strong {...attributes}>{children}</strong>;
        case 'italic':
          return <em {...attributes}>{children}</em>;
        case 'underlined':
          return <u {...attributes}>{children}</u>;
        case 'strikethrough':
          return <span {...attributes} style={{textDecoration: 'line-through'}}>{children}</span>;
        case 'link': // TODO
          return null;
        case 'code':
          return <code {...attributes}>{children}</code>;
        case 'mark':
          // return <span {...attributes} style={{backgroundColor: 'yellow'}}>{children}</span>;
          return <mark {...attributes}>{children}</mark>;
        default:
          return next();
      }
    },

  };
}

export {RenderPlugin};
