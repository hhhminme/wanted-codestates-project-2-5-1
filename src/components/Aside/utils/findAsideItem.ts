import { Region } from '../../../api/getAllAsideItemApi/types';

export const findAsideItem = (data: Region[] | undefined, asideKey: string) => {
  if (!data) return undefined;

  return (
    data.find(({ product_code }) => product_code === Number(asideKey)) ||
    data.find(({ image_url }) => image_url === asideKey)
  );
};
