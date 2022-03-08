import { useEffect, useState } from 'react';
import { getAllAsideItemApi } from '../../../api/getAllAsideItemApi';
import { Region } from '../../../api/getAllAsideItemApi/types';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { findAsideItem } from './findAsideItem';

interface StoredAsideItem {
  key: string;
  value: Region | undefined;
}
export const useGetAsideItem = (asideKey: string): [Region | undefined, boolean] => {
  const [isLoading, setIsLoading] = useState(true);
  const [storedAsideItem, setStoredAsideItem] = useLocalStorage<StoredAsideItem[] | []>(
    'region',
    [],
  );
  const [asideItem, setAsideItem] = useState<Region | undefined>(undefined);

  const callApi = async () => {
    setIsLoading(true);

    const cached = storedAsideItem.find((i) => i.key === asideKey);

    if (cached) {
      setAsideItem(cached.value);
      return setIsLoading(false);
    }

    const { data } = await getAllAsideItemApi();
    const item = findAsideItem(data, asideKey);

    setStoredAsideItem([...storedAsideItem, { key: asideKey, value: item }]);
    setAsideItem(item);
    setIsLoading(false);
  };

  useEffect(() => {
    callApi();
  }, [asideKey]);

  return [asideItem, isLoading];
};
