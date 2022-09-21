import React, {Dispatch, FC, SetStateAction, useContext, useEffect} from "react"
import styled from "styled-components"
import Header from "./Header/Header"
import ChatContent from "./Chat-content/Chat-content"
import useGlobalContext, {GlobalContext} from "../../hooks/useGlobalContext"
import {useRouter} from "next/router"
import {useTypedSelector} from "../../store/ReduxStore"

interface ChatBoxType {

}

const ChatBox: FC<ChatBoxType> = () => {
	const router = useRouter()

	const params = router.query

	const {screenMode, SetScreenMode} = useContext(GlobalContext)

	const {currentChatId} = useTypedSelector(state => state.Chats)


	useEffect(() => {
		// alert(params)
	}, [params])


	return <ChatBoxWrapper currentChatId={currentChatId} screenMode={screenMode}>
		<Header/>
		<ChatContent/>
	</ChatBoxWrapper>
}
export default ChatBox
const ChatBoxWrapper = styled.div<{
	screenMode: "sideBar" | "chat"
	currentChatId: number | null
}>`
  height: 100%;
  padding: 0;
  background-color: rgb(33, 33, 33);
  background-image: url("/chat-background.jpg");
  //background-repeat: no-repeat;
  display: ${({currentChatId}) => currentChatId ? "flex" : "none"};
  background-size: cover;
  flex: 1 1 auto;
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
