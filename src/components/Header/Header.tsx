import React from 'react';

import * as S from './style';
import logo from '../../assets/img/logo_pxl_b.png';
import SearchBar from '../SearchBar';

const Header = () => {
  return (
    <S.HeaderWrapper>
      <S.HeaderImage src={logo} />
      <SearchBar />
    </S.HeaderWrapper>
  );
};

export default Header;
