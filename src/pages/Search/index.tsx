import Aside from '../../components/Aside';
import useGetQs from './utils/useGetQs';

const Search = () => {
  const { asideKey } = useGetQs();

  return <div>{asideKey && <Aside asideKey={asideKey} />}</div>;
};
export default Search;
