import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  padding: 10px 0;
  background: white;
`;

export const ImageBox = styled.div`
  height: 50px;
  display: flex;
  margin-right: 30px;
`;

export const HeaderImage = styled.img`
  &:hover {
    cursor: pointer;
  }
`;
