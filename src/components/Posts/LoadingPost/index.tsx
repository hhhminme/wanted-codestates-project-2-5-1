import Skeleton from '../../Skeleton';
import { SkeletonWrapper } from './style';

const LoadingAside = () => {
  const Item = () => (
    <SkeletonWrapper>
      <Skeleton>
        <Skeleton.Item type="square" width={'100%'} height={300}></Skeleton.Item>
      </Skeleton>
      <Skeleton>
        <Skeleton.Item type="square" width={'100%'} height={70}></Skeleton.Item>
      </Skeleton>
    </SkeletonWrapper>
  );

  return (
    <>
      {Array.from({ length: 12 }, () => 0).map((num, index) => (
        <Item key={index} />
      ))}
    </>
  );
};
export default LoadingAside;
