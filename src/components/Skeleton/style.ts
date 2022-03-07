import styled from 'styled-components';

export const Wrapper = styled.div`
  @keyframes skeleton--loading {
    0% {
      background-position: 100%;
    }
    90% {
      background-position-x: -100%;
    }
    100% {
      background-position-x: -100%;
    }
  }
`;
