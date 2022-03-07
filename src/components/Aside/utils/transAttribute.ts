import { Region } from '../../../api/getAllAsideItemApi/types';

export const transAttribute = (data: Region) => {
  return data.attributes.map((v: any): [string, string] => {
    const [key, value] = Object.entries(v)[0];
    return [key, value as string];
  });
};
