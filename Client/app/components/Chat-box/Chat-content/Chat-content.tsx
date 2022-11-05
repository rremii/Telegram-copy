import {FC, useState} from "react"
import styled from "styled-components"
import ChatInputBox from "./Chat-input-box"
import ChatMessagesBox from "./Chat-messages-box"
import {AdaptiveValue} from "./../../../../styles/functions/mixins"

interface IChatContent {

}

const ChatContent: FC<IChatContent> = () => {


	const [editingMessageContent, SetEditingContent] = useState<string>("qwe")


	return <ChatContentWrapper>
		<div className="chat-cont">

			<ChatMessagesBox editingMessageContent={editingMessageContent} SetEditingContent={SetEditingContent}/>
			<ChatInputBox editingContent={editingMessageContent}/>

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
  padding: 0 ${AdaptiveValue(10, 5)};

  .chat-cont {
    flex: 0 1 728px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: ${AdaptiveValue(20, 10)};
    align-items: center;
    justify-content: space-between;
  }
`
