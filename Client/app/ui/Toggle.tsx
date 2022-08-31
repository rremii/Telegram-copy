import styled from "styled-components"
import {FC} from "react"


interface Toggle {
	isDarkMode: boolean
}

const Toggle: FC<Toggle> = ({isDarkMode}) => {


	return <ToggleWrapper isActive={isDarkMode}>
		<div/>
	</ToggleWrapper>
}
export default Toggle
const ToggleWrapper = styled.div<{
	isActive: boolean
}>`

  background-color: rgb(135, 116, 225);
  width: 35px;
  height: 16px;
  border-radius: 10px;
  position: relative;

  div {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid rgb(135, 116, 225);
    top: 50%;
    transition: .5s;
    left: ${({isActive}) => isActive ? "calc(100% -  20px)" : 0};

    transform: translateY(-50%);
    background-color: rgb(33, 33, 33);

  }
`
