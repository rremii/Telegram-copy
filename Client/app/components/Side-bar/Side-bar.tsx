import React, {FC, useContext} from "react"
import styled from "styled-components"
import ChatMenu from "./Chat-menu/Chat-menu"
import ProfileMenu from "./Profile-menu/Profile-menu"
import SearchMenu from "./Search-menu/Search-menu"
import Header from "./Header/Header"
import {GlobalContext} from "../../hooks/useGlobalContext"
import BackgroundSettings from "./Background-settings/Background-settings"
import GeneralSettings from "./General-settings/General-settings"
import EditProfileMenu from "./EditProfile-menu/EditProfile-menu"

interface ISideBar {

}


const SideBar: FC<ISideBar> = () => {

	const {screenMode} = useContext(GlobalContext)


	return <SideBarWrapper screenMode={screenMode}>

		<ProfileMenu/>
		<GeneralSettings/>
		<BackgroundSettings/>
		<EditProfileMenu/>
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
}>`
  //overflow: hidden;
  height: 100%;
  padding: 0;
  background-color: rgb(33, 33, 33);
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
