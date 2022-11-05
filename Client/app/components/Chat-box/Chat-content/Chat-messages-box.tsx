import {FC, useContext, useEffect, useState} from "react"
import styled from "styled-components"
import {Rem} from "../../../../styles/functions/mixins"
import Image from "next/image"
import {useTypedSelector} from "../../../store/ReduxStore"
import {getMessageDate} from "../../../utils/getMessageDate"
import {useGetAllMessagesQuery} from "../../../api/ChatApiRtk"
import ChatMessageSettings from "./Chat-message-settings"
import {GlobalContext} from "../../../hooks/useGlobalContext"
import useScrollArrow from "../../../hooks/useScrollArrow"
import {ScrollChatToBottom} from "../../../utils/ScrollToChatBottom"

interface IChatMessagesBox {

}


const ChatMessagesBox: FC<IChatMessagesBox> = () => {


	const {currentChatId} = useTypedSelector(state => state.Chats)
	const {user_id} = useTypedSelector(state => state.Me.me)


	const {
		data: messages,
	} = useGetAllMessagesQuery({chat_id: currentChatId, user_id}, {
		pollingInterval: 2000,
		skip: !currentChatId
	})

	const [chosenId, setId] = useState<number | null>(null)
	const [X, setX] = useState<number>(0)
	const [Y, setY] = useState<number>(0)

	const {messageFontSize} = useContext(GlobalContext)


	useEffect(() => {
		ScrollChatToBottom()
	}, [messages])


	const HandleClick = (e: React.MouseEvent<HTMLDivElement>, chatId: number, sender_id: number) => {
		if (user_id !== sender_id) return

		const settingsBoxWidth = 150
		const inputBoxHeight = 150

		//calculating X and Y depending on where click was done,
		//in order settingsBox doesn't cross window's borders
		if (e.clientX + settingsBoxWidth >= window.innerWidth) {
			setX(e.clientX - settingsBoxWidth - 20)
		} else {
			setX(e.clientX)
		}
		if (e.clientY + inputBoxHeight >= window.innerHeight) {
			setY(e.clientY - 90)
		} else {
			setY(e.clientY)
		}
		setId(chatId)
	}


	return <ChatMessagesBoxWrapper id="scroll-cont"
								   length={messages?.length ? messages?.length : 0}>

		<ChatMessageSettings chosenId={chosenId} setId={setId} X={X} Y={Y}/>

		{chosenId && <div onClick={() => setId(null)} className="settings-overlay"/>}


		{messages?.map(({content, sender_id, createdAt, chat_message_id}, i) => {
			//calculation an animation delay
			let delayNum = 1
			delayNum = messages.length - i + 1 //as farther el as less the delay
			return <MessageWrapper
				fontSize={messageFontSize ? messageFontSize : localStorage.getItem("message-font-size")}
				key={createdAt}
			>
				<div
					style={{
						animationDelay: delayNum * 0.04 + 1 + "s",
					}}
					onClick={(e: React.MouseEvent<HTMLDivElement>) => HandleClick(e, chat_message_id, sender_id)}
					className={`message  ${user_id === sender_id ? "your-message" : "other-message"}`}>
					{content}
					<div className="extra-info">
						<span className="created-at">{getMessageDate(createdAt)}</span>
						<Image width={19}
							   height={16} src="/check.svg"/>
					</div>
					<img src={user_id === sender_id ? "/bubble-tail-left-purple.svg" : "/bubble-tail-left.svg"}
						 alt="bubble-tail"/>
				</div>
			</MessageWrapper>
		})}

	</ChatMessagesBoxWrapper>
}
export default ChatMessagesBox
const ChatMessagesBoxWrapper = styled.div<{
	length: number
}>`
  width: 100%;
  //flex: 1 1 auto;
  height: calc(100vh - 140px);
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
  //gap: 10px;
  position: relative;
  padding: 8px;

  ::-webkit-scrollbar {
    width: 0;
  }

  .settings-overlay {
    top: 0;
    left: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1;
  }



`

const MessageWrapper = styled.div<{
	fontSize: string | null
}>`
  width: 100%;
  display: grid;
  font-family: Roboto, sans-serif;
  padding: 4px 10px;

  position: relative;
  word-wrap: anywhere;
  animation: fadeOut 0.5s forwards;
  opacity: 0;
  animation-delay: 0.5s;
  //align-items: center;
  flex: 1 1 auto;
  @keyframes fadeOut {
    0% {
      opacity: 0;
      transform: scaleY(0.6);
    }
    100% {
      opacity: 1;
      transform: scaleY(1);
    }
  }

  .message {
    min-width: min-content;
    max-width: min(80vw, 350px);
    color: white;
    font-size: ${({fontSize}) => fontSize ? fontSize + "px" : "16px"};
    font-family: Roboto, sans-serif;
    padding: 8px 10px 8px 10px;
    position: relative;
    word-wrap: anywhere;
    animation: fadeOut 0.5s forwards;
    opacity: 0;
    animation-delay: 0.5s;
    height: 100%;


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
    cursor: pointer;

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



`
