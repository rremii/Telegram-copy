import React, {FC} from "react"
import styled from "styled-components"

interface BurgerMenuType {

}

const Burger: FC<BurgerMenuType> = () => {
	return <BurgerWrapper>
		burger
	</BurgerWrapper>
}
export default Burger
const BurgerWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: gray;
`
