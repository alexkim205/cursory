import styled from 'styled-components';
import posed from 'react-pose';

export const SidebarWrapper = posed(styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: lightblue;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
`)({
  open: {
    x: '0%',
    transition: {
      default: { duration: 200,  ease: 'easeIn'},
    }
  },
  closed: {
    x: '100%',
    transition: {
      default: { duration: 200, ease: 'easeIn' },
    }
  },
});
