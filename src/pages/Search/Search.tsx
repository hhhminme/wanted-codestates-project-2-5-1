import React from 'react';
import Aside from '../../components/Aside';
import Pagination from '../../components/Pagination';
import useGetQs from './utils/useGetQs';

const Search = () => {
  const { asideKey } = useGetQs();

  return (
    <div>
      {asideKey && <Aside asideKey={asideKey} />}
      <Pagination />
    </div>
  );
};

export default Search;
