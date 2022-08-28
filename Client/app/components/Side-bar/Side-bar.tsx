import React, {Dispatch, FC, SetStateAction, useState} from "react"
import styled from "styled-components"
import Image from "next/image"
import ChatMenu from "./Chat-menu/Chat-menu"
import ProfileMenu from "./Profile-menu/Profile-menu"
import SearchMenu from "./Search-menu/Search-menu"
import Header from "./Header/Header"

interface SideBarType {
	setOpen: Dispatch<SetStateAction<boolean>>
	isOpen: boolean
}

const SideBar: FC<SideBarType> = ({setOpen, isOpen}) => {

	const [isSearchOn, setIsSearch] = useState(false)

	return <SideBarWrapper onClick={() => setOpen(!isOpen)}>
		<ProfileMenu/>
		<div className="layout">
			<Header isSearchOn={isSearchOn} setIsSearch={setIsSearch}/>
			<ChatMenu isSearchOn={isSearchOn}/>
			<SearchMenu isSearchOn={isSearchOn}/>
		</div>
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

  .layout {
    padding: 0 16px;
    width: 100%;
    height: 100%;
    overflow: visible !important;
  }

`
