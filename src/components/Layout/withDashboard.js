import React, {Component} from 'react';
import styled from 'styled-components';

import {Toolbar} from './Toolbar';
import {
  FavoritesPage, PeoplePage,
  RecentPage,
  TagsPage,
  TrendingPage,
} from '../../pages/PrivatePages';
import {Content} from './Content';
import {Navigation} from '../Navigation';

const Left = styled.div`
  // width: 60px;
`;

const Right = styled.div`
  flex: 1
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const withDashboard = Component => {

  class WithDashboard extends React.Component {
    state = {
      whichRightActive: 0, // which main panel is active? 0..n
    };
    handleClick = (e, whichRightActive) => {
      this.setState({whichRightActive});
    };
    renderActiveComponent = () => {
      switch (this.state.whichRightActive) {
        case 0:
          return <FavoritesPage {...this.props}/>;
        case 1:
          return <TagsPage {...this.props}/>;
        case 2:
          return <RecentPage {...this.props}/>;
        case 3:
          return <TrendingPage {...this.props}/>;
        case 4:
          return <PeoplePage  {...this.props}/>;
        default:
          return <Component {...this.props}/>;
      }
    };

    render() {
      return (
          <React.Fragment>
            <Wrapper>
              <Left>
                <Toolbar whichActive={this.state.whichRightActive}
                         handleClick={this.handleClick}/>
              </Left>
              <Right>
                <Content>
                  {this.renderActiveComponent()}
                </Content>
              </Right>
            </Wrapper>
          </React.Fragment>
      );
    }
  }

  return WithDashboard;
};

export default withDashboard;
