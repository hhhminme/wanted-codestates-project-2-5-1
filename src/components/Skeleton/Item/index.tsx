import { Content } from './style';

export interface Item {
  type: 'round' | 'square';
  width?: number | string;
  height?: number | string;
}
const Item = ({ type, width = 300, height = 300, ...props }: Item) => {
  return <Content type={type} width={width} height={height} {...props}></Content>;
};
export default Item;
