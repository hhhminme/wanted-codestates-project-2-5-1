import { ReactNode } from 'react';
import Item from './Item';
import { Wrapper } from './style';

interface Skeleton {
  children: ReactNode;
}
const Skeleton = ({ children, ...props }: Skeleton) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};
Skeleton.Item = Item;
export default Skeleton;
