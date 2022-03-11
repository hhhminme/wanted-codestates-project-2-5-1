import { filterCategoryC1 } from './utils/filterCategoryC1';
import { useGetAsideItem } from './utils/useGetAsideItem';
import * as S from './style';
import { transAttribute } from './utils/transAttribute';
import LoadingAside from './LoadingAside';

interface Aside {
  asideKey: string;
}
const Aside = ({ asideKey }: Aside) => {
  const [data, isLoading] = useGetAsideItem(asideKey);

  return (
    <S.Wrapper>
      {isLoading && <LoadingAside />}
      {!isLoading && !data && <></>}
      {!isLoading && data && (
        <>
          <S.Img src={data.image_url} />
          <S.H1>ITEMS</S.H1>
          <S.CateUl>
            {filterCategoryC1(data.category_names).map((v, idx) => (
              <S.CateLi key={idx}>{v}</S.CateLi>
            ))}
          </S.CateUl>
          <S.Hr />
          <S.H1>Attributes</S.H1>
          <S.AttrUl>
            {transAttribute(data).map(([key, value], idx) => (
              <S.AttrLi key={idx}>
                <S.AttrKey>{`#${key}`}</S.AttrKey>
                <S.AttrVal>{value}</S.AttrVal>
              </S.AttrLi>
            ))}
          </S.AttrUl>
        </>
      )}
    </S.Wrapper>
  );
};
export default Aside;
