import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import * as S from './style';

const SearchBar = () => {
  const [searchOption, setSearchOption] = useState('keyword');
  const [userInput, setUserInput] = useState('');
  const navigation = useNavigate();

  return (
    <S.SearchBarWrapper>
      <S.SearchBar>
        <S.SearchBarInput
          type="text"
          placeholder="검색어를 입력하세요..."
          onChange={(event) => {
            setUserInput(event.target.value);
          }}
        />
        <S.SearchBarButton
          onClick={() => navigation(`/search?option=${searchOption}&target=${userInput}`)}
        >
          검색
        </S.SearchBarButton>
      </S.SearchBar>
      <S.SearchBarOption>
        <input
          type="radio"
          name="search"
          id="keyword"
          value="keyword"
          checked={searchOption === 'keyword'}
          onChange={(event) => setSearchOption(event.target.value)}
        />
        <label htmlFor="keyword">Keyword 검색</label>
        <input
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
