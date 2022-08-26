import React, {FC} from "react"
import styled from "styled-components"
import Image from "next/image"

interface ChatListType {

}

const ChatList: FC<ChatListType> = () => {
	return <ChatListWrapper className="chat-list">

		<div className="cell">
			<div className="avatar">
				<Image width={54} height={54} src="/dog-icon.png"/>
			</div>
			<div className="tex-box">
				<div className="title-cont">
					<h1>Go Study</h1>
					<div className="message-info-cont">
						<div className="is-checked">
							{/*<Image src={}/>*/}
						</div>
						<span className="date">
							12:06
						</span>
					</div>
				</div>
				<div className="sub-title-cont">
					<h2>some message from Go Study</h2>
					<span className="unseen-messages"/>
				</div>
			</div>
		</div>
	</ChatListWrapper>
}
export default ChatList
const ChatListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  position: relative;
  //header height
  flex: 0 0 calc(100vh - 60px);

  padding-right: 4px;

  ::-webkit-scrollbar {
    background-color: transparent;
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #777777;
    border-radius: 5px;
  }

  .cell {
    border-radius: 10px;
    width: 100%;
    background-color: rgb(135, 116, 225);
    flex: 0 0 72px;
  }
`
