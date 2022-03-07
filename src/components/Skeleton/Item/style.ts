import styled from 'styled-components';
import { Item } from '.';

export const Content = styled.div<Item>`
  display: inline-block;
  border-radius: ${({ type }) => (type === 'round' ? '50%' : '10px')};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  background-image: linear-gradient(90deg, #dfe3e8 0px, #efefef 40px, #dfe3e8 80px);
  background-size: 200% 100%;
  background-position: 0 center;
  animation: skeleton--loading 2s infinite linear;
`;
