import React, { useEffect, useState } from 'react';

import * as S from './style';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

interface Props {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationBtn = ({ totalPages, currentPage, setCurrentPage }: Props) => {
  useEffect(() => {
    console.log(totalPages);
  });
  const [pageState, setPageState] = useState<Array<number>>([]);

  useEffect(() => {
    const arr: number[] = [];
    new Array(totalPages).fill(0).forEach((num, index) => {
      arr.push(index + 1);
    });
    console.log(arr);
    setPageState(arr);
  }, [currentPage]);

  const handlePagination = (number: number) => {
    if (number > 0 && number < totalPages + 1) {
      setCurrentPage(number);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div>
      <nav>
        <S.PageListWrap>
          <S.PagiButton onClick={() => handlePagination(currentPage - 1)} isTarget={true}>
            <GoChevronLeft />
          </S.PagiButton>
          {pageState.map((num) => (
            <li key={num}>
              <S.PagiButton
                onClick={() => {
                  if (num != currentPage) handlePagination(num);
                }}
                isTarget={currentPage === num}
              >
                {num}
              </S.PagiButton>
            </li>
          ))}
          <S.PagiButton onClick={() => handlePagination(currentPage + 1)} isTarget={true}>
            <GoChevronRight />
          </S.PagiButton>
        </S.PageListWrap>
      </nav>
    </div>
  );
};

export default PaginationBtn;
