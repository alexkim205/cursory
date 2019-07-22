import {
  BackgroundClass, ContainerClass, ContainerItemClass, GenericClass,
  PageClass,
} from '../pages/AddCommunityPage/components/addable-components';
import {fromJS} from 'immutable';

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
console.log("before", initialState)

initialState = fromJS(JSON.parse(JSON.stringify(initialState)));

export {initialState};
