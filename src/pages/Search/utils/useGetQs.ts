import { useSearchParams } from 'react-router-dom';

interface ParseQs {
  [x: string]: string | null;
}
const useGetQs = (...args: string[]) => {
  const [searchParams] = useSearchParams();
  return args.reduce((acc: ParseQs, cur: string) => {
    acc[cur] = searchParams.get(cur);
    return acc;
  }, {});
};

export default useGetQs;
