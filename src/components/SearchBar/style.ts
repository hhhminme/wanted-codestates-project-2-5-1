import style from 'styled-components';

export const SearchBarWrapper = style.div`
  display: flex; 
  flex-direction: column;
  max-width: 700px;
  width: 80vw;
`;
export const SearchBar = style.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: auto;
  margin-bottom: 15px;
  border-radius: 20px;
  box-shadow: 0px 0px 15px 0px #c8c8c8;
`;

export const SearchBarInput = style.input`
  width: calc(100% - 75px);
  height: 40px;
  font-size: 14px;
  padding: 0 25px;
  border-radius: 20px 0 0 20px;
  border: none;

  &:focus {
    outline: none;
  }
`;

export const SearchBarButton = style.button`
  width: 75px;
  background: #8E4FF8;
  color: white;
  border-radius: 0 20px 20px 0;
  border: none;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    background: #b081ff;
  }
`;

export const SearchBarOption = style.div`
  display: flex;
  align-items: center;
  font-size: 14px;

  label {
    margin: 0 10px 0 5px;
  }
  &>*:hover{
    cursor: pointer;
  }
`;

export const RadioInput = style.input`
`;
