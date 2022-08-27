import React, {Dispatch, FC, SetStateAction} from "react"
import styled from "styled-components"
import Image from "next/image"
import ChatMenu from "./Chat-menu/Chat-menu"
import ProfileMenu from "./Profile-menu/Profile-menu"
import SearchMenu from "./Search-menu/Search-menu"

interface SideBarType {
	setOpen: Dispatch<SetStateAction<boolean>>
	isOpen: boolean
}

const SideBar: FC<SideBarType> = ({setOpen, isOpen}) => {
	return <SideBarWrapper onClick={() => setOpen(!isOpen)}>
		<ChatMenu/>
		<ProfileMenu/>
		<SearchMenu/>
	</SideBarWrapper>
}
export default SideBar
const SideBarWrapper = styled.div`
  overflow: hidden;
  height: 100%;
  padding: 0;
  background-color: rgb(33, 33, 33);
  flex: 0 0 420px;
  color: white;
  position: relative;

`
