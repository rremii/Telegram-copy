import React, {FC, useContext} from "react"
import styled from "styled-components"
import Header from "./Header/Header"
import ChatContent from "./Chat-content/Chat-content"
import {GlobalContext} from "../../hooks/useGlobalContext"
import {useTypedSelector} from "../../store/ReduxStore"

interface ChatBoxType {

}

const ChatBox: FC<ChatBoxType> = () => {
	const {screenMode, background, isBackgroundBlur} = useContext(GlobalContext)
	const {currentChatId} = useTypedSelector(state => state.Chats)

	return <ChatBoxWrapper isBackgroundBlur={isBackgroundBlur === "true"} background={background}
						   currentChatId={currentChatId} screenMode={screenMode}>
		<div className="chat-box-content">

			<Header/>
			<ChatContent/>
		</div>
	</ChatBoxWrapper>
}
export default ChatBox
const ChatBoxWrapper = styled.div<{
	screenMode: "sideBar" | "chat" | "info"
	currentChatId: number | null
	background: string
	isBackgroundBlur: boolean
}>`
  height: 100%;
  padding: 0;
  background-color: rgb(33, 33, 33);
  background-image: ${({background}) => ("url(/backgrounds/" + background + ")")};
  background-size: cover;
  flex: 1 1 auto;
  z-index: 15;
  position: relative;
  @media screen and (max-width: 920px) {
    z-index: 15;
    position: absolute;
    top: 0;
    width: 100vw;
    transition: .4s left;
    left: ${({screenMode}) => screenMode !== "sideBar" ? 0 : "420px"};
  }
  @media screen and (max-width: 600px) {
    z-index: 15;
    position: absolute;
    top: 0;
    width: 100vw;
    transition: .4s left;
    left: ${({screenMode}) => screenMode !== "sideBar" ? 0 : "100%"};
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: 0.5s;
    backdrop-filter: ${({isBackgroundBlur}) => isBackgroundBlur ? "blur(4px)" : ""};
    z-index: -1;
  }

  .chat-box-content {
    width: 100%;
    height: 100%;
    display: ${({currentChatId}) => currentChatId ? "flex" : "none"};
    flex-direction: column;

  }
`
