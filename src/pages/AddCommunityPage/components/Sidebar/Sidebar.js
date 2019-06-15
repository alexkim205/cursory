import React from 'react';
import PropTypes from 'prop-types';
import {fromJS} from 'immutable';
import _ from 'lodash';

import {
  FormFieldText,
  FormFieldSlider,
  FormFieldSelect,
  FormFieldCollapsibleWidth,
} from '../../../../components/Forms';
import {SidebarWrapper} from './Sidebar.style';
import {
  componentNames,
  componentTypes,
} from '../../constants/component-types';
import {ROUTES} from '../../../../_constants';
import {FieldTypes} from '../Fields';

class Sidebar extends React.Component {
  static propTypes = {
    sidebarIsOpen: PropTypes.bool.isRequired,
    activeComponent: PropTypes.object,
    fields: PropTypes.array,
    updateAttributes: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    console.log('refresh, sidebar', nextProps.activeComponent,
        this.props.activeComponent);
    if (
        JSON.stringify(nextProps.activeComponent) !==
        JSON.stringify(this.props.activeComponent)
    ) {
      const newFields = _.pickBy(
          nextProps.activeComponent,
          (value, key, object) => {
            return this.state && key in this.state;
          },
      );
      console.log('new state', newFields);
      this.setState(newFields);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
        this.state && this.state.childComponents !==
        nextState.childComponents ||
        this.props !== nextProps
    );
  }

  onChange = event => {
    const {activeComponent} = this.props;

    // update sidebar's state
    this.setState({[event.target.name]: event.target.value});

    // update builderlayout
    this.props.updateAttributes(
        event,
        activeComponent.id,
        event.target.name,
        event.target.value,
    );
  };

  // if children components are changed in a collapsible field for containers
  // for now handle separately, but think of way to use above onChange hook for this too
  onChildrenChange = (event, children) => {
    const {activeComponent} = this.props;
    this.setState({childComponents: children});
    this.props.updateAttributes(
        event,
        activeComponent.id,
        'childComponents',
        children,
    );
  };

  onSubmit = event => {
    const {fields} = this.props;

    event.preventDefault();
  };

  renderAllFields = (component, fields) => {
    return (
        <React.Fragment>
          {fields &&
          fields.map((section, i) => (
              // Start of Section
              <div className={'section'} key={i}>
                <h4>{section.name}</h4>
                {section.subsections &&
                section.subsections.map((subsection, j) => (
                    // Start of SubSection
                    <div className={'subsection'} key={j}>
                      <h5>{subsection.name}</h5>
                      {/* Can add Form Fields here */}
                      {subsection.descriptor &&
                      this.renderFormField(component, subsection)}
                      {subsection.subsubsections &&
                      subsection.subsubsections.map((sssection, k) => (
                          <div className={'subsubsection'} key={k}>
                            <h6>{sssection.name}</h6>
                            {/* Can add Form Fields here too */}
                            {sssection.descriptor &&
                            this.renderFormField(component, sssection)}
                          </div>
                      ))}
                    </div>
                ))}
              </div>
          ))}
        </React.Fragment>
    );
  };

  renderFormField = (component, sectionInfo) => {
    const {descriptor, name} = sectionInfo;
    // If descriptor key is not in component don't display it
    if (!(descriptor.key in component)) return;

    // If descriptor key is not yet in state, use the components
    // value. If it is, we use the dynamic state's value. Key will
    // be added to state once input value is changed.
    const stateOrComponentValue =
        this.state && descriptor.key in this.state
            ? this.state[descriptor.key]
            : component[descriptor.key];
    console.log('render state', this.state, stateOrComponentValue);

    switch (descriptor.type) {
      case FieldTypes.COLLAPSIBLE:
        return (
            <FormFieldCollapsibleWidth
                childComponents={stateOrComponentValue}
                onChildrenChange={this.onChildrenChange}
            />
        );
      case FieldTypes.SLIDER:
        return (
            <FormFieldSlider
                label={name}
                name={descriptor.key}
                value={stateOrComponentValue}
                onChange={this.onChange}
                min={descriptor.bounds[0]}
                max={descriptor.bounds[1]}
                step={descriptor.bounds[2]}
                type="range"
                // placeholder="Full Name"
            />
        );
      case FieldTypes.SELECT:
        return (
            <FormFieldSelect
                label={name}
                name={descriptor.key}
                value={stateOrComponentValue}
                onChange={this.onChange}
                options={descriptor.options}
                enums={descriptor.enums}
                // placeholder="Full Name"
            />
        );
      case FieldTypes.COLOR:
      case FieldTypes.TEXT:
        return (
            <FormFieldText
                label={name}
                name={descriptor.key}
                value={stateOrComponentValue}
                onChange={this.onChange}
                type="text"
                // placeholder="Full Name"
            />
        );
      default:
        break;
    }
  };

  render() {
    const {sidebarIsOpen, activeComponent, fields} = this.props;

    return (
        <SidebarWrapper pose={sidebarIsOpen ? 'open' : 'closed'}>
          {sidebarIsOpen && ( // TODO: add blurred default to show when closing sidebar
              <React.Fragment>
                <form onSubmit={this.onSubmit} className={'form-wrapper'}>
                  <div className={'tabs'}/>
                  <div className={'main'}>
                    <div className={'type'}>
                      <h3>{activeComponent.type}</h3>
                    </div>
                    {this.renderAllFields(activeComponent, fields)}
                  </div>
                  <div className={'submit'}>
                    <button type="submit">
                      {/* disabled={isInvalid}*/}
                      Confirm
                    </button>
                  </div>
                </form>
              </React.Fragment>
          )}
        </SidebarWrapper>
    );
  }
}

export {Sidebar};
