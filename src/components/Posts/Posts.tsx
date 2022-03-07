import React from 'react';
import * as S from './style';

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
  return (
    <>
      {loading && <div>loading...</div>}
      <ul>
        {posts.map((post) => (
          <S.ItemWrap key={post.product_code}>
            <S.ItemImg src={post.image_url} />
            <p>{post.price}</p>
          </S.ItemWrap>
        ))}
      </ul>
    </>
  );
};

export default Posts;
