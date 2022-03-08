import { Region } from '../../../api/getAllAsideItemApi/types';
import { isNumber } from './isNumber';

export const findAsideItem = (data: Region[] | undefined, asideKey: string) => {
  if (!data) return undefined;

  return isNumber(asideKey)
    ? data.find(({ product_code }) => product_code === Number(asideKey))
    : data.find(({ image_url }) => image_url.includes(asideKey));
};
