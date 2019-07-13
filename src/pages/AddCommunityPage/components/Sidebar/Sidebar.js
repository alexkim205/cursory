import React from 'react';
import PropTypes from 'prop-types';
import {fromJS} from 'immutable';
import _ from 'lodash';

import {
  FormFieldText,
  FormFieldSlider,
  FormFieldSelect,
  FormFieldCollapsibleWidth,
  FormFieldColor,
} from '../../../../components/Forms';
import {SidebarWrapper} from './Sidebar.style';
import {FieldTypes} from '../Fields';

class Sidebar extends React.Component {
  static propTypes = {
    sidebarIsOpen: PropTypes.bool.isRequired,
    activeComponent: PropTypes.object,
    fields: PropTypes.array,
    updateAttributes: PropTypes.func,
  };

  requiresRefresh = (next) => {
    return this.props.activeComponent && next.activeComponent &&
        !next.activeComponent.equals(this.props.activeComponent);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log('refresh, sidebar', nextProps.activeComponent.toJS());
    // this.props.activeComponent);
    if (this.requiresRefresh(nextProps)) {
      const newFields = _.pickBy(
          nextProps.activeComponent.toJS(),
          (value, key, object) => {
            return this.state && key in this.state;
          },
      );
      this.setState(newFields);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // sidebar values should update whenever prop's activeComponent's values change
    if (this.props.activeComponent && nextProps.activeComponent) {
      console.log('current props', this.props.activeComponent.toJS());
      console.log('next props', nextProps.activeComponent.toJS());
    }
    return this.requiresRefresh(nextProps);
  }

  onChange = event => {
    const {activeComponent} = this.props;

    // update sidebar's state
    this.setState({[event.target.name]: event.target.value});

    // update builderlayout
    this.props.updateAttributes(
        event,
        activeComponent.get('id'),
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
        activeComponent.get('id'),
        'childComponents',
        children,
    );
  };

  onSubmit = event => {
    const {fields} = this.props;

    event.preventDefault();
  };

  renderAllFields = (component, fields) => {
    console.log('render all fields', component, fields);
    return (
        <React.Fragment>
          {fields &&
          fields.map((section, i) => (
              // Start of Section
              <div className={'section'} key={i}>
                {/*/!*<h4>{section.name}</h4>*!/ Don't show section name for now*/}
                {section.subsections &&
                section.subsections.map((subsection, j) => (
                    // Start of SubSection
                    <div className={'subsection'} key={j}>
                      <div className={'subsection-label'}>
                        {subsection.name}
                      </div>
                      {/* Can add Form Fields here */}
                      {subsection.descriptor &&
                      this.renderFormField(component, subsection)}
                      {subsection.subsubsections &&
                      subsection.subsubsections.map((sssection, k) => (
                          <div className={'subsubsection'} key={k}>
                            <div className={'subsubsection-label'}>
                              {sssection.name}
                            </div>
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
    console.log('descriptor', descriptor, name, 'in component', component);
    // If descriptor key is not in component don't display it
    if (!component.has(descriptor.key)) return;
    console.log('descriptor', descriptor, name, 'in component',
        component.toJS());

    // If descriptor key is not yet in state, use the components
    // value. If it is, we use the dynamic state's value. Key will
    // be added to state once input value is changed.
    const tookFromStateNotProp = this.state && descriptor.key in this.state;

    const value = tookFromStateNotProp
        ? this.state[descriptor.key]
        : component.get(descriptor.key);
    console.log('value', value);

    // const mapComponent = stateOrComponentValue
    //     ? stateOrComponentValue.toJS()
    //     : null; // TODO: refactor
    // console.log("mapComponent", mapComponent);

    switch (descriptor.type) {
      case FieldTypes.COLLAPSIBLE:
        return (
            <FormFieldCollapsibleWidth
                childComponents={value}
                onChildrenChange={this.onChildrenChange}
            />
        );
      case FieldTypes.SLIDER:
        return (
            <FormFieldSlider
                label={name}
                name={descriptor.key}
                value={value}
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
                value={value}
                onChange={this.onChange}
                options={descriptor.options}
                enums={descriptor.enums}
                // placeholder="Full Name"
            />
        );
      case FieldTypes.COLOR:
        return (
            <FormFieldColor
                label={name}
                name={descriptor.key}
                value={value}
                onChange={this.onChange}
            />
        );
      case FieldTypes.TEXT:
        return (
            <FormFieldText
                label={name}
                name={descriptor.key}
                value={value}
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
    // console.log('sidebar active component', activeComponent);

    return (
        <SidebarWrapper pose={sidebarIsOpen ? 'open' : 'closed'}>
          {sidebarIsOpen && ( // TODO: add blurred default to show when closing sidebar
              <React.Fragment>
                <form onSubmit={this.onSubmit} className={'form-wrapper'}>
                  <div className={'tabs'}/>
                  <div className={'main'}>
                    <div className={'type'}>
                      <div className={'type-label'}>
                        {activeComponent.get('type')}
                      </div>
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
