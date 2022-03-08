import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

import * as S from './style';
import Posts from '../Posts';
import PaginationBtn from '../PaginationBtn';

type ProdData = {
  product_code: number;
  name: string;
  image_url: string;
  price: number;
  category_names: string[];
};

type RegionsData = {
  product_code: number;
  region_id: number;
  image_url: string;
  gender: string;
  attributes: [RegionsAttr];
  category_names: string[];
};

interface RegionsAttr {
  style: string;
  season: string;
  occasion: string;
  fabric: string;
  sense: string;
  pattern: string;
}

const Pagination = () => {
  const [posts, setPosts] = useState<ProdData[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(60);

  const [prodData, setProdData] = useState<ProdData[]>([]);
  const [regionData, setRegionData] = useState<RegionsData[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const option = searchParams.get('option');
  const target = searchParams.get('target');

  const fetchProdData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://static.pxl.ai/problem/data/products.json');
      setProdData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // 쓰진 않는다.
  const fetchRegionData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://static.pxl.ai/problem/data/regions.json');
      setRegionData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdData();
    // fetchRegionData();
  }, []);

  useEffect(() => {
    // production.json 값이 없음
    if (!prodData) {
      console.log(prodData);
      return;
    }
    // regions.json 값이 없음
    if (!regionData) {
      console.log(regionData);
      return;
    }

    switch (option) {
      // 키워드 검색
      case 'keyword':
        if (target) {
          const filteredArr: ProdData[] = [];
          prodData.map((value) => {
            if (value.name.includes(target)) {
              filteredArr.push(value);
            }
          });
          setPosts(filteredArr);
        } else {
          console.log('err');
        }
        break;
      // url 혹은 product_id 검색
      case 'code':
        if (target) {
          // url 검색 일때
          if (target.includes('https://static.pxl.ai/problem/images')) {
            const filteredArr: ProdData[] = [];
            let prodName = '';
            // url에 해당하는 아이템의 name을 찾는다.
            prodData.map((value) => {
              if (value.image_url === target) {
                prodName = value.name;
              }
            });
            if (prodName) {
              const tmpSplitArr = prodName.split('_', 1);
              prodName = tmpSplitArr[0];
              prodData.map((value) => {
                if (value.name.includes(prodName)) {
                  filteredArr.push(value);
                }
              });
            }
            setPosts(filteredArr);
            // product_id 검색일때
          } else if (!isNaN(Number(target))) {
            const filteredArr: ProdData[] = [];
            let prodName = '';
            // product_id에 해당하는 아이템의 name을 찾는다.
            prodData.map((value) => {
              if (value.product_code === Number(target)) {
                prodName = value.name;
              }
            });
            if (prodName) {
              const tmpSplitArr = prodName.split('_', 1);
              prodName = tmpSplitArr[0];
              prodData.map((value) => {
                if (value.name.includes(prodName)) {
                  filteredArr.push(value);
                }
              });
            }
            setPosts(filteredArr);
          }
        }
        break;
      default:
        console.log(`${option} error`);
    }
  }, [prodData, regionData, option, target]);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = (tmp: ProdData[]) => {
    const currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  return (
    <S.PostsWrapper>
      <Posts posts={currentPosts(posts)} loading={loading}></Posts>
      {posts.length && (
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
