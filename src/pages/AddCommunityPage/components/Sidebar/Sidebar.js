import React from 'react';
import PropTypes from 'prop-types';
import {fromJS} from 'immutable';

import {FormField} from '../../../../components/Forms';
import {SidebarWrapper} from './Sidebar.style';
import {ROUTES} from '../../../../_constants';

class Sidebar extends React.Component {

  static propTypes = {
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
    console.log(fields);

    event.preventDefault();
  };

  render() {
    const {activeComponent, fields} = this.props;
    console.log(activeComponent, fields);

    return (
        <SidebarWrapper pose={activeComponent ? 'open' : 'closed'}>
          <form onSubmit={this.onSubmit}>
            {fields && Object.keys(fields).map((sectionName, i) => {

              return (
                  <div key={i}>
                    <h2>{sectionName}</h2>
                    {fields[sectionName] && Object.keys(fields[sectionName]).
                        map((subSectionName, j) => {
                          return (
                              <FormField
                                  key={j}
                                  label={subSectionName}
                                  name={subSectionName}
                                  value={activeComponent[fields[sectionName][subSectionName].key]}
                                  onChange={(e) => this.onChange(e,
                                      [sectionName, subSectionName])}
                                  type="text"
                                  // placeholder="Full Name"
                              />
                          );
                        })}
                  </div>
              );
            })}
            <button type="submit">
              {/* disabled={isInvalid}*/}
              Confirm
            </button>
          </form>
        </SidebarWrapper>
    );
  }
}

export {Sidebar};
