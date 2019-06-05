import React from 'react';
import PropTypes from 'prop-types';
import {fromJS} from 'immutable';

import {FormField} from '../../../../components/Forms';
import {SidebarWrapper} from './Sidebar.style';
import {componentNames, componentTypes} from '../../constants/component-types';
import {ROUTES} from '../../../../_constants';
import {FieldTypes} from '../FieldClasses';

class Sidebar extends React.Component {

  static propTypes = {
    sidebarIsOpen: PropTypes.bool.isRequired,
    activeComponent: PropTypes.object,
    fields: PropTypes.object,
  };

  onChange = (event, path) => {
    this.setState((prevState) => {
      let newFields = fromJS(prevState.fields);
      newFields.setIn(path, event.target.value);

      return ({
        fields: newFields.toJS(),
      });
    });
  };

  onSubmit = event => {
    const {fields} = this.props;

    event.preventDefault();
  };

  renderAllFields = (component, fields) => {
    fields && fields.map((section, i) =>
        // Start of Section
        <div className={'section'} key={i}>
          <h3>{section.name}</h3>
          {section.subsections &&
          section.subsections.map((subsection, j) =>
              // Start of SubSection
              <div className={'subsection'} key={j}>
                <h4>{subsection.name}</h4>
                {/* Can add Form Fields here */}
                {subsection.descriptor &&
                this.renderFormField(component, subsection)}
                {subsection.subsubsections &&
                subsection.subsubsections.map((sssection, k) =>
                    <div className={'subsubsection'} key={k}>
                      <h5>{sssection.name}</h5>
                      {/* Can add Form Fields here too */}
                      {sssection.descriptor &&
                      this.renderFormField(component, sssection)}
                    </div>,
                )}
              </div>,
          )}
        </div>,
    );
  };

  renderFormField = (component, sectionInfo) => {
    const {descriptor, name} = sectionInfo

    switch (descriptor.type) {
      case FieldTypes.COLOR:
        break;
      case FieldTypes.SELECT:
        break;
      case FieldTypes.SLIDER:
        break;
      case FieldTypes.TEXT:
        return (
            <FormField
                label={name}
                name={subSectionName}
                value={component[field.key]}
                onChange={(e) => this.onChange(e,
                    [sectionName, subSectionName])}
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
    console.log(activeComponent, fields);

    return (
        <SidebarWrapper pose={sidebarIsOpen ? 'open' : 'closed'}>
          {sidebarIsOpen && // TODO: add blurred default to show when closing sidebar
          <React.Fragment>
            <form onSubmit={this.onSubmit} className={'form-wrapper'}>
              <div className={'tabs'}>

              </div>
              <div className={'main'}>
                <div className={'type'}>
                  <h2>{activeComponent.type}</h2>
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
          </React.Fragment>}
        </SidebarWrapper>
    );
  }
}

export {Sidebar};
