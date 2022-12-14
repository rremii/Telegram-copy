import React, {useContext} from "react"
import styled from "styled-components"
import ChatMenu from "./Chat-menu/Chat-menu"
import ProfileMenu from "./Profile-menu/Profile-menu"
import SearchMenu from "./Search-menu/Search-menu"
import Header from "./Header/Header"
import {GlobalContext} from "../../hooks/useGlobalContext"
import BackgroundSettings from "./Background-settings/Background-settings"
import GeneralSettings from "./General-settings/General-settings"
import EditProfileMenu from "./EditProfile-menu/EditProfile-menu"
import LanguageSettings from "./Language-settings/Language-settings"
import {SideBarContext} from "../../hooks/useSideBarContext"


const SideBar = () => {

	const {screenMode} = useContext(GlobalContext)
	const {isDarkMode} = useContext(SideBarContext)


	return <SideBarWrapper isDarkMode={isDarkMode} screenMode={screenMode}>

		<ProfileMenu/>
		<GeneralSettings/>
		<BackgroundSettings/>
		<EditProfileMenu/>
		<LanguageSettings/>
		<div className="layout">
			<Header/>
			<ChatMenu/>
			<SearchMenu/>
		</div>
	</SideBarWrapper>
}
export default SideBar
const SideBarWrapper = styled.div<{
	screenMode: string
	isDarkMode: boolean
}>`
  //overflow: hidden;
  height: 100%;
  padding: 0;
  transition: 0.5s;
  background-color: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "white"};
  flex: 0 0 420px;
  color: white;
  position: relative;
  width: 420px;
  border-right: 1px black solid;
  @media screen and (max-width: 920px) {
    transition: .5s left;
    position: absolute;
    top: 0;
    z-index: 10;
    left: ${({screenMode}) => screenMode === "sideBar" ? 0 : "-150px"};
  }
  @media screen and (max-width: 600px) {
    z-index: 10;
    position: absolute;
    top: 0;
    width: 100vw;
    transition: .5s left;
    left: ${({screenMode}) => screenMode === "sideBar" ? 0 : "-150px"};
  }

  .layout {
    padding: 0 16px;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

`
