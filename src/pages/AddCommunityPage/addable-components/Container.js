import React from "react";
import { compose } from "redux";

import {
  ContainerItemInterface,
  ContainerItemComponent,
} from "./ContainerItem";
import { GenericComponentInterface } from "./Generic";
import { componentTypes } from "../constants/component-types";
import { Alignments, Directions } from "../constants/style-enums";
import { StyledClass } from "../components/StyledClass";
import PropTypes from "prop-types";
import { connectAsTargetAndSource } from "../draggable-droppable";
import {
  calcWhichBorder,
} from "../draggable-droppable/withBorderHighlights";
import { widthDescriptor, heightDescriptor } from "../components/";
import { ContainerWrapper } from "./styles";

export class ContainerClass extends StyledClass {
  constructor(options = {}) {
    super(options);
    Object.assign(
      this,
      {
        id: "bg_page_0",
        index: 0,
        name: "",
        type: componentTypes.CONTAINER,
        childComponents: [],
        direction: Directions.Columns,
        alignment: Alignments.SpaceBetween,
        width: widthDescriptor.bounds[1],
        height: heightDescriptor.bounds[1],
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
}

class ContainerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  state = { borderHighlight: null };

  static propTypes = {
    container: PropTypes.oneOfType(
      PropTypes.instanceOf(ContainerClass),
      PropTypes.object,
    ),
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    clientOffset: PropTypes.object,
    move: PropTypes.func,
    updateActive: PropTypes.func,
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
      JSON.stringify(this.props.container) !==
        JSON.stringify(nextProps.container) ||
      this.props.isDragging !== nextProps.isDragging
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
    } = this.props.container;
    const {
      connectDropTarget,
      connectDragSource,
      connectDragPreview,
      isDragging,
      isOver,
      clientOffset,
      move,
      updateActive,
    } = this.props;
    const { borderHighlight } = this.state;
    const numberOfColumns = childComponents.length;

    return (
      <ContainerWrapper
        {...otherProps}
        borderHighlight={borderHighlight}
        // active={active}
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
        {childComponents &&
          childComponents.map((e, key) => {
            const newComponent = Object.assign(
              Object.create(Object.getPrototypeOf(e)),
              e,
            );
            newComponent.id = `${id}_${key}`;
            newComponent.index = key;
            // if direction is columns, divide columns to fit full width, otherwise keep at 100
            // newComponent.width =
            //   this.props.container.direction === Directions.Columns
            //     ? widthDescriptor.bounds[1] / numberOfColumns
            //     : widthDescriptor.bounds[1];

            return (
              <ContainerItemComponent
                containerItem={newComponent}
                key={key}
                move={move}
                updateActive={updateActive}
                parentIsOver={isOver}
              />
            );
          })}
      </ContainerWrapper>
    );
  }
}

const connectedComponent = connectAsTargetAndSource(ContainerComponent);
export { connectedComponent as ContainerComponent };
