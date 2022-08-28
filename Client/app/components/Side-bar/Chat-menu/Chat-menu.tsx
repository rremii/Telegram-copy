import React, {FC} from "react"
import styled from "styled-components"
import Burger from "../Header/burger"
import Image from "next/image"
import {Rem} from "../../../../styles/functions/mixins"
import ChatCell from "./Chat-cell"
import Header from "../Header/Header"

interface ChatMenuType {
	isSearchOn: boolean
}

const chat = [
	{
		avatar: "/dog-icon.png",
		title: "Go StudyGo StudyGo StudyGo Study",
		subTitle: "some message from Go Study some message from Go Study"
	}
]

const ChatMenu: FC<ChatMenuType> = ({isSearchOn}) => {
	return <ChatMenuWrapper isSearchOn={isSearchOn}>
		{chat.map(({title, subTitle, avatar}, index) => {
			return <ChatCell key={index} avatar={avatar} subTitle={subTitle} title={title}/>
		})}
	</ChatMenuWrapper>
}
export default ChatMenu
const ChatMenuWrapper = styled.div<{
	isSearchOn: boolean
}>`
  overflow: hidden;

  //header height
  height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  transition: 0.4s;
  transform: ${({isSearchOn}) => isSearchOn ? "scale(0.95)" : "scale(1)"};
  opacity: ${({isSearchOn}) => isSearchOn ? 0 : 1};

  ::-webkit-scrollbar {
    background-color: transparent;
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #777777;
    border-radius: 5px;
  }

`
