import styled from 'styled-components';

export const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  width: 40vw;
`;
export const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: auto;
  margin-bottom: 15px;
  border-radius: 20px;
  box-shadow: 0px 0px 15px 0px #c8c8c8;
`;

export const SearchBarInput = styled.input`
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

export const SearchBarButton = styled.button`
  width: 75px;
  background: #8e4ff8;
  color: white;
  border-radius: 0 20px 20px 0;
  border: none;
  font-size: 14px;
  &:hover {
    cursor: pointer;
    background: #b081ff;
  }
`;

export const SearchBarOption = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;

  label {
    margin: 0 10px 0 5px;
  }
  & > *:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 550px) {
    justify-content: center;
  }
`;

export const RadioInput = styled.input.attrs({ type: 'radio' })`
  --active: #fff;
  --active-inner: #8e4ff8;
  --border: #8e4ff8;
  --background: #fff;
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 15px;
  position: relative;
  cursor: pointer;
  border: 1px solid var(--border);
  background: var(--b, var(--background));
  border-radius: 50%;
  &:after {
    content: '';
    display: block;
    left: 0;
    top: 0;
    position: absolute;
  }
  &:not(.switch) {
    width: 15px;
    &:after {
      opacity: var(--o, 0);
    }
    &:checked {
      --o: 1;
    }
  }
  &:after {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--active-inner);
    transform: scale(var(--s, 0.7));
  }
  &:checked {
    --s: 0.7;
  }
`;
