import styled from "styled-components";
import posed from "react-pose";
import { theme } from "../../../../_styles";

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

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

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

      .type {
        .type-label {
          font-size: 2em;
          margin: 1.5em 0 1em 0;  
        }
      }
      .section {
        .subsection {
          margin: 1em 0 2em 0;
          
          .subsection-label {
            font-size: 0.9em;
            // font-weight: bold;
          }
          .subsubsection {
            .subsubsection-label {
              font-size: 1em;
              // font-weight: bold;
            }
          }
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
    x: "0%",
    transition: {
      default: { duration: 300, ease: "easeOut" },
    },
  },
  closed: {
    x: "100%",
    transition: {
      default: { duration: 300, ease: "easeOut" },
    },
  },
});
