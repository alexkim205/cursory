import React from 'react';
import {DragDropContext} from 'react-beautiful-dnd';

/*

state =

  Background
    Page
      components | container

      Container
        components | container

 */

const INITIAL_DOCUMENT_STATE = {

}

export class BuilderLayout extends React.Component {

  state = {...INITIAL_DOCUMENT_STATE}

}
