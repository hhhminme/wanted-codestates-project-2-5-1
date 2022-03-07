import { useSearchParams } from 'react-router-dom';

const useGetQs = () => {
  const [searchParams] = useSearchParams();
  const asideKey = searchParams.get('target');
  return { asideKey };
};

export default useGetQs;
