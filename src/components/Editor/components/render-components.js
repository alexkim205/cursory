import React from "react";
import PropType from "prop-types";
import styled from "styled-components";
import { OutlinedBlock, Block, BlockLabel } from "../styles";

export class Header extends React.Component {
  static propTypes = {
    children: PropType.node.isRequired,
    size: PropType.number.isRequired,
  };

  render() {
    const CustomHeaderTag = `h${this.props.size}`;
    const { children, ...otherProps } = this.props;

    return (
      <Block>
        {/*<BlockLabel contentEditable={false}>Title</BlockLabel>*/}
        <div className={"content"}>
          <CustomHeaderTag {...otherProps}>{children}</CustomHeaderTag>
        </div>
      </Block>
    );
  }
}

export class CodeBlock extends React.Component {
  static propTypes = {
    children: PropType.node.isRequired,
  };

  render() {
    const { children, ...otherProps } = this.props;

    return (
      <Block>
        {/*<BlockLabel>Title</BlockLabel>*/}
        <div className={"content"}>
          <pre {...otherProps}>
            {/*<code >}</code>*/}
            {children}
          </pre>
        </div>
      </Block>
    );
  }
}

export class CustomBlock extends React.Component {
  static propTypes = {
    children: PropType.node.isRequired,
    tag: PropType.string.isRequired,
  };

  render() {
    const CustomTag = `${this.props.tag}`;
    const { children, ...otherProps } = this.props;

    return (
      <Block>
        {/*<BlockLabel>Title</BlockLabel>*/}
        <div className={"content"}>
          <CustomTag {...otherProps}>{children}</CustomTag>
        </div>
      </Block>
    );
  }
}
