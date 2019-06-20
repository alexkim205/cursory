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
  };

  componentWillReceiveProps(nextProps) {
    if (
        JSON.stringify(nextProps.childComponents) !==
        JSON.stringify(this.props.childComponents)
    ) {
      this.setState({stateChildComponents: nextProps.childComponents});
    }
  }

  onEditChild = (e, i) => {
    // i: entry number
    // e.target.name: property
    // e.target.value: property value
    const {childComponents} = this.props;
    let entries = fromJS(childComponents);

    // total widths must add up to 100 (or widthDescriptor bounds equivalent to max width)
    // assuming previous width is already at max
    // assuming e.target.name is width
    const maxWidth = widthDescriptor.bounds[1];
    const widthToChange = parseInt(e.target.value);
    const otherWidthsShouldBe = Math.floor(
        (maxWidth - widthToChange) / (entries.size - 1),
    );
    // set new widths
    for (let j = 0; j < entries.size; j++) {
      entries = entries.setIn([j, e.target.name], otherWidthsShouldBe);
    }
    entries = entries.setIn([i, e.target.name], widthToChange);

    // update state and components
    this.setState({stateChildComponents: entries.toJS()});
    this.props.onChildrenChange(e, entries.toJS());
  };
  onRemoveChild = (e, i) => {
    const {childComponents} = this.props;
    let entries = fromJS(childComponents);
    entries = entries.delete(i);
    this.setState({stateChildComponents: entries.toJS()});
    this.props.onChildrenChange(e, entries.toJS());
  };
  onAddChild = e => {
    const {childComponents} = this.props;
    let entries = fromJS(childComponents);
    // make child component that you add have width of maxWidth / # of current columns + 1
    const maxWidth = widthDescriptor.bounds[1];
    const newColumnWidth = maxWidth / (entries.size + 1);
    const otherTotalWidths = maxWidth - newColumnWidth;
    for (let j = 0; j < entries.size; j++) {
      let entryWidth = entries.getIn([j, e.target.name]);
      console.log('entryWidth', entryWidth);
      entries = entries.setIn(
          [j, e.target.name],
          Math.floor((parseInt(entryWidth) * otherTotalWidths) / maxWidth),
      );
    }
    entries = entries.concat(
        JSON.parse(
            JSON.stringify(new ContainerItemClass({width: newColumnWidth})),
        ),
    );

    this.setState({stateChildComponents: entries.toJS()});
    this.props.onChildrenChange(e, entries.toJS());
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(
  //     "should form update",
  //     nextProps.childComponents,
  //     this.props.childComponents,
  //   );
  //   return (
  //     JSON.stringify(nextProps.childComponents) !==
  //     JSON.stringify(this.props.childComponents)
  //   );
  // }

  render() {
    const {childComponents, onChildrenChange} = this.props;
    const {active} = this.state;
    const stateOrComponentChildComponentsValue =
        this.state && 'stateChildComponents' in this.state
            ? this.state.stateChildComponents
            : childComponents;
    console.log(childComponents);

    return (
        <FormFieldWrapper>
          <FormFieldCollapsibleInput>
            {stateOrComponentChildComponentsValue &&
            stateOrComponentChildComponentsValue.map((entry, i) => {
              console.log(i === active);
              const boundedValue = entry.width
                  ? Math.min(
                      Math.max(entry.width, columnWidthDescriptor.bounds[0]),
                      columnWidthDescriptor.bounds[1])
                  : columnWidthDescriptor.bounds[0];
              return (
                  <div className={'entry-container'} key={i}>
                    <div
                        className={'entry-header'}
                        onClick={() =>
                            this.setState({active: active === i ? false : i})
                        }
                    >
                      {`Column ${i}: ${boundedValue}`}
                    </div>

                    <CollapsibleEntry
                        pose={i === active ? 'active' : 'inactive'}
                        className={'entry-wrapper'}
                    >
                      <FormFieldText
                          className={'entry-content'}
                          label={'Width'}
                          name={'width'}
                          value={boundedValue}
                          onChange={e => this.onEditChild(e, i)}
                          type="text"
                          // min={columnWidthDescriptor.bounds[0]}
                          // max={columnWidthDescriptor.bounds[1]}
                          // step={columnWidthDescriptor.bounds[2]}
                          // type="range"
                      />
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
