import React from 'react';
import PropTypes from 'prop-types';
import {
  FormFieldWrapper,
  FormFieldTextInput,
  FormFieldSelectWrapper,
  FormFieldSelectInput,
  FormFieldSliderInput,
} from './Form.style';
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
            event.target.name = name;
            event.target.value = color.hex;
            onChange(event);
          }}
      />
  );
});