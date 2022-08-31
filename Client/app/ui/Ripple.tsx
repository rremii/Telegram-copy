import React, {FC} from "react"
import styled from "styled-components"

interface Ripple {
	X: number
	Y: number
}

const Ripple: FC<Ripple> = ({X, Y}) => {

	return <RippleStyled clientX={X} clientY={Y}/>
}
export default Ripple
const RippleStyled = styled.div<{
	clientY: number, clientX: number
}>`
  position: absolute;
  top: ${({clientY}) => clientY + "px"};
  left: ${({clientX}) => clientX + "px"};

  //z-index: -1;
  background-color: rgb(70, 70, 70);
  border-radius: 50%;
  transform-origin: center;
  animation: ripple 0.7s ease-in-out;


  @keyframes ripple {
    0% {
      width: 80px;
      height: 80px;
      transform: translate(-50%, -50%) scale(0);

    }

    50% {
      opacity: 1;
    }
    100% {
      width: 80px;
      height: 80px;
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }


`
