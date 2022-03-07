import { Content } from './style';

export interface Item {
  type: 'round' | 'square';
  width?: number;
  height?: number;
}
const Item = ({ type, width = 300, height = 300 }: Item) => {
  return <Content type={type} width={width} height={height}></Content>;
};
export default Item;
