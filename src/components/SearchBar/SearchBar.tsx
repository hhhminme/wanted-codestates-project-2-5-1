import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import * as S from './style';

const SearchBar = () => {
  const [searchOption, setSearchOption] = useState('keyword');
  const [userInput, setUserInput] = useState('');
  const navigation = useNavigate();

  const handleKeyboardControl = (event: any) => {
    console.log(event.keyCode);
    if (event.keyCode === 13) {
      navigation(`/search?option=${searchOption}&target=${userInput}`);
    }
  };

  return (
    <S.SearchBarWrapper>
      <S.SearchBar>
        <S.SearchBarInput
          type="text"
          placeholder="검색어를 입력하세요..."
          onChange={(event) => {
            setUserInput(event.target.value);
          }}
          onKeyUp={(event) => handleKeyboardControl(event)}
        />
        <S.SearchBarButton
          onClick={() => navigation(`/search?option=${searchOption}&target=${userInput}`)}
        >
          검색
        </S.SearchBarButton>
      </S.SearchBar>
      <S.SearchBarOption>
        <S.RadioInput
          type="radio"
          name="search"
          id="keyword"
          value="keyword"
          checked={searchOption === 'keyword'}
          onChange={(event) => setSearchOption(event.target.value)}
        />
        <label htmlFor="keyword">Keyword 검색</label>
        <S.RadioInput
          type="radio"
          name="search"
          id="code"
          value="code"
          checked={searchOption === 'code'}
          onChange={(event) => setSearchOption(event.target.value)}
        />
        <label htmlFor="code">제품 코드검색</label>
      </S.SearchBarOption>
    </S.SearchBarWrapper>
  );
};

export default SearchBar;
