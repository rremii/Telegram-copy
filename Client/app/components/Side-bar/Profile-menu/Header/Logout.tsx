import React, {useContext} from "react"
import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../../../../styles/functions/mixins"
import {SideBarContext} from "../../../../hooks/useSideBarContext"
import {GlobalContext} from "../../../../hooks/useGlobalContext"


const Logout = () => {

	const {
		isLogout,
		SetLogout,
		SetLogoutPopUp,
		isDarkMode
	} = useContext(SideBarContext)
	const {language} = useContext(GlobalContext)


	return <LogoutWrapper isDarkMode={isDarkMode} isLogout={isLogout}>
		<button onClick={() => SetLogoutPopUp(true)} className="logout-cont">
			<div className="icon">
				<Image width={25} height={25} src="/logout.svg"/>
			</div>
			<span>{language === "English" ? "Log Out" : "Выйти"}</span>
		</button>
		<button onClick={() => SetLogout(false)} className="logout-overlay"/>
	</LogoutWrapper>
}
export default React.memo(Logout)
const LogoutWrapper = styled.div<{
	isLogout: boolean
	isDarkMode: boolean
}>`
  padding: 5px;
  position: absolute;
  top: 100%;
  right: 15px;
  background-color: ${({isDarkMode}) => isDarkMode ? "rgb(72, 72, 72)" : "rgb(227,226,226)"};
  color: ${({isDarkMode}) => isDarkMode ? "white" : "black"};

  z-index: 20;
  border-radius: 10px;
  width: 180px;
  height: 42px;
  display: flex;
  align-items: center;
  transform: ${({isLogout}) => isLogout ? "scale(1)" : "scale(0.5)"};
  pointer-events: ${({isLogout}) => isLogout ? "initial" : "none"};
  opacity: ${({isLogout}) => isLogout ? 1 : 0};
  transition: .2s;
  transform-origin: right top;

  .logout-overlay {
    display: ${({isLogout}) => isLogout ? "initial" : "none"};
    position: fixed;
    top: -60px;
    left: -500px;
    width: 200vw;
    height: 200vh;
    display: ${({isLogout}) => isLogout ? "initial" : "none"};
    cursor: initial;
    background-color: transparent;
    z-index: -1;
  }

  .logout-cont {
    //cursor: pointer;
    cursor: ${({isLogout}) => isLogout ? "pointer" : "initial"};

    padding: 0 12px;
    height: 100%;
    flex: 1 1 auto;
    border-radius: inherit;
    display: flex;
    align-items: center;
    gap: 20px;
    transition: .3s;

    &:hover {
      background-color: ${({isDarkMode}) => isDarkMode ? "rgb(80, 80, 80)" : "rgb(197,196,196)"};

    }

    .icon {

    }

    span {
      font-family: Roboto, sans-serif;
      font-size: ${Rem(17)};
      font-weight: 500;

    }
  }

`
