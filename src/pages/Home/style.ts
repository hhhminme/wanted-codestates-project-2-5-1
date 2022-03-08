import styled from 'styled-components';

export const HomeWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export const HomeLogo = styled.img`
  position: fixed;
  top: 30px;
  left: 30px;
  max-width: 150px;
  width: 20vw;
`;

export const HomeBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const HomeTitle = styled.div`
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;

  span {
    font-weight: bold;
  }
`;
