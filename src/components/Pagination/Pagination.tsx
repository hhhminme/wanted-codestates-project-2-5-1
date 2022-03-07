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
  const [posts, setPosts] = useState<Data[]>([]);
  const [regionsData, setRegionsData] = useState<RegionsData[]>([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(70);

  const [searchParams, setSearchParams] = useSearchParams();
  const option = searchParams.get('option');
  const target = searchParams.get('target');

  const fetchKeywordData = async (target: string, stat: string) => {
    setLoading(true);
    const filteredArray: Data[] = [];
    try {
      const { data } = await axios.get('https://static.pxl.ai/problem/data/products.json');
      console.log(data);
      switch (stat) {
        case 'keyword': {
          data.map((value: Data) => {
            if (value.name.includes(target)) {
              filteredArray.push(value);
            }
          });
          break;
        }
        case 'img': {
          let itemName = '';
          data.map((value: Data) => {
            if (value.image_url === target) {
              // axios
              //   .get('https://static.pxl.ai/problem/data/products.json')
              //   .then(({ data }) =>
              //     data.map((val: Data) => {
              //       if (val.name.includes(target)) {
              //         filteredArray.push(val);
              //       }
              //     }),
              //   )
              //   .catch();
              itemName = value.name;
              return;
            }
          });
          data.map((value: Data) => {
            if (value.name.includes(itemName)) {
              filteredArray.push(value);
            }
          });
          console.log(filteredArray);
          break;
        }
      }

      setPosts(filteredArray);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const fetchCodeData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://static.pxl.ai/problem/data/regions.json');
      setRegionsData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (option) {
      switch (option) {
        case 'keyword':
          console.log(option + ' keyword!');
          if (target) {
            fetchKeywordData(target, 'keyword');
          }
          break;
        case 'code':
          console.log(option + ' code!');
          if (target) {
            if (target.includes('https://static.pxl.ai/problem/images')) {
              console.log('이미지 ' + target);

              fetchCodeData();
              regionsData.map((value: RegionsData) => {
                if (value.image_url === target) {
                  fetchKeywordData(target, 'img');
                }
              });
            } else if (!isNaN(Number(target))) {
              console.log('숫자임 ' + target);
            } else {
              console.log('키워드임 ' + target);
            }
          }
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
