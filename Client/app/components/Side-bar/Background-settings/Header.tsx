import styled from "styled-components"
import Image from "next/image"
import React, {useContext} from "react"
import {Rem} from "../../../../styles/functions/mixins"
import {SideBarContext} from "../../../hooks/useSideBarContext"

const Header = () => {


	const {SetBackgroundSettings} = useContext(SideBarContext)


	const HandleArrowClick = () => {
		SetBackgroundSettings(false)
	}

	return <HeaderWrapper>
		<button onClick={HandleArrowClick} className="arrow">
			<Image width={24} height={24} src="/arrow-left-icon.svg"/>
		</button>
		<h1>Chat Background</h1>
	</HeaderWrapper>
}
export default Header
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  height: 60px;
  background-color: rgb(33, 33, 33);
  //justify-content: space-between;
  padding: 0 16px;
  position: relative;

  .arrow {
    width: 45px;
    height: 45px;
    padding: 0 10px;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;

    &:hover {
      background-color: rgb(43, 43, 43);
    }
  }

  h1 {
    font-size: ${Rem(21)};
    letter-spacing: 1px;
    font-family: Roboto, sans-serif;
    font-weight: 600;
  }



`
