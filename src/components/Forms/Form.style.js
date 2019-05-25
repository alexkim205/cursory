import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {theme} from '../../_styles';

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
  
  .error, button {
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
    cursor: pointer;
    margin-bottom: 0.5em;
    background-color: ${theme.colors.light_main};
    transition: 0.2s all;
    
    &:hover, &:focus, &:active {
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
  
  &:hover, &:focus, &:active {
    transform: scale(1.08);
  }
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
  
  input {
    border-radius: 5px;
    text-decoration: none;
    padding: 1.2em 1.2em;
    text-decoration: none;
    box-sizing: border-box;
    width: 100%;
    border: 2px solid ${theme.colors.light_gray};
    transition: 0.3s border;
    
    &:hover, &:focus, &:active {
      border: 2px solid ${theme.colors.light_dark};
    }
  }
`;

export class FormField extends React.Component {
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
    const {label, name, value, onChange, type, placeholder} = this.props;

    return (
        <FormFieldWrapper>
          <label htmlFor={value}>{label}</label>
          <input
              name={name}
              value={value}
              onChange={onChange}
              type={type}
              // placeholder={placeholder}
          />
        </FormFieldWrapper>
    );
  }

}
