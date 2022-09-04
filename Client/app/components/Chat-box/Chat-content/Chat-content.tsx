import {FC} from "react"
import styled from "styled-components"

interface IChatContent {

}

const ChatContent: FC<IChatContent> = () => {
	return <ChatContentWrapper>
		<div className="chat-cont">
			qwe
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

  .chat-cont {
    flex: 0 1 728px;
    height: 100%;
    background-color: red;
  }
`
