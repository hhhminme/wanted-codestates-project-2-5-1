import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import * as S from './style';

const SearchBar = () => {
  const [searchOption, setSearchOption] = useState('keyword');
  const [userInput, setUserInput] = useState('');
  const navigation = useNavigate();
  // 한글 영어만
  const regexKeyword = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
  // 숫자만
  const regexCode = /^[0-9]+$/;
  //Img_url
  const regexImg = /^[A-Z]+-+[0-9]+$/;
  const navigateToSearch = () => {
    if (userInput !== '') {
      navigation(`/search?option=${searchOption}&target=${userInput}`);
    }
  };

  const handleKeyboardControl = (event: any) => {
    if (event.keyCode === 13) {
      navigation(`/search?option=${searchOption}&target=${userInput}`);
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 키워드 검색일 경우
    if (regexKeyword.test(e.target.value)) {
      setSearchOption('keyword');
      setUserInput(e.target.value);
    }
    // url 일때
    else if (regexImg.test(e.target.value)) {
      setSearchOption('code');
      setUserInput(e.target.value);
    }
    // product_id 검색 일때
    else if (regexCode.test(e.target.value)) {
      setSearchOption('code');
      setUserInput(e.target.value);
    }
  };

  return (
    <S.SearchBarWrapper>
      <S.SearchBar>
        <S.SearchBarInput
          type="text"
          placeholder="검색어를 입력하세요..."
          onChange={(e) => handleChangeInput(e)}
          onKeyUp={(event) => handleKeyboardControl(event)}
        />
        <S.SearchBarButton onClick={() => navigateToSearch()}>검색</S.SearchBarButton>
      </S.SearchBar>
    </S.SearchBarWrapper>
  );
};

export default SearchBar;
