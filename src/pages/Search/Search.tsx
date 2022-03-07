import React from 'react';
import Aside from '../../components/Aside';
import Pagination from '../../components/Pagination';
import useGetQs from './utils/useGetQs';

const Search = () => {
  const { target, option } = useGetQs('target', 'option');
  return (
    <div>
      {option === 'code' && target && <Aside asideKey={target} />}
      <Pagination />
    </div>
  );
};

export default Search;
