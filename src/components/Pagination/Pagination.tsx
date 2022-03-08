import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import * as S from './style';
import Posts from '../Posts';
import PaginationBtn from '../PaginationBtn';
import { ProdData } from '../../pages/Search/type';

interface Props {
  posts: ProdData[];
  loading: boolean;
}

const Pagination = ({ posts, loading }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(60);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (tmp: ProdData[]) => {
    const currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  return (
    <S.PostsWrapper>
      <Posts posts={currentPosts(posts)} loading={loading}></Posts>
      {posts.length > 0 && (
        <PaginationBtn
          totalPages={Math.ceil(posts.length / postsPerPage)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </S.PostsWrapper>
  );
};

export default Pagination;
