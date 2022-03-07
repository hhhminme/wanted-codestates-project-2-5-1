import style from 'styled-components';

export const HomeWrapper = style.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

export const HomeLogo = style.img`
  position: fixed;
  top: 30px;
  left: 30px;
  max-width: 150px;
  width: 20vw;

`;

export const HomeBox = style.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  width: 80vw;

`;

export const HomeTitle = style.div`
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;

  span {
    font-weight: bold;
  }
`;
