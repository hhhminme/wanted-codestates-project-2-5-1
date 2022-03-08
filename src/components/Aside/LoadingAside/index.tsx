import Skeleton from '../../Skeleton';
import { Hr } from '../style';
import { AttrSkel } from './style';

const LoadingAside = () => {
  return (
    <>
      <Skeleton>
        <Skeleton.Item type="square" width={280} height={400}></Skeleton.Item>
      </Skeleton>
      <Skeleton>
        <Skeleton.Item type="square" width={60} height={30}></Skeleton.Item>
      </Skeleton>
      <Skeleton>
        <Skeleton.Item type="square" width={40} height={30}></Skeleton.Item>
      </Skeleton>
      <Hr />
      <Skeleton>
        <Skeleton.Item type="square" width={40} height={30}></Skeleton.Item>
      </Skeleton>
      <AttrSkel>
        <Skeleton.Item type="square" width={100} height={30}></Skeleton.Item>
        <Skeleton.Item type="square" width={50} height={30}></Skeleton.Item>
        <Skeleton.Item type="square" width={70} height={30}></Skeleton.Item>
        <Skeleton.Item type="square" width={50} height={30}></Skeleton.Item>
        <Skeleton.Item type="square" width={100} height={30}></Skeleton.Item>
        <Skeleton.Item type="square" width={100} height={30}></Skeleton.Item>
      </AttrSkel>
    </>
  );
};
export default LoadingAside;
