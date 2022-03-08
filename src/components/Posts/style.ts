import styled from 'styled-components';

export const SearchList = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15%, auto));
  grid-gap: 10px;

  @media screen and (max-width: 850px) {
    grid-template-columns: repeat(auto-fit, minmax(30%, auto));
  }
`;

export const ItemWrap = styled.div`
  background-color: white;
  border: 1px solid #c9c9c9;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0px 0px 5px 0px #e5e5e5;
`;

export const ItemImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 0.7;
  overflow: hidden;
  border-radius: 5px;
`;

export const ItemImg = styled.img`
  object-fit: cover;
  border-radius: 5px;
`;

export const ItemInfoBox = styled.div`
  margin-top: 10px;
  padding: 5px;
  display: block;
  background: #f4f4f4;
  border-radius: 5px;

  * {
    font-size: 14px;
  }
`;

export const ItemTitle = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ItemCost = styled.p`
  text-align: right;
  color: #8e4ff8;
`;

export const Hr = styled.hr`
  margin: 10px 0px;
  border-top: none;
  border-bottom: 0.5px solid lightgray;
`;

export const ErrDiv = styled.div`
  display: flex;
  justify-content: center;
`;
