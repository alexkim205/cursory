import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {PoseGroup} from 'react-pose';
import onClickOutside from 'react-onclickoutside';

import {
  FloatingWidgetWrapper,
  FloatingWidgetDropdownWrapper,
  FloatingWidgetDropdownItemWrapper,
  FloatingWidgetItemWrapper,
  AddableDropdownWrapper,
  SettingsDropdownWrapper,
  AddableDropdownItemWrapper,
  SettingsDropdownItemWrapper,
} from './FloatingWidget.style';
import {componentTypes} from '../../constants/component-types';
import {addableElements} from './addable-elements';
import {settingElements} from './setting-elements';

/*
 * Add
 * Background/Page
 * Settings
 */

const connectedItemWrapper = onClickOutside(FloatingWidgetItemWrapper);
connectedItemWrapper.handleClickOutside = () => {
  this.setState({
    dropdownIsActive: false,
  });
};

class FloatingWidget extends React.Component {

  static propTypes = {
    handleItemAddClick: PropTypes.func.isRequired,
  };
  state = {
    addableDropdownIsActive: false,
    settingsDropdownIsActive: false,
  };
  toggleAddableDropdown = e => {
    // console.log("toggle!");
    this.setState(prevState => ({
      addableDropdownIsActive: !prevState.addableDropdownIsActive,
      settingsDropdownIsActive: false,
    }));
  };
  toggleSettingsDropdown = e => {
    this.setState(prevState => ({
      addableDropdownIsActive: false,
      settingsDropdownIsActive: !prevState.settingsDropdownIsActive,
    }));
  };
  chooseDocument = e => {
    this.setState(prevState => ({
      addableDropdownIsActive: false,
      settingsDropdownIsActive: false,
    }));
  };

  render() {
    const {addableDropdownIsActive, settingsDropdownIsActive} = this.state;
    const {handleItemAddClick} = this.props;

    return (
        <FloatingWidgetWrapper>
          <FloatingWidgetItemWrapper onClick={this.toggleAddableDropdown}>
            <FontAwesomeIcon icon={['fal', 'plus']}/>
          </FloatingWidgetItemWrapper>
          <AddableDropdownWrapper key={'dropdown-add'}
                                  pose={addableDropdownIsActive ?
                                      'open' :
                                      'closed'}>
            <PoseGroup>
              {/*<Spacer />*/}
              {addableElements.map((item, key) => (
                  <AddableDropdownItemWrapper
                      key={key}
                      onClick={(e) => handleItemAddClick(e, item)}>
                    <div className={'text'}>
                      {item.name}
                    </div>
                    <div className={'icon'}>
                      <FontAwesomeIcon icon={['fal', item.icon]}/>
                    </div>
                  </AddableDropdownItemWrapper>
              ))}
            </PoseGroup>
          </AddableDropdownWrapper>
          <FloatingWidgetItemWrapper onClick={this.chooseDocument}>
            <FontAwesomeIcon icon={['fal', 'file-alt']}/>
          </FloatingWidgetItemWrapper>
          <FloatingWidgetItemWrapper onClick={this.toggleSettingsDropdown}>
            <FontAwesomeIcon icon={['fal', 'bars']}/>
          </FloatingWidgetItemWrapper>
          <SettingsDropdownWrapper key={'dropdown-settings'}
                                   pose={settingsDropdownIsActive ?
                                       'open' :
                                       'closed'}>
            <PoseGroup>
              {/*<Spacer />*/}
              {settingElements.map((item, key) => (
                  <SettingsDropdownItemWrapper key={key}>
                    <div className={'text'}>
                      {item.type}
                    </div>
                    <div className={'icon'}>
                      <FontAwesomeIcon icon={['fal', item.icon]}/>
                    </div>
                  </SettingsDropdownItemWrapper>
              ))}
            </PoseGroup>
          </SettingsDropdownWrapper>
        </FloatingWidgetWrapper>
    );
  }
}

export {FloatingWidget};
