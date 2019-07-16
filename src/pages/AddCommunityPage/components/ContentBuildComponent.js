import React from 'react';
import {BackgroundComponent} from '../addable-components/Background';
import {compose} from 'redux';
import {withBuilderState} from '../BuilderLayout/HOC/withBuilderState';

const ContentBuildComponent = ({builderState}) =>
    <BackgroundComponent background={builderState}/>;

const connectedComponent = compose(withBuilderState)(ContentBuildComponent);

export {connectedComponent as ContentBuildComponent};
