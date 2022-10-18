import {FC, useEffect} from "react"
import styled from "styled-components"
import {Rem} from "../../../../styles/functions/mixins"
import Image from "next/image"
import {useAppDispatch, useTypedSelector} from "../../../store/ReduxStore"
import {getAllMessages} from "../../../store/ChatSlice"
import {getMessageDate} from "../../../utils/getMessageDate"
import {useGetAllMessagesQuery} from "../../../api/ChatApiRtk"
import {UseIsPreroll} from "../../../hooks/useIsPreroll"

interface IChatMessagesBox {

}


const ChatMessagesBox: FC<IChatMessagesBox> = () => {

	const dispatch = useAppDispatch()

	const {currentChatId} = useTypedSelector(state => state.Chats)
	const {user_id} = useTypedSelector(state => state.Me.me)
	// const {messages} = useTypedSelector(state => state.Chats.currentChat)


	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		if (!currentChatId) return
	// 		dispatch(getAllMessages({chat_id: currentChatId, user_id}))
	// 	}, 2000)
	// 	return () => clearInterval(interval)
	// }, [currentChatId])


	const {
		data: messages,
		isLoading,
	} = useGetAllMessagesQuery({chat_id: currentChatId, user_id}, {
		pollingInterval: 2000,
		skip: !currentChatId
	})

	return <ChatMessagesBoxWrapper length={messages?.length ? messages?.length : 0}>

		{messages?.map(({content, sender_id, createdAt}, i) => {
			//calculation delay for last 20 messages
			let delayNum = 1
			if (i > messages.length - 20) delayNum = messages.length - i + 1
			return <div key={i} className="message-cont">
				<div style={{
					animationDelay: delayNum * 0.1 + "s"
				}} className={`message delay${delayNum} ${user_id === sender_id ? "your-message" : "other-message"}`}>
					{content}
					<div className="extra-info">
						<span className="created-at">{getMessageDate(createdAt)}</span>
						<Image width={19}
							   height={16} src="/check.svg"/>
					</div>
					<img src={user_id === sender_id ? "/bubble-tail-left-purple.svg" : "/bubble-tail-left.svg"}
						 alt="bubble-tail"/>
				</div>
			</div>
		})}

	</ChatMessagesBoxWrapper>
}
export default ChatMessagesBox
const ChatMessagesBoxWrapper = styled.div<{
	length: number
}>`
  width: 100%;
  height: calc(100vh - 140px);
  overflow-y: auto;
  overflow-x: hidden;
  //background-color: green;
  display: flex;
  flex-direction: column;

  gap: 10px;

  padding: 8px;

  ::-webkit-scrollbar {
    width: 0;
  }

  
  .message-cont {
    width: 100%;
    display: grid;
    gap: 10px;

    .message {
      color: white;
      font-size: ${Rem(16)};
      font-family: Roboto, sans-serif;
      padding: 8px 10px 8px 10px;
      min-width: min-content;
      max-width: min(80vw, 350px);
      position: relative;
      word-wrap: anywhere;
      animation: fadeOut 1s forwards;
      opacity: 0;
      //animation-delay: 2s;


      @keyframes fadeOut {
        0% {
          opacity: 0;
          transform: scaleY(0.5);
        }
        100% {
          opacity: 1;
          transform: scaleY(1);
        }
      }

      .extra-info {
        display: flex;
        align-items: center;
        margin-left: 5px;
        transform: translateY(6px);
        float: right;
        gap: 5px;

        .created-at {
          color: rgba(255, 255, 255, 0.6);
          font-size: ${Rem(12)};
          font-family: Roboto, sans-serif;
        }

      }


      img {
        width: 20px;
        height: 20px;
        position: absolute;
      }

    }


    .your-message {
      border-radius: 12px 12px 0 12px;
      justify-self: end;
      background-color: rgb(135, 116, 225);
      position: relative;

      img {
        bottom: 0;
        transform: rotateY(180deg) translateX(7px);
        left: 100%;
      }
    }

    .other-message {
      justify-self: start;
      border-radius: 12px 12px 12px 0;
      background-color: rgb(33, 33, 33);

      img {
        bottom: 0;
        transform: translateX(7px);
        right: 100%;
      }
    }

  }
`
