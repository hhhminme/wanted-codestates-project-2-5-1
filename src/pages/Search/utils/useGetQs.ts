import { useLocation } from 'react-router';
import { parseQueryString } from '../utils';

const useGetQs = () => {
  const { search } = useLocation();

  const { asideKey } = parseQueryString(search);
  return { asideKey };
};

export default useGetQs;
