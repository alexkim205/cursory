import styled from 'styled-components';
import posed from 'react-pose';


export const ProfileBarWrapper = posed(styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  border: 2px solid #F3F4F8;
  border-radius: 5px;
  padding: 3px 0;
  // width: 150px;
  
  .icon{
    width: 30px;
    height: 30px;
    margin: auto 0.5em auto 1em;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    background-color: #F3F4F8
  }
  .name{
    margin: auto 1em auto 0.5em;
  }
`)({
  hoverable: true,
  init: {
    backgroundColor: '#ffffff',
    transition: {duration: 200}
  },
  hover: {
    backgroundColor: '#F3F4F8',
    transition: {duration: 200}
  }
})

export const Spacer = styled.div`
  position: absolute;
  // display: block;
  top: -30px;
  background-color: red;
  width: 250px;
  height: 40px;
`
