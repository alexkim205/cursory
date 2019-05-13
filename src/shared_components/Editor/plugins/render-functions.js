import React from 'react';
import {CodeBlock, CustomBlock, HeaderOne, Header} from '../components';
import {isList} from './helper-functions';

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
          return <CustomBlock {...attributes} tag={'p'}>{children}</CustomBlock>;
        case 'heading-one':
          return <Header {...attributes} size={1}>{children}</Header>;
        case 'heading-two':
          return <Header {...attributes} size={2}>{children}</Header>;
        case 'heading-three':
          return <Header {...attributes} size={3}>{children}</Header>;
        case 'heading-four':
          return <Header {...attributes} size={4}>{children}</Header>;
        case 'heading-five':
          return <Header {...attributes} size={5}>{children}</Header>;
        case 'heading-six':
          return <Header {...attributes} size={6}>{children}</Header>;
        case 'unordered-list':
          return <CustomBlock {...attributes} tag={'ul'}>{children}</CustomBlock>;
        case 'ordered-list':
          return <CustomBlock {...attributes} tag={'ol'}>{children}</CustomBlock>;
        case 'list-item':
          return <CustomBlock {...attributes} tag={'li'}>{children}</CustomBlock>;
        case 'todo-list': // TODO
          return <CustomBlock {...attributes} tag={'ol'}>{children}</CustomBlock>;
        case 'block-quote':
          return <CustomBlock {...attributes} tag={'blockquote'}>{children}</CustomBlock>;
        case 'block-code':
          return <CodeBlock {...attributes}>{children}</CodeBlock>;
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
