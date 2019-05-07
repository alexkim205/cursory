import React from 'react';
import styled from 'styled-components'

// class ImageNode extends React.Component {
//   state = {};
//
//   render() {
//     return (<div></div>);
//   }
// }

const ImageNode = styled.img`
  display: block;
  max-width: 100%;
  max-height: 20em;
  box-shadow: ${props => (props.selected ? '0 0 0 2px blue;' : 'none')};
`

export {ImageNode};
