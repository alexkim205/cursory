import React from 'react';

export const withHoverStyle = Component => {

  class WithHoverStyle extends React.Component {

    state = {
      hover: false,
    };
    onHover = (e) => {
      e.stopPropagation();
      // console.log('ON HOVER');
      this.setState(prevState => ({hover: true}));
    };
    offHover = (e) => {
      // e.stopPropagation();
      // console.log('OFF HOVER');
      this.setState(prevState => ({hover: false}));
    };

    render() {
      const newStyleProps = {
        hover: this.state.hover,
        ...this.props,
      };
      // console.log(newStyleProps)
      return (
          <Component {...newStyleProps}
                     onMouseOver={this.onHover}
                     onMouseOut={this.offHover}/>
      );
    }
  }

  return WithHoverStyle;
};
