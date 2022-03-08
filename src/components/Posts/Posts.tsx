import React from 'react';
import { useSearchParams } from 'react-router-dom';

import * as S from './style';
import LoadingPost from './LoadingPost';

type Data = {
  product_code: number;
  name: string;
  image_url: string;
  price: number;
  category_names: string[];
};

interface Props {
  posts: Data[];
  loading: boolean;
}
interface productType {
  productName: string;
}
const Posts = ({ posts, loading }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const option = searchParams.get('option');
  const target = searchParams.get('target');

  const priceWithFormat = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  const ImpactTarget = ({ productName }: productType) => {
    if (option === 'keyword' && typeof target === 'string') {
      const splitWithTarget = productName.split(target);
      return (
        <>
          {splitWithTarget.map((part, index) => {
            return part === '' ? <mark key={index}>{target}</mark> : part;
          })}
        </>
      );
    }
    return <>productName</>;
  };

  return (
    <>
      <S.SearchList>
        {loading && <LoadingPost />}
        {posts.length == 0 && <S.ErrDiv>검색 결과가 없습니다.</S.ErrDiv>}
        {!loading &&
          posts.map((post) => (
            <S.ItemWrap key={post.product_code}>
              <S.ItemImageBox>
                <S.ItemImg
                  src={post.image_url}
                  onClick={() => {
                    document.location = post.image_url;
                  }}
                />
              </S.ItemImageBox>
              <S.ItemInfoBox>
                <S.ItemTitle>
                  <ImpactTarget productName={post.name} />
                </S.ItemTitle>
                <S.ItemCost>{priceWithFormat(post.price)} 원</S.ItemCost>
              </S.ItemInfoBox>
            </S.ItemWrap>
          ))}
      </S.SearchList>
    </>
  );
};

export default Posts;
