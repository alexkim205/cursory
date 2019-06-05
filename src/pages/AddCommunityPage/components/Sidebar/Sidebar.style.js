import styled from 'styled-components';
import posed from 'react-pose';
import {theme} from '../../../../_styles';

export const SidebarWrapper = posed(styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: ${theme.colors.dark};
  top: 0;
  right: 0;
  width: 340px;
  height: 100%;
  overflow: scroll;
  
  color: white;
  
  .form-wrapper {
    height: 100%;
    display: inherit;
    flex-direction: inherit;
    justify-content: space-between;
  
    .tabs {
      display: flex;
      flex-direction: row;
      height: 50px;
      .tab {
        width: 50px;
      }
    }
    .main {
      display: flex;
      flex-direction: column;
      padding: 0 2.1em;
      flex: 1;
      
      .type {}
      .section {
        .subsection {
          .subsubsection {}
        }
      }
    }
    .submit {
      height: 50px;
    }
  
  }
  
`)({
  open: {
    delay: 100,
    x: '0%',
    transition: {
      default: { duration: 300,  ease: 'easeOut'},
    }
  },
  closed: {
    x: '100%',
    transition: {
      default: { duration: 300, ease: 'easeOut' },
    }
  },
});
