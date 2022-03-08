import styled from 'styled-components';

export const PageListWrap = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export const PagiButton = styled.button<{ isTarget: boolean }>`
  margin: 20px 0;
  width: 40px;
  height: 40px;
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => (props.isTarget ? '#8E4FF8' : '#d7c0ff')};

  * {
    margin: auto;
  }
`;
