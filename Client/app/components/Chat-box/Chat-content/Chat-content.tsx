import {FC, useContext} from "react"
import styled from "styled-components"
import ChatInputBox from "./Chat-input-box"
import ChatMessagesBox from "./Chat-messages-box"
import {AdaptiveValue} from "./../../../../styles/functions/mixins"
import {SideBarContext} from "../../../hooks/useSideBarContext"


const ChatContent = () => {

	const {isDarkMode} = useContext(SideBarContext)

	return <ChatContentWrapper isDarkMode={isDarkMode}>
		<div className="chat-cont">

			<ChatMessagesBox/>
			<ChatInputBox/>

		</div>
	</ChatContentWrapper>
}
export default ChatContent
const ChatContentWrapper = styled.div<{
	isDarkMode: boolean
}>`
  flex: 1 1 auto;
  width: 100%;
  color: ${({isDarkMode}) => isDarkMode ? "white" : "rgb(47,47,47)"};


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
