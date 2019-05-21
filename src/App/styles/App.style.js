import React from 'react';
import {Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import posed, {PoseGroup} from 'react-pose';
import {Navigation} from '../../components/Navigation/Navigation';

const RootWrapper = styled.div`
    display: flex;
    // align-items: stretch;
    flex-direction: column;
    // align-content: stretch;
    // background-color: azure;
    flex: 1;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: fixed;
`;

const BodyWrapperUnposed = posed(styled.div`
  // position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow: scroll;
  cursor: text;
  // background-color: lightblue;
`)({
  enter: {
    // y: 0,
    opacity: 1,
    beforeChildren: true,
    // Children: true,
    // delay: 300,
    transition: {
      default: {duration: 200},
    },
  },
  exit: {
    // y: 50,
    opacity: 0,
    // beforeChildren: true,
    // afterChildren: true,
    transition: {
      default: {duration: 200},
    },
  },
});

const BodyWrapper = ({children}) =>
    <Route
        render={({location}) => (
            <PoseGroup>
              <BodyWrapperUnposed key={location.pathname}>
                <Switch location={location}>
                  {children}
                </Switch>
              </BodyWrapperUnposed>
            </PoseGroup>
        )}
    />;

export {BodyWrapper, RootWrapper};
