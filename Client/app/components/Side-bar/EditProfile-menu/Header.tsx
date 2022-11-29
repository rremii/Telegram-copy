import styled from "styled-components"
import Image from "next/image"
import React, {useContext} from "react"
import {Rem} from "../../../../styles/functions/mixins"
import {SideBarContext} from "../../../hooks/useSideBarContext"
import {GlobalContext} from "../../../hooks/useGlobalContext"

const Header = () => {


	const {SetEditProfile, isDarkMode} = useContext(SideBarContext)
	const {language} = useContext(GlobalContext)


	const HandleArrowClick = () => {
		SetEditProfile(false)
	}

	return <HeaderWrapper isDarkMode={isDarkMode}>
		<button onClick={HandleArrowClick} className="arrow">
			<Image width={24} height={24} src="/arrow-left-icon.svg"/>
		</button>
		<h1>{language === "English" ? "Edit Profile" : "Изменить профиль"}</h1>
	</HeaderWrapper>
}
export default Header
const HeaderWrapper = styled.div<{
	isDarkMode: boolean
}>`
  display: flex;
  align-items: center;
  gap: 25px;
  height: 60px;
  background-color: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "white"};
  color: ${({isDarkMode}) => isDarkMode ? "white" : "rgb(47,47,47)"};

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
      background-color: ${({isDarkMode}) => isDarkMode ? "rgb(43, 43, 43)" : "rgba(178,178,178,0.19)"};

    }
  }

  h1 {
    font-size: ${Rem(21)};
    letter-spacing: 1px;
    font-family: Roboto, sans-serif;
    font-weight: 600;
  }



`
