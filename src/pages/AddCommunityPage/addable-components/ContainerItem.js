import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { GenericComponent } from "./Generic";
import { componentTypes } from "../constants/component-types";
import { Directions } from "../constants/style-enums";
import { StyledClass } from "../components/StyledClass";
import { ContainerClass } from "./Container";
import { connectAsTargetContainerItem } from "../draggable-droppable";
import {
  calcWhichBorder,
} from "../draggable-droppable/withBorderHighlights";
import { ContainerItemWrapper } from "./styles";

/*
 * Container column where elements can be dropped into.
 */

export class ContainerItemClass extends StyledClass {
  constructor(options = {}) {
    super(options);
    Object.assign(
      this,
      {
        id: "bg_page_0",
        index: 0,
        name: "",
        type: componentTypes.CONTAINER_ITEM,
        childComponents: [],
        direction: Directions.Rows,
        width: 10,
        height: 10,
        paddingVertical: 1,
        paddingHorizontal: 1,
        marginTop: 1,
        marginBottom: 1,
      },
      options,
    );
  }

  addChild = e => {
    this.childComponents.push(e);
  };

  isEmpty = () => {
    return this.childComponents.length === 0;
  };
}

class ContainerItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  state = { borderHighlight: null };

  static propTypes = {
    containerItem: PropTypes.oneOfType(
      PropTypes.instanceOf(ContainerItemClass),
      PropTypes.object,
    ),
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    clientOffset: PropTypes.object,
    move: PropTypes.func,
    updateActive: PropTypes.func,
    parentIsOver: PropTypes.bool,
  };

  changeBorder = clientOffset => {
    const { isOver, canDrop } = this.props;
    this.setState({
      borderHighlight: calcWhichBorder(
        clientOffset,
        this.node,
        isOver,
        canDrop,
      ),
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.borderHighlight !== nextState.borderHighlight ||
      this.props.isOver !== nextProps.isOver ||
      JSON.stringify(this.props.containerItem) !==
        JSON.stringify(nextProps.containerItem)
    );
  }

  render() {
    const {
      id,
      index,
      childComponents,
      name,
      type,
      ...otherProps
    } = this.props.containerItem;
    const {
      connectDropTarget,
      // connectDragSource,
      // connectDragPreview,
      // isDragging,
      isOver,
      parentIsOver,
      canDrop,
      clientOffset,
      move,
      updateActive,
    } = this.props;
    const { borderHighlight } = this.state;
    // console.log(this.props)

    return (
      <ContainerItemWrapper
        {...otherProps}
        borderHighlight={borderHighlight}
        isOver={isOver}
        // isDragging={isDragging}
        onClick={e => updateActive(e, id)}
        ref={instance => {
          this.node.current = instance;
          return connectDropTarget(instance);
        }}
      >
        {/* {id} */}
        {childComponents &&
          childComponents.map((e, key) => {
            const newComponent = Object.assign(
              Object.create(Object.getPrototypeOf(e)),
              e,
            );
            newComponent.id = `${id}_${key}`;
            newComponent.index = key;

            return (
              <GenericComponent
                genericComponent={newComponent}
                key={key}
                move={move}
                updateActive={updateActive}
              />
            );
          })}
      </ContainerItemWrapper>
    );
  }
}

const connectedComponent = connectAsTargetContainerItem(ContainerItemComponent);
export { connectedComponent as ContainerItemComponent };
