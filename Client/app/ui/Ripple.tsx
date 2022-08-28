import React, {FC} from "react"
import styled from "styled-components"
import useRipple from "../hooks/useRipple"

interface Ripple {
	clientX: number
	clientY: number
}

const Ripple: FC<Ripple> = ({clientX, clientY}) => {
	return <RippleStyled clientX={clientX} clientY={clientY}/>
}
export default Ripple
const RippleStyled = styled.div<{
	clientY: number, clientX: number
}>`

  position: absolute;
  top: ${({clientY}) => clientY + "px"};
  left: ${({clientX}) => clientX + "px"};

  transform: translate(-70%, -60%);
  background-color: rgb(70, 70, 70);
  border-radius: 50%;
  transform-origin: center;
  animation: ripple 0.7s ease-in-out;


  @keyframes ripple {
    0% {
      width: 80px;
      height: 80px;
      transform: translate(-70%, -60%) scale(0);

    }

    50% {
      opacity: 1;
    }
    100% {
      width: 100px;
      height: 100px;
      transform: translate(-70%, -60%) scale(1);
      opacity: 0;
    }
  }


`
