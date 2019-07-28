import React from 'react';

export const withHoverStyle = Component => {

  class WithHoverStyle extends React.Component {

    state = {
      hover: false,
    };
    toggleHover = (e) => {
      // e.stopPropagation();
      console.log("HOVVERR")
      this.setState(prevState => ({hover: !prevState.hover}));
    };

    render() {
      const newStyleProps = {
        hover: this.state.hover,
        ...this.props,
      };
      // console.log(newStyleProps)
      return (
          <div onMouseEnter={this.toggleHover}
               onMouseLeave={this.toggleHover}>
            <Component{...newStyleProps}/>
          </div>
      );
    }
  }

  return WithHoverStyle;
};
