import style from 'styled-components';

export const SearchBarWrapper = style.div`
  display: flex; 
  flex-direction: column;
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
  &:hover {
    cursor: pointer;
    background: #b081ff;
  }
`;

export const SearchBarOption = style.div`
  display: flex;

  label {
    margin-right: 10px;
  }
`;

export const RadioInput = style.input`
  &[type='radio']:checked {
    apperance: none;
  }
`;
