import React from 'react';
import PropTypes from 'prop-types';
import {fromJS} from 'immutable';
import {
  FormWrapper,
  SocialButton,
  FormFieldWrapper,
  FormFieldInputBase,
  FormFieldTextInput,
  FormFieldSelectWrapper,
  FormFieldSelectInput,
  FormFieldCollapsibleInput,
  CollapsibleEntry,
  FormFieldSliderInput,
} from './Form.style';
import {ContainerItemClass} from '../../pages/AddCommunityPage/addable-components';
import {
  widthDescriptor,
  columnWidthDescriptor,
} from '../../pages/AddCommunityPage/components';
import {SketchPicker} from 'react-color';

const FormFieldHOC = Component =>
    class FormField extends React.Component {
      static propTypes = {
        label: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        type: PropTypes.string,
        placeholder: PropTypes.string,
      };

      static defaultProps = {
        label: '',
        name: '',
        value: '',
        type: 'text',
        placeholder: '',
      };

      render() {
        const {
          label,
          value,
          name,
          onChange,
          type,
          placeholder,
          ...otherProps
        } = this.props;

        return (
            <FormFieldWrapper>
              <label htmlFor={value}>{label}</label>
              <Component
                  name={name}
                  value={value}
                  onChange={onChange}
                  type={type}
                  placeholder={placeholder}
                  {...otherProps}
              />
            </FormFieldWrapper>
        );
      }
    };

export const FormFieldText = FormFieldHOC(props => (
    <FormFieldTextInput {...props} />
));
export const FormFieldSlider = FormFieldHOC(props => (
    <React.Fragment>
      <FormFieldSliderInput {...props} />
      {props.value}
    </React.Fragment>
));
export const FormFieldWidthSlider = FormFieldHOC(props => (
    <React.Fragment>
      <FormFieldSliderInput {...props} />
      {props.value}
    </React.Fragment>
));
export const FormFieldSelect = FormFieldHOC(props => {
  const {options, enums} = props;
  return (
      <FormFieldSelectWrapper>
        <FormFieldSelectInput {...props}>
          {options &&
          enums &&
          options.map((o, i) => (
              <option key={i} value={enums[i]}>
                {o}
              </option>
          ))}
        </FormFieldSelectInput>
      </FormFieldSelectWrapper>
  );
});
export const FormFieldColor = FormFieldHOC(props => {
  const {onChange, value, name, ...otherProps} = props;

  return (
      <SketchPicker
          {...otherProps}
          color={value}
          onChangeComplete={(color, event) => {
            console.log(color);
            event.target.name = name;
            event.target.value = color.hex;
            onChange(event);
          }}
      />
  );
});

// TODO: Generalize class into properties other than width
export class FormFieldCollapsibleWidth extends React.Component {
  static propTypes = {
    childComponents: PropTypes.array.isRequired,
    onChildrenChange: PropTypes.func.isRequired,
  };
  state = {
    active: false,
    width: 25,
  };

  componentWillReceiveProps(nextProps) {
    if (
        JSON.stringify(nextProps.childComponents) !==
        JSON.stringify(this.props.childComponents)
    ) {
      this.setState({stateChildComponents: nextProps.childComponents});
    }
  }

  boundWidthValue = (width) => Math.max(Math.min(width, columnWidthDescriptor.bounds[1]), columnWidthDescriptor.bounds[0])

  updateColumnStates = (event, entries) => {
    // update state and components
    this.setState({stateChildComponents: entries.toJS()});
    this.props.onChildrenChange(event, entries.toJS());
  }

  balanceWidths = (entries, indexOfImmutableColumn=null) => {
    const size = entries.size
    if (size > 4) throw "Too many columns!";

    const maxWidth = columnWidthDescriptor.bounds[1];
    const smallestWidth = Math.floor(maxWidth/4);
    let widthSoFar = 0;
    let widths = [];

    // Is there a better way to do this in Immutable without two passes?
    // add up all widths first
    for (let j = 0; j < size; j++) {
      const entryWidthJ = entries.getIn([j, 'width'])
      widths.push(entryWidthJ)
      widthSoFar += entryWidthJ
    }
    console.log("old widths", widths)
    
    if (indexOfImmutableColumn) {
      // when adding column, editing column
      if ((size - 1) * smallestWidth + widths[indexOfImmutableColumn] > maxWidth) {
        // if all other columns are 25, can the specified width still exist?
        // i.e. [25, 40, 80], index = 2; should be set to [25, 25, 50]
        widths = widths.map((v, i) => i === indexOfImmutableColumn ? maxWidth - smallestWidth * (size-1) : smallestWidth)
      } else {
        if (widths[indexOfImmutableColumn] > smallestWidth) {
          // i.e. [25, 30, 40], index = 2; should be set to [25*60/55, 40*60/55, 40]
          const newOtherTotalWidths = maxWidth - widths[indexOfImmutableColumn]
          const oldOtherTotalWidths = widthSoFar - widths[indexOfImmutableColumn]
          widths = widths.map((v, i) => i === indexOfImmutableColumn ? v : Math.floor(v*newOtherTotalWidths/oldOtherTotalWidths))
        } else {
          if (size === 1) {
            widths = [100]
          } else if (size === 2) {
            // i.e. [25, 15], index = 1; should be set to [75, 25]
            widths = widths.map((v, i) => i === indexOfImmutableColumn ? smallestWidth : maxWidth - smallestWidth);
          } else if (size === 3) {
            const newOtherTotalWidths = maxWidth - smallestWidth
            const oldOtherTotalWidths = widthSoFar - widths[indexOfImmutableColumn]
            // i.e. [25, 30, 15], index = 2; should be set to []
            if (oldOtherTotalWidths > newOtherTotalWidths) {
              // i.e. [42, 43, 15], index = 2; should be set to []
              // i.e. [25, 60, 15], index = 2; should be set to []
              widths = widths.map((v, i) => i === indexOfImmutableColumn ? smallestWidth : this.boundWidthValue(v*newOtherTotalWidths/oldOtherTotalWidths))
              if (widths.reduce((a,b) => a + b, 0) > maxWidth) {
                widths = widths.map((v, i) => v !== smallestWidth ? smallestWidth * 2 : v)
              }
            } else {
              // i.e. [25, 30, 15], index = 2; should be set to [25*75/55, 30*75/55, 25]
              widths = widths.map((v, i) => i === indexOfImmutableColumn ? v : Math.floor(v*newOtherTotalWidths/oldOtherTotalWidths))
            }
          } else if (size === 4) {
            widths = [25, 25, 25, 25]
          }
        }
      }
    } else {
      console.log("TOO")
      // when removing column
      widths = widths.map((v) => Math.floor(v*maxWidth/widthSoFar))
    }

    console.log("new widths", widths)
    // set new widths with balanced widths list
    for (let k = 0; k < size; k++) {
      entries = entries.setIn([k, 'width'], widths[k])
    }

    return entries;
  }

  onEditChild = (e, newWidth, i) => {
    // i: entry number
    // e.target.name: property
    // e.target.value: property value
    const {childComponents} = this.props;
    let entries = fromJS(childComponents);

    // total widths must add up to 100 (or widthDescriptor bounds equivalent to max width)
    // assuming previous width is already at max
    // assuming e.target.name is width
    const widthToChange = this.boundWidthValue(parseInt(newWidth));
    entries = entries.setIn([i, 'width'], widthToChange)
    entries = this.balanceWidths(entries, i)

    // set new value to show in text input
    this.setState({'width': entries.getIn([i, 'width'])})
    this.updateColumnStates(e, entries)
  };
  onRemoveChild = (e, i) => {
    const {childComponents} = this.props;
    let entries = fromJS(childComponents);
    entries = entries.delete(i);
    entries = this.balanceWidths(entries)

    this.setState({'active': Math.max(0, i-1), 'width': entries.getIn([Math.max(0, i-1), 'width'])})
    this.updateColumnStates(e, entries)
  };
  onAddChild = e => {
    const {childComponents} = this.props;
    let entries = fromJS(childComponents);
    // make child component that you add have width of maxWidth / # of current columns + 1
    const newColumnWidth = columnWidthDescriptor.bounds[1] / 4;
    // add new column
    entries = entries.concat(JSON.parse(JSON.stringify(new ContainerItemClass({width: newColumnWidth}))));
    entries = this.balanceWidths(entries, entries.size-1)

    this.setState({'active': entries.size-1, 'width': entries.getIn([entries.size-1, 'width'])})
    this.updateColumnStates(e, entries)
  };

  onChange = (e) => {
    this.setState({'width': e.target.value})
  };

  render() {
    const {childComponents, onChildrenChange} = this.props;
    const {active} = this.state;
    const stateOrComponentChildComponentsValue =
        this.state && 'stateChildComponents' in this.state
            ? this.state.stateChildComponents
            : childComponents;

    return (
        <FormFieldWrapper>
          <FormFieldCollapsibleInput>
            {stateOrComponentChildComponentsValue &&
            stateOrComponentChildComponentsValue.map((entry, i) => {

              // restricting to min and max widths
              // const boundedValue = entry.width
              //     ? entry.width
              //     : columnWidthDescriptor.bounds[0];

              return (
                  <div className={'entry-container'} key={i}>
                    <div
                        className={'entry-header'}
                        onClick={() =>
                            this.setState({active: active === i ? false : i})
                        }
                    >
                      {`Column ${i}: ${entry.width}`}
                    </div>

                    <CollapsibleEntry
                        pose={i === active ? 'active' : 'inactive'}
                        className={'entry-wrapper'}
                    >
                      <div>
                        <FormFieldText
                            className={'entry-content'}
                            label={'Width'}
                            name={'width'}
                            value={this.state.width}
                            onChange={e => this.onChange(e)}
                            type="text"
                        />
                        <button onClick={e => this.onEditChild(e, this.state.width, i)}>Change</button>
                        <button onClick={e => this.onRemoveChild(e, i)}>Remove</button>
                      </div>

                    </CollapsibleEntry>
                  </div>
              );
            })}
            {childComponents && childComponents.length < 4 &&
            <button onClick={this.onAddChild}>Add</button>}
          </FormFieldCollapsibleInput>
        </FormFieldWrapper>
    );
  }
}
