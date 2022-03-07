import { useEffect, useState } from 'react';
import { getAllAsideItemApi } from '../../../api/getAllAsideItemApi';
import { Region } from '../../../api/getAllAsideItemApi/types';
import { findAsideItem } from './findAsideItem';

export const useGetAsideItem = (asideKey: string): [Region | undefined, boolean] => {
  const [isLoading, setIsLoading] = useState(true);
  const [asideItem, setAsideItem] = useState<Region | undefined>(undefined);

  const callApi = async () => {
    setIsLoading(true);
    const { data } = await getAllAsideItemApi();
    const item = findAsideItem(data, asideKey);
    setAsideItem(item);
    setIsLoading(false);
  };

  useEffect(() => {
    callApi();
  }, [asideKey]);

  return [asideItem, isLoading];
};
