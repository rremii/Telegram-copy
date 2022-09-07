import React, {Dispatch, FC, SetStateAction, useContext} from "react"
import styled from "styled-components"
import Header from "./Header/Header"
import ChatContent from "./Chat-content/Chat-content"
import useGlobalContext, {GlobalContext} from "../../hooks/useGlobalContext"

interface ChatBoxType {

}

const ChatBox: FC<ChatBoxType> = () => {
	const {screenMode, SetScreenMode} = useContext(GlobalContext)

	return <ChatBoxWrapper screenMode={screenMode}>
		<Header/>
		<ChatContent/>
	</ChatBoxWrapper>
}
export default ChatBox
const ChatBoxWrapper = styled.div<{
	screenMode: "sideBar" | "chat"
}>`
  height: 100%;
  padding: 0;
  background-color: rgb(33, 33, 33);
  background-image: url("/chat-background.jpg");
  //background-repeat: no-repeat;
  background-size: cover;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  z-index: 15;
  @media screen and (max-width: 920px) {
    z-index: 15;
    position: absolute;
    top: 0;
    width: 100vw;
    transition: .4s left;
    left: ${({screenMode}) => screenMode === "chat" ? 0 : "420px"};
  }
  @media screen and (max-width: 600px) {
    z-index: 15;
    position: absolute;
    top: 0;
    width: 100vw;
    transition: .4s left;
    left: ${({screenMode}) => screenMode === "chat" ? 0 : "100%"};
  }
`
