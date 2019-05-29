import React from 'react';
import styled from 'styled-components';

import {componentTypes} from '../constants/component-types';
import {GenericComponent, GenericComponentInterface} from './GenericComponent';
import {Alignments, Margins, Paddings, Widths} from '../constants/style-enums';

interface PageWrapperProps {
  backgroundColor?: string;
  alignment?: Alignments;
  width?: Widths;
  paddingVertical?: Paddings;
  paddingHorizontal?: Paddings;
  marginTop?: Margins;
  marginBottom?: Margins;
}

export interface PageInterface extends PageWrapperProps {
  type?: string;
  childComponents?: GenericComponentInterface[];
}

const PageWrapper = styled.div<PageWrapperProps>`
  background-color: ${props => props.backgroundColor};
  
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  
  // TODO: Implement style later
  
  ${props => {
  switch (props.alignment) {
    case Alignments.Center:
      return 'align-items: center;';
    case Alignments.Left:
      return 'align-items: flex-start;';
    case Alignments.Right:
      return 'align-items: flex-end;';
    case Alignments.Auto:
      return 'align-items: auto;';
  }
}}
  
  width: ${props => typeof props.width !== 'undefined' ? props.width : 100}%;
  
  // Padding
  padding: ${props => typeof props.paddingVertical !== 'undefined'
    ? props.paddingVertical
    : 0}px 
    ${props => typeof props.paddingHorizontal !== 'undefined'
    ? props.paddingHorizontal
    : 0}px;
    
  // Margin
  margin: ${props => typeof props.marginTop !== 'undefined'
    ? props.marginTop
    : 0}px 0 
    ${props => typeof props.marginBottom !== 'undefined'
    ? props.marginBottom
    : 0}px 0;
`;

export class PageComponent extends React.Component<PageInterface> {

  static defaultProps: PageInterface = {
    type: componentTypes.PAGE,
    backgroundColor: '#FFFFFF',
    // style: 'full',
    alignment: Alignments.Center,
    width: 100,
    childComponents: [],
  };

  render() {
    const {childComponents, type, ...otherProps} = this.props;

    return (
        <PageWrapper {...otherProps}>
          {childComponents && childComponents.map((elementProps, key) => {

            return (
                <GenericComponent {...elementProps}
                                  key={key}
                                  id={`bg_page_${key}`}
                                  index={key}/>
            );
          })}
        </PageWrapper>
    );
  }
}

