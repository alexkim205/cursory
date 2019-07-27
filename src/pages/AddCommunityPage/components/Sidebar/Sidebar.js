import React from 'react';
import PropTypes from 'prop-types';

import {WidthField} from './WidthField';
import {SliderField} from './SliderField';
import {SidebarWrapper} from './Sidebar.style';
import {FieldTypes} from '../Fields';
import {compose} from 'redux';
import {
  connectUpdateHandler,
  withActiveComponent,
  withSidebarIsOpen,
} from '../../BuilderLayout/HOC';
import {componentFields} from '../Fields/component-fields';

class Sidebar extends React.Component {
  static propTypes = {
    activeComponent: PropTypes.object,
    sidebarIsOpen: PropTypes.bool,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
        this.state && this.state.childComponents !==
        nextState.childComponents ||
        this.props !== nextProps
    );
  }

  renderAllFields = () => {
    const fields = componentFields[this.props.activeComponent.get('type')];

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
                      this.renderFormField(subsection)}
                      {subsection.subsubsections &&
                      subsection.subsubsections.map((subssubsection, k) => (
                          <div className={'subsubsection'} key={k}>
                            <div className={'subsubsection-label'}>
                              {subssubsection.name}
                            </div>
                            {/* Can add Form Fields here too */}
                            {subssubsection.descriptor &&
                            this.renderFormField(subssubsection)}
                          </div>
                      ))}
                    </div>
                ))}
              </div>
          ))}
        </React.Fragment>
    );
  };

  renderFormField = (sectionInfo) => {
    const {activeComponent} = this.props;
    const {descriptor, name} = sectionInfo;
    // If descriptor key is not in component don't display it
    if (!activeComponent.has(descriptor.key)) return;

    switch (descriptor.type) {
      case FieldTypes.COLLAPSIBLE:
        console.log(FieldTypes.COLLAPSIBLE);
        return (
            <WidthField/>
        );
        // case FieldTypes.COLLAPSIBLE:
        //   return (
        //       <FormFieldCollapsibleWidth
        //           childComponents={stateOrComponentValue}
        //           onChildrenChange={this.onChildrenChange}
        //       />
        //   );
      case FieldTypes.SLIDER:
        return (
            <SliderField descriptor={descriptor}/>
        );
        // case FieldTypes.SELECT:
        //   return (
        //       <FormFieldSelect
        //           label={name}
        //           name={descriptor.key}
        //           value={stateOrComponentValue}
        //           onChange={this.onChange}
        //           options={descriptor.options}
        //           enums={descriptor.enums}
        //           // placeholder="Full Name"
        //       />
        //   );
        // case FieldTypes.COLOR:
        //   return (
        //       <FormFieldColor
        //           label={name}
        //           name={descriptor.key}
        //           value={stateOrComponentValue}
        //           onChange={this.onChange}
        //       />
        //   );
        // case FieldTypes.TEXT:
        //   return (
        //       <FormFieldText
        //           label={name}
        //           name={descriptor.key}
        //           value={stateOrComponentValue}
        //           onChange={this.onChange}
        //           type="text"
        //           // placeholder="Full Name"
        //       />
        //   );
      default:
        break;
    }
  };

  render() {
    const {sidebarIsOpen, activeComponent} = this.props;

    return (
        <SidebarWrapper pose={sidebarIsOpen ? 'open' : 'closed'}>
          {sidebarIsOpen && ( // TODO: add blurred default to show when closing sidebar
              <React.Fragment>
                <form onSubmit={this.onSubmit} className={'form-wrapper'}>
                  <div className={'tabs'}/>
                  <div className={'main'}>
                    <div className={'type'}>
                      <div className={'type-label'}>
                        {activeComponent.get('id')}
                      </div>
                      <div className={'type-label'}>
                        {activeComponent.get('type')}
                      </div>
                    </div>
                    {this.renderAllFields()}
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

const connectedComponent = compose(
    withSidebarIsOpen,
    withActiveComponent,
)(Sidebar);

export {connectedComponent as Sidebar};
