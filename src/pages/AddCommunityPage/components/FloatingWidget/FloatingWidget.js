import React from 'react';
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
import {elements} from '../../addable-components/addable-elements';
import {settings} from '../../addable-components/setting-elements';
import {Spacer} from '../../../../components/Navigation/styles/ProfileBar.style';
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
  addElement = e => {

  }

  render() {
    const {addableDropdownIsActive, settingsDropdownIsActive} = this.state;

    return (
        <FloatingWidgetWrapper>
          <FloatingWidgetItemWrapper onClick={this.toggleAddableDropdown}>
            <FontAwesomeIcon icon={['fal', 'plus']}/>
          </FloatingWidgetItemWrapper>
          <AddableDropdownWrapper key={'dropdown'}
                                  pose={addableDropdownIsActive ?
                                      'open' :
                                      'closed'}>
            <PoseGroup>
              {/*<Spacer />*/}
              {elements.map((item, key) => (
                  <AddableDropdownItemWrapper key={key}>
                    <div className={'text'}>
                      {item.type}
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
          <SettingsDropdownWrapper key={'dropdown'}
                                   pose={settingsDropdownIsActive ?
                                       'open' :
                                       'closed'}>
            <PoseGroup>
              {/*<Spacer />*/}
              {settings.map((item, key) => (
                  <SettingsDropdownItemWrapper key={key} onClick={}>
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
