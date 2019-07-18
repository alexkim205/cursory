import React from 'react';
import {
  ContentBuildComponent,
  FloatingWidget,
} from '../components/index';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import {isKeyHotkey} from 'is-hotkey';
import {Sidebar} from '../components/Sidebar/Sidebar';

/*
 * Every state will have a `background {page { ... } }`

 state =
 ....Background
 ........Page
 ............Generic Component (Container | Generic Component)

 ............Container
 ................Generic Component
 */

class BuilderLayout extends React.Component {
  constructor(props) {
    super(props);
    this.isUndoKey = isKeyHotkey('mod+z');
    this.isRedoKey = isKeyHotkey('mod+shift+z');
    // this.handleItemAddClick = handleAddElement.bind(this);
    // this.updateAttributes = handleUpdateElement.bind(this);
    // this.updateActive = handleSelectElement.bind(this);
    // this.move = handleMoveElement.bind(this);

  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  render() {

    return (
        <React.Fragment>
          <FloatingWidget/>
          <ContentBuildComponent/>
          <Sidebar/>
        </React.Fragment>
    );
  }

  handleKeyDown = event => {
    // this.state.history.traverse()
    if (this.isUndoKey(event)) {
      this.setState({builderState: this.state.history.undo()});
    } else if (this.isRedoKey(event)) {
      this.setState({builderState: this.state.history.redo()});
    }
  };
}

const connectedComponent = DragDropContext(HTML5Backend)(BuilderLayout);
export {connectedComponent as BuilderLayout};
