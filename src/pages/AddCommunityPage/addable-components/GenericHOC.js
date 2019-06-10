import React from "react";
import { compose } from "redux";

import { componentTypes } from "../constants/component-types";
import { ContainerClass, ContainerComponent } from "./Container";

import { StyledClass } from "../components/StyledClass";
import PropTypes from "prop-types";
import {
  connectAsTarget,
  connectAsTargetAndSource,
} from "../draggable-droppable";
import { calcWhichBorder } from "../draggable-droppable/withBorderHighlights";

import { GenericWrapper } from "./styles";

export class GenericClass extends StyledClass {
  constructor(options = {}) {
    super(options);
    Object.assign(
      this,
      {
        id: "bg_page_0",
        key: 0,
        index: 0,
        name: "",
        type: componentTypes.GENERIC,
        childComponents: [],
        height: 10,
        width: 10,
        paddingVertical: 1,
        paddingHorizontal: 1,
        marginBottom: 1,
      },
      options,
    );
  }
  addChild = e => {
    this.childComponents.push(e);
  };
}

export const GenericHOC = Component => {
  class GenericHOCWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.node = React.createRef;
    }

    state = { borderHighlight: null };

    static propTypes = {
      genericComponent: PropTypes.oneOfType([
        PropTypes.instanceOf(GenericClass),
        PropTypes.instanceOf(ContainerClass),
        PropTypes.object,
      ]),
      connectDropTarget: PropTypes.func.isRequired,
      connectDragSource: PropTypes.func.isRequired,
      connectDragPreview: PropTypes.func.isRequired,
      isDragging: PropTypes.bool.isRequired,
      isOver: PropTypes.bool.isRequired,
      canDrop: PropTypes.bool.isRequired,
      clientOffset: PropTypes.object,
      move: PropTypes.func,
      updateActive: PropTypes.func,
      getKey: PropTypes.func,
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
        JSON.stringify(this.props.genericComponent) !==
          JSON.stringify(nextProps.genericComponent) ||
        this.props.isDragging !== nextProps.isDragging
      );
    }

    render() {
      const {
        id,
        index,
        childComponents,
        type,
        name,
        ...otherStyleProps
      } = this.props.genericComponent;
      const {
        connectDropTarget,
        connectDragSource,
        connectDragPreview,
        isDragging,
        isOver,
        canDrop,
        clientOffset,
        move,
        updateActive,
        getKey,
        ...otherProps
      } = this.props;
      const { borderHighlight } = this.state;

      if (type === componentTypes.CONTAINER) {
        return (
          <ContainerComponent
            container={this.props.genericComponent}
            move={move}
            updateActive={updateActive}
            getKey={getKey}
          />
        );
      }

      // Else, assume generic component with one element
      // Use switch statement when I add more element types
      return (
        <GenericWrapper
          {...otherStyleProps}
          borderHighlight={borderHighlight}
          isOver={isOver}
          isDragging={isDragging}
          onClick={e => updateActive(e, id)}
          ref={instance => {
            this.node.current = instance;
            return connectDropTarget(
              connectDragPreview(connectDragSource(instance)),
            );
          }}
        >
          {/* {id} */}
          <Component {...otherProps} />
        </GenericWrapper>
      );
    }
  }

  return compose(connectAsTargetAndSource)(GenericHOCWrapper);
};
