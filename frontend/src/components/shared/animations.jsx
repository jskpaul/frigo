import { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    transform: translateY(10px);
    opacity: 0;
  }

  to {
    transform: translateY(0px);
    opacity: 1;
  }
`;

export {
  fadeIn
}