import React, {Dispatch, FC, SetStateAction, useContext} from "react"
import styled from "styled-components"
import ChatMenu from "./Chat-menu/Chat-menu"
import ProfileMenu from "./Profile-menu/Profile-menu"
import SearchMenu from "./Search-menu/Search-menu"
import Header from "./Header/Header"
import useSideBarContext, {SideBarContext} from "../../hooks/useSideBarContext"
import LogoutPopUp from "../Globals/Logout-pop-up"

interface ISideBar {
	setOpen: Dispatch<SetStateAction<boolean>>
	isOpen: boolean
}


const SideBar: FC<ISideBar> = ({setOpen, isOpen}) => {

	const contextValues = useSideBarContext()


	return <SideBarWrapper onClick={() => setOpen(!isOpen)}>
		<SideBarContext.Provider value={contextValues}>
			<ProfileMenu/>
			<LogoutPopUp/>
			<div className="layout">
				<Header/>
				<ChatMenu/>
				<SearchMenu/>
			</div>
		</SideBarContext.Provider>
	</SideBarWrapper>
}
export default SideBar
const SideBarWrapper = styled.div`
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
    position: absolute;
    top: 0;
    left: -420px;
  }

  .layout {
    padding: 0 16px;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

`
