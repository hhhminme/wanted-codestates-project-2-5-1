import React, { useEffect, useState } from 'react';

import * as S from './style';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

interface Props {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationBtn = ({ totalPages, currentPage, setCurrentPage }: Props) => {
  const [pageState, setPageState] = useState<Array<number>>([]);
  const lastPagiNation = [
    totalPages - 4,
    totalPages - 3,
    totalPages - 2,
    totalPages - 1,
    totalPages,
  ];
  const firstPagiNation = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (currentPage - 4 < 0) {
      setPageState(firstPagiNation);
    } else if (currentPage + 4 > totalPages) {
      setPageState(lastPagiNation);
    } else {
      setPageState([
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ]);
    }
  }, [currentPage]);

  const prevPageGroup = () => {
    if (pageState[0] < 8) {
      setPageState(firstPagiNation);
    } else {
      const copyPageState: number[] = [];
      pageState.forEach((i) => {
        copyPageState.push(i - 5);
      });
      setPageState(copyPageState);
    }
  };

  const nextPageGroup = () => {
    if (pageState[4] > 31) {
      setPageState(lastPagiNation);
    } else {
      const copyPageState: number[] = [];
      pageState.forEach((i) => {
        copyPageState.push(i + 5);
      });
      setPageState(copyPageState);
    }
  };

  return (
    <div>
      <nav>
        <S.PageListWrap>
          <S.PagiButton onClick={() => prevPageGroup()} isTarget={true}>
            <GoChevronLeft />
          </S.PagiButton>
          {pageState.map((num) => (
            <li key={num}>
              <S.PagiButton
                onClick={() => {
                  setCurrentPage(num);
                  window.scrollTo(0, 0);
                }}
                isTarget={currentPage === num}
              >
                {num}
              </S.PagiButton>
            </li>
          ))}
          <S.PagiButton onClick={() => nextPageGroup()} isTarget={true}>
            <GoChevronRight />
          </S.PagiButton>
        </S.PageListWrap>
      </nav>
    </div>
  );
};

export default PaginationBtn;
