import {FC} from "react"
import styled from "styled-components"
import ChatInputBox from "./Chat-input-box"
import ChatMessagesBox from "./Chat-messages-box"

interface IChatContent {

}

const ChatContent: FC<IChatContent> = () => {
	return <ChatContentWrapper>
		<div className="chat-cont">
			<ChatMessagesBox/>
			<ChatInputBox/>

		</div>
	</ChatContentWrapper>
}
export default ChatContent
const ChatContentWrapper = styled.div`
  flex: 1 1 auto;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;

  .chat-cont {
    flex: 0 1 728px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    align-items: center;
  }
`
