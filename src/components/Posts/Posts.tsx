import React from 'react';

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
const Posts = ({ posts, loading }: Props) => {
  const priceWithFormat = (price: number) => {
    return price.toLocaleString('ko-KR');
  };
  return (
    <>
      <S.SearchList>
        {loading && <LoadingPost />}
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
                <S.ItemTitle>{post.name}</S.ItemTitle>
                <S.ItemCost>{priceWithFormat(post.price)} 원</S.ItemCost>
              </S.ItemInfoBox>
            </S.ItemWrap>
          ))}
      </S.SearchList>
    </>
  );
};

export default Posts;
