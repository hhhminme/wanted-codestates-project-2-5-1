import React from 'react';
import Aside from '../../components/Aside';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import useGetQs from './utils/useGetQs';

import * as S from './style';

const Search = () => {
  const { target, option } = useGetQs('target', 'option');
  return (
    <div>
      <Header />
      <S.SearchWrapper>
        {option === 'code' && target && <Aside asideKey={target} />}
        <Pagination />
      </S.SearchWrapper>
    </div>
  );
};

export default Search;
