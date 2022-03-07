import React from 'react';
import * as S from './style';

interface Props {
  postsPerPage: number;
  totalPosts: number;
  paginate: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationBtn = ({ postsPerPage, totalPosts, paginate }: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav>
        <S.PageListWrap>
          {pageNumbers.map((num) => (
            <li key={num}>
              <span onClick={() => paginate(num)}>{num}</span>
            </li>
          ))}
        </S.PageListWrap>
      </nav>
    </div>
  );
};

export default PaginationBtn;
