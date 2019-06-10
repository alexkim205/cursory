import React from "react";

import { ContentWrapper } from "./styles";

class Content extends React.Component {
  // componentDidMount() {
  //   this.setState({isOpen: true});
  // }
  //
  // state = {
  //   isOpen: false,
  // };

  render() {
    // Nested Tabs for sidebar
    return (
      <ContentWrapper
      // pose={this.state.isOpen ? 'open' : 'closed'}
      >
        {this.props.children}
      </ContentWrapper>
    );
  }
}

export { Content };
