import styled from "styled-components";
import posed from "react-pose";
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

export const FormFieldWrapper = styled.div`
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

export const FormFieldInputBase = styled.input`
  border-radius: 5px;
  text-decoration: none;
  box-sizing: border-box;
  width: 100%;
  transition: 0.3s border;
`;

export const FormFieldTextInput = styled(FormFieldInputBase)`
  padding: 1em 1em;
  border: 2px solid ${theme.colors.light_gray};
  &:hover,
  &:focus,
  &:active {
    border: 2px solid ${theme.colors.light_dark};
  }
`;

export const FormFieldSelectWrapper = styled.div`
  position: relative;
  &:after {
    content: "▼";
    padding: 14px 8px;
    position: absolute;
    right: 10px;
    top: 0;
    z-index: 1;
    text-align: center;
    pointer-events: none;
    color: ${theme.colors.dark};
    font-size: 0.7em;
  }
`;

export const FormFieldSelectInput = styled.select`
  // Remove default styles
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &::-ms-expand {
    display: none;
  }

  border-radius: 5px;
  text-decoration: none;
  box-sizing: border-box;
  width: 100%;
  transition: 0.3s border;
  padding: 1em 1em;
  // Dropdown icon
`;

export const FormFieldCollapsibleInput = styled.div`
  display: flex
  flex-direction: column;

  .entry-container {
    width: 100%;
    height: auto;
    vertical-align: middle;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .entry-header{
      background-color: blue;
      cursor: pointer;
      width: 100%;
      padding: 1em 1em;
      box-sizing: border-box;
    }
    .entry-content{
      width: 100%;
      padding: 1em 1em;
      background-color: red;
      box-sizing: border-box;
    }
    .entry-wrapper {
      width: 100%;
    }
  }
`;

export const CollapsibleEntry = posed.div({
  inactive: {
    height: 0,
  },
  active: {
    height: "auto",
  },
});

// http://danielstern.ca/range.css/#/
export const FormFieldSliderInput = styled(FormFieldInputBase)`
  padding: 0;

  -webkit-appearance: none;
  width: 100%;
  margin: 5.5px 0;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
    background: #ffffff;
    border-radius: 25px;
    border: 0px solid rgba(0, 0, 0, 0);
  }
  &::-webkit-slider-thumb {
    box-shadow: 0.1px 0.1px 1.5px rgba(0, 0, 0, 0.77),
      0px 0px 0.1px rgba(13, 13, 13, 0.77);
    border: 0px solid #000000;
    height: 15px;
    width: 15px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5.5px;
  }
  &:focus::-webkit-slider-runnable-track {
    background: #ffffff;
  }
  &::-moz-range-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
    background: #ffffff;
    border-radius: 25px;
    border: 0px solid rgba(0, 0, 0, 0);
  }
  &::-moz-range-thumb {
    box-shadow: 0.1px 0.1px 1.5px rgba(0, 0, 0, 0.77),
      0px 0px 0.1px rgba(13, 13, 13, 0.77);
    border: 0px solid #000000;
    height: 15px;
    width: 15px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower,
  &::-ms-fill-upper {
    background: #ffffff;
    border: 0px solid rgba(0, 0, 0, 0);
    border-radius: 50px;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
  }
  &::-ms-thumb {
    box-shadow: 0.1px 0.1px 1.5px rgba(0, 0, 0, 0.77),
      0px 0px 0.1px rgba(13, 13, 13, 0.77);
    border: 0px solid #000000;
    height: 15px;
    width: 15px;
    border-radius: 50px;
    background: #ffffff;
    cursor: pointer;
    height: 4px;
  }
  &:focus {
    &::-ms-fill-lower,
    &::-ms-fill-upper {
      background: #ffffff;
    }
  }
`;
