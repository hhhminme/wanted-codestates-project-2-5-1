import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import * as S from 'styled-components';
import Posts from '../Posts';
import PaginationBtn from '../PaginationBtn';

type Data = {
  product_code: number;
  name: string;
  image_url: string;
  price: number;
  category_names: string[];
};

const Pagination = () => {
  const [posts, setPosts] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(70);

  const [searchParams, setSearchParams] = useSearchParams();
  const option = searchParams.get('option');
  const target = searchParams.get('target');

  useEffect(() => {
    const fetchKeywordData = async (target: string) => {
      setLoading(true);
      try {
        const { data } = await axios.get('https://static.pxl.ai/problem/data/products.json');
        // data.map((value,idx) =>)
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    if (option) {
      switch (option) {
        case 'keyword':
          console.log(option + 'keyword!');
          if (target) {
            fetchKeywordData(target);
          }

          break;
        case 'code':
          console.log(option + 'keyword!');
          break;
        default:
          console.log('err');
      }
    }
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (tmp: Data[]) => {
    const currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  return (
    <div>
      <Posts posts={currentPosts(posts)} loading={loading}></Posts>
      <PaginationBtn
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default Pagination;
