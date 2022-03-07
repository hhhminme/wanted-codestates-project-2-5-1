import React from 'react';
import { useNavigate } from 'react-router';

import * as S from './style';
import logo from '../../assets/img/logo_pxl_b.png';
import SearchBar from '../SearchBar';

const Header = () => {
  const navigation = useNavigate();
  return (
    <S.HeaderWrapper>
      <S.ImageBox>
        <S.HeaderImage
          src={logo}
          onClick={() => {
            navigation('/');
          }}
        />
      </S.ImageBox>
      <SearchBar />
    </S.HeaderWrapper>
  );
};

export default Header;
