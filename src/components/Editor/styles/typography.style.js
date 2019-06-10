import styled from "styled-components";

export const Block = styled.div`
  border-radius: 5px;

  .content {
    padding: 0 1em;
  }
`;

export const OutlinedBlock = styled(Block)`
  border: 2px solid rgba(0, 0, 0, 0.2);
`;

export const BlockLabel = styled.div`
  position: relative;
  top: 5px;
  left: 5px;
  color: rgba(0, 0, 0, 0.2);
`;
