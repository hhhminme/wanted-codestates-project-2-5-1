import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 20px 10px 10px 10px;
  background: white;

  @media screen and (max-width: 550px) {
    flex-direction: column;
  }
`;

export const ImageBox = styled.div`
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 550px) {
    margin-bottom: 20px;
  }
`;

export const HeaderImage = styled.img`
  height: 80%;
  &:hover {
    cursor: pointer;
  }
`;
