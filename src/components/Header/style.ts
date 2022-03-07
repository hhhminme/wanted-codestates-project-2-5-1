import style from 'styled-components';

export const HeaderWrapper = style.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  margin: 10px auto;
  
`;

export const ImageBox = style.div`
  height: 50px;
  display: flex;
  margin-right: 30px;
`;

export const HeaderImage = style.img`
  &:hover {
    cursor: pointer;
  }
`;
