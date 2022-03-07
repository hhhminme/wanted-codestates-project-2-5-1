import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  gap: 20px;
  width: 320px;
  box-sizing: border-box;
`;
export const Img = styled.img`
  object-fit: cover;
  width: inherit;
`;
export const H1 = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

export const CateUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
export const CateLi = styled.li`
  display: inline-block;
  background-color: #bb78ff;
  color: white;
  font-size: 16px;
  padding: 4px 8px;
`;
export const Hr = styled.hr`
  margin: 10px 0px;
  border-top: none;
  border-bottom: 0.5px solid lightgray;
`;

export const AttrLi = styled.li`
  display: flex;
  flex-direction: column;
`;
export const AttrUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
export const AttrKey = styled.h2`
  font-size: 16px;
  font-weight: bold;
  color: #bb78ff;
`;

export const AttrVal = styled.h3`
  font-size: 14px;
`;
