import React, {FC} from "react"
import styled from "styled-components"
import Header from "./Header/Header"
import ChatContent from "./Chat-content/Chat-content"

interface ChatBoxType {
}

const ChatBox: FC<ChatBoxType> = () => {
	return <ChatBoxWrapper>
		<Header/>
		<ChatContent/>
	</ChatBoxWrapper>
}
export default ChatBox
const ChatBoxWrapper = styled.div`
  height: 100%;
  padding: 0;
  background-color: rgb(33, 33, 33);
  background-image: url("/chat-background.jpg");
  //background-repeat: no-repeat;
  background-size: cover;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;


`
