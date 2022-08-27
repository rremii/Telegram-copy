import React, {FC} from "react"
import styled from "styled-components"
import Burger from "../Header/burger"
import Image from "next/image"
import {Rem} from "../../../../styles/functions/mixins"
import ChatList from "./Chat-list/Chat-list"
import Header from "../Header/Header"

interface ChatMenuType {

}

const ChatMenu: FC<ChatMenuType> = () => {
	return <ChatMenuWrapper className="chatMenu__wrapper">
		<Header/>
		<ChatList/>
	</ChatMenuWrapper>
}
export default ChatMenu
const ChatMenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  position: relative;
  display: flex;
  flex-direction: column;


`
