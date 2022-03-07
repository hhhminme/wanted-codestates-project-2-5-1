import React from 'react';

import * as S from './style';
import logo from '../../assets/img/logo_pxl_b.png';
import SearchBar from '../../components/SearchBar';

function Home() {
  return (
    <S.HomeWrapper>
      <S.HomeLogo src={logo} />
      <S.HomeBox>
        <S.HomeTitle>
          <span>Artificial Intelligence</span>
          <br />
          PXL <span>Fashion</span> Viewer
        </S.HomeTitle>
        <SearchBar />
      </S.HomeBox>
    </S.HomeWrapper>
  );
}

export default Home;
