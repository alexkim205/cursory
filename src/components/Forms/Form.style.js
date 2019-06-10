import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme } from "../../_styles";

export const FormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: white;
  box-shadow: ${theme.shadows.light};
  border-radius: 5px;
  overflow: hidden;
  padding: 1.4em 2.1em;
  text-align: left;

  .social-forms {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin: 1.3em 0 1em 0;

    form {
      width: 40px;
    }
  }

  .error,
  button {
    border-radius: 5px;
    border: none;
    padding: 1.2em 1.2em;
    text-decoration: none;
    box-sizing: border-box;
    margin-top: 1.2em;
    width: 100%;
  }

  .error {
    border: 2px solid ${theme.colors.error};
    margin-bottom: 0.6em;
    color: ${theme.colors.error};
    width: 100%;
  }

  button {
    color: white;
    // cursor: pointer;
    margin-bottom: 0.5em;
    background-color: ${theme.colors.light_main};
    transition: 0.2s all;

    &:hover,
    &:focus,
    &:active {
      background-color: ${theme.colors.main};
    }
  }
`;

export const SocialButton = styled.button`
  width: 40px !important;
  height: 40px !important;
  padding: 0 !important;
  margin: 0 !important;
  color: ${props => props.color} !important;
  background-color: white !important;
  transition: 0.3s all;
`;

const FormFieldWrapper = styled.div`
  // background-color: ;
  display: flex;
  flex-direction: column;
  padding: 1em 0 0.2em 0;
  margin-bottom: 0.4em;

  label {
    margin-bottom: 0.4em;
    // color: white;
  }
`;

const FormFieldInputBase = styled.input`
  border-radius: 5px;
  text-decoration: none;
  box-sizing: border-box;
  width: 100%;
  transition: 0.3s border;
`;

const FormFieldTextInput = styled(FormFieldInputBase)`
  padding: 1.2em 1.2em;
  border: 2px solid ${theme.colors.light_gray};
  &:hover,
  &:focus,
  &:active {
    border: 2px solid ${theme.colors.light_dark};
  }
`;

const FormFieldSelectInput = styled.select`
  border-radius: 5px;
  text-decoration: none;
  box-sizing: border-box;
  width: 100%;
  transition: 0.3s border;
  padding: 1.2em 1.2em;
`;

const FormFieldSliderInput = styled(FormFieldInputBase)`
  padding: 0;

  -webkit-appearance: none;
  width: 100%;
  margin: 10px 0;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
    background: #ffffff;
    border-radius: 14.6px;
    border: 0px solid #ffffff;
  }
  &::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
    border: 0px solid rgba(0, 0, 0, 0);
    height: 28px;
    width: 8px;
    border-radius: 5px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -10px;
  }
  &:focus::-webkit-slider-runnable-track {
    background: #ffffff;
  }
  &::-moz-range-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
    background: #ffffff;
    border-radius: 14.6px;
    border: 0px solid #ffffff;
  }
  &::-moz-range-thumb {
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
    border: 0px solid rgba(0, 0, 0, 0);
    height: 28px;
    width: 8px;
    border-radius: 5px;
    background: #ffffff;
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: #f2f2f2;
    border: 0px solid #ffffff;
    border-radius: 29.2px;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
  }
  &::-ms-fill-upper {
    background: #ffffff;
    border: 0px solid #ffffff;
    border-radius: 29.2px;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
  }
  &::-ms-thumb {
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
    border: 0px solid rgba(0, 0, 0, 0);
    height: 28px;
    width: 8px;
    border-radius: 5px;
    background: #ffffff;
    cursor: pointer;
    height: 8px;
  }
  &:focus {
    &::-ms-fill-lower,
    &::-ms-fill-upper {
      background: #ffffff;
    }
  }
`;

const FormFieldHOC = Component =>
  class FormField extends React.Component {
    static propTypes = {
      label: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.string,
      onChange: PropTypes.func.isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string
    };

    static defaultProps = {
      label: "",
      name: "",
      value: "",
      type: "text",
      placeholder: ""
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
export const FormFieldSelect = FormFieldHOC(props => {
  const { options, enums } = props;
  return (
    <React.Fragment>
      <FormFieldSelectInput {...props}>
        {options &&
          enums &&
          options.map((o, i) => (
            <option key={i} value={enums[i]}>
              {o}
            </option>
          ))}
      </FormFieldSelectInput>
    </React.Fragment>
  );
});
