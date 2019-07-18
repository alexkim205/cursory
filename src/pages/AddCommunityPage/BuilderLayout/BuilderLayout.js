import React from 'react';
import {fromJS} from 'immutable';
import {
  BackgroundClass,
  ContainerClass,
  ContainerItemClass,
  GenericClass,
  PageClass,
} from '../components/addable-components/index';
import {
  ContentBuildComponent,
  History,
  FloatingWidget,
} from '../components/index';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import {isKeyHotkey} from 'is-hotkey';
import {Sidebar} from '../components/Sidebar/Sidebar';
import {
  handleAddElement,
  handleMoveElement,
  handleSelectElement,
  handleUpdateElement,
} from './actions';

/*
 * Every state will have a `background {page { ... } }`

 state =
 ....Background
 ........Page
 ............Generic Component (Container | Generic Component)

 ............Container
 ................Generic Component

 */

let initialState = new BackgroundClass({
  page: new PageClass({width: 80}),
});
initialState.page.addChild(new ContainerClass({id: 'bg_page_0'}));
initialState.page.addChild(new ContainerClass({id: 'bg_page_1'}));
initialState.page.addChild(new ContainerClass({id: 'bg_page_2'}));
initialState.page.addChild(new ContainerClass({id: 'bg_page_3'}));
initialState.page.childComponents[0].addChild(
    new ContainerItemClass({id: 'bg_page_0_0'}),
);
initialState.page.childComponents[0].addChild(
    new ContainerItemClass({id: 'bg_page_0_1'}),
);
initialState.page.childComponents[0].addChild(
    new ContainerItemClass({id: 'bg_page_0_2'}),
);
initialState.page.childComponents[0].childComponents[0].addChild(
    new GenericClass({id: 'bg_page_0_0_0', backgroundColor: 'blue'}),
);
initialState.page.childComponents[0].childComponents[0].addChild(
    new GenericClass({id: 'bg_page_0_0_1', backgroundColor: 'red'}),
);
initialState.page.childComponents[0].childComponents[1].addChild(
    new GenericClass({id: 'bg_page_0_1_0', backgroundColor: 'green'}),
);
initialState.page.childComponents[0].childComponents[2].addChild(
    new GenericClass({id: 'bg_page_0_2_0', backgroundColor: 'yellow'}),
);
initialState = fromJS(JSON.parse(JSON.stringify(initialState)));

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

  state = {
    builderState: initialState,
    history: new History(15, initialState),

    // sidebar
    sidebarIsOpen: false,
    activeComponent: null,
    activeFields: [],
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  render() {
    const {
      builderState,
      activeComponent,
      activeFields,
      sidebarIsOpen,
    } = this.state;

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
