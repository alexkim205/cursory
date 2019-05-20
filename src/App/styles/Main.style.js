import styled from 'styled-components';

export const MainWrapper = styled.div`
    display: flex;
    align-items: stretch;
    flex-direction: row;
    align-content: stretch;
    background-color: azure;
    flex: 1;
    box-sizing: border-box;

    .content {
        flex-grow: 1;
    }
`;