import React, {useContext} from "react"
import styled from "styled-components"
import {SideBarContext} from "../../../hooks/useSideBarContext"
import Header from "./Header/Header"
import Info from "./Info"
import Settings from "./Settings"


const ProfileMenu = () => {

	const {isProfile, SetLogout, isDarkMode} = useContext(SideBarContext)


	return <ProfileMenuWrapper isDarkMode={isDarkMode} isProfile={isProfile}>
		<div onMouseLeave={() => SetLogout(false)} className="profileMenu-cont">
			<Header/>
			<Info/>
			<Settings/>
		</div>
	</ProfileMenuWrapper>
}
export default React.memo(ProfileMenu)
const ProfileMenuWrapper = styled.div<{
	isProfile: boolean
	isDarkMode: boolean
}>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background-color: transparent;
  pointer-events: none;
  overflow: hidden;

  .profileMenu-cont {
    transition: .4s;
    pointer-events: initial;
    position: absolute;
    left: 100%;
    top: 0;
    transform: ${({isProfile}) => isProfile ? "translateX(-100%)" : "translateX(0)"};
    width: 100%;
    height: 100%;
    background-color: ${({isDarkMode}) => isDarkMode ? "rgb(22, 22, 22)" : "rgb(170,170,170)"};

    display: flex;
    flex-direction: column;

  }
`
