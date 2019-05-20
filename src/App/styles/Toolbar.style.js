import styled from "styled-components";
import posed from "react-pose";
import { Link } from "react-router-dom";

export const ToolbarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: flex-start;

    width: 80px;
    background-color: chartreuse;
`;

export const ToolbarItemWrapper = styled(posed(Link)({
    active: {opacity: 1},
    inactive: {opacity: 0.5}
}))`
    background-color: white;
    margin: 1em;
`;
