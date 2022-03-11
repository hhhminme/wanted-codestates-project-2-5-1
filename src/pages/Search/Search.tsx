import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Aside from '../../components/Aside';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import useGetQs from './utils/useGetQs';
import { ProdData } from './type';
import * as S from './style';

const Search = () => {
  const { target, option } = useGetQs('target', 'option');

  const [posts, setPosts] = useState<ProdData[]>([]);
  const [loading, setLoading] = useState(false);
  const [prodData, setProdData] = useState<ProdData[]>([]);
  const regexImg = /^[A-Z]+-+[0-9]+$/;

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
  useEffect(() => {
    fetchProdData();
  }, []);

  useEffect(() => {
    // production.json 값이 없음
    if (!prodData) {
      console.log(prodData);
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
          if (regexImg.test(target)) {
            const filteredArr: ProdData[] = [];
            let prodName = '';
            // url에 해당하는 아이템의 name을 찾는다.
            prodData.map((value) => {
              if (value.image_url.includes(target)) {
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
  }, [prodData, option, target]);

  return (
    <div>
      <Header loading={loading} />
      <S.SearchWrapper>
        {option === 'code' && target && posts.length > 0 && <Aside asideKey={target} />}
        <Pagination posts={posts} loading={loading} />
      </S.SearchWrapper>
    </div>
  );
};

export default Search;
