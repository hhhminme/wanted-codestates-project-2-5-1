import axios from 'axios';
import React, { useEffect, useState } from 'react';
import * as S from 'styled-components';
const Pagination = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await axios.get('https://static.pxl.ai/problem/data/regions.json');
      setPosts(response.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return <div>Pagination</div>;
};

export default Pagination;
