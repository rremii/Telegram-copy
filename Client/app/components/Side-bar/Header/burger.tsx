import React, {Dispatch, FC, SetStateAction} from "react"
import styled from "styled-components"

interface BurgerMenuType {
	ref: any
	isBurger: boolean
	setIsBurger: Dispatch<SetStateAction<boolean>>
}

const Burger: FC<BurgerMenuType> = ({isBurger, setIsBurger}) => {
	return <BurgerWrapper isBurger={isBurger}>
		<div className="burger-overlay" onClick={() => setIsBurger(false)}/>

		burger

	</BurgerWrapper>
}
export default Burger
const BurgerWrapper = styled.div<{
	isBurger: boolean
}>`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: gray;
  transition: .5s;
  transform: ${({isBurger}) => isBurger ? "scale(1)" : "scale(0)"};
  opacity: ${({isBurger}) => isBurger ? 1 : 0};
  z-index: 21;

  .burger-overlay {
    position: fixed;
    top: -60px;
    left: -100px;
    width: 110vw;
    height: 110vh;
    background-color: transparent;
    z-index: 15;
  }
`
