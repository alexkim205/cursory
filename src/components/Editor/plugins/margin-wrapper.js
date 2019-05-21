import React from 'react';
import styled from 'styled-components'

const MarginWrapper = styled.div`
  //height: 100%;
  //min-height: 100vh;
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  // max-width: 740px;
  //border-radius: 5px;
  // margin: auto;
  padding: 0 40px;
  //overflow: scroll;
  background-color: white;
  cursor: text;

`;

export function MarginPlugin(options) {
  return {
    renderEditor(props, editor, next) {
      // const {toolbarShouldOpen, ...otherProps} = props;
      const children = next();

      return (
          <React.Fragment>
            <MarginWrapper>
              {children}
            </MarginWrapper>
          </React.Fragment>
      );
    },
    // onClick(event, editor, next) {
    //   if (editor.value.selection.isBlurred) {
    //     editor.moveToRangeOfDocument().focus();
    //   } else {
    //     return next();
    //   }
    // },
  };
}
