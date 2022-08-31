import React, {FC} from "react"
import styled from "styled-components"

interface ChatBoxType {
}

const ChatBox: FC<ChatBoxType> = () => {
	return <ChatBoxWrapper>
		CHAT BOX

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

`
