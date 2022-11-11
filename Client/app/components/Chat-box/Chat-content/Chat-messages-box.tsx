import {FC, useContext, useEffect, useState} from "react"
import styled from "styled-components"
import {AdaptiveValue, Rem} from "../../../../styles/functions/mixins"
import {useAppDispatch, useTypedSelector} from "../../../store/ReduxStore"
import {useGetAllMessagesQuery} from "../../../api/ChatApiRtk"
import ChatMessageSettings from "./Chat-message-settings"
import {GlobalContext} from "../../../hooks/useGlobalContext"
import {ScrollChatToBottom} from "../../../utils/ScrollToChatBottom"
import {removeLoadingMessageId, setEditingMessage} from "../../../store/ChatSlice"
import {getMessageDate} from "../../../utils/getMessageDate"
import {message} from "../../../store/types"

interface IChatMessagesBox {

}

const IsPrevMessageFromSameSender = (messages: message[], index: number) => {
	let isPrevMessageFromSameSender: boolean | null = null
	const prevMessage = messages[index - 1]
	const curMessage = messages[index - 1]
	if (prevMessage)
		isPrevMessageFromSameSender = prevMessage.sender_id === curMessage.sender_id
	return isPrevMessageFromSameSender
}

const ChatMessagesBox: FC<IChatMessagesBox> = () => {
	const dispatch = useAppDispatch()

	const {currentChatId} = useTypedSelector(state => state.Chats)
	const {user_id} = useTypedSelector(state => state.Me.me)
	const {loadingMessagesIds} = useTypedSelector(state => state.Chats)


	const {
		data: messages, isSuccess, isFetching,
	} = useGetAllMessagesQuery({chat_id: currentChatId, user_id}, {
		pollingInterval: 2000,
		skip: !currentChatId
	})


	const [settingsX, setSettingsX] = useState<number>(0)
	const [settingsY, setSettingsY] = useState<number>(0)


	const {messageFontSize, SetMessageSettings, isMessageSettings} = useContext(GlobalContext)


	useEffect(() => {
		if (!isFetching && isSuccess) {
			dispatch(removeLoadingMessageId())
		}
	}, [isFetching])

	useEffect(() => {
		ScrollChatToBottom()
	}, [messages])


	const HandleClick = (e: React.MouseEvent<HTMLDivElement>, messageId: number, sender_id: number, content: string) => {
		dispatch(setEditingMessage({content, id: messageId}))
		SetMessageSettings(true)
		SetSettingsCoordinates(e, sender_id)
	}

	const SetSettingsCoordinates = (e: React.MouseEvent<HTMLDivElement>, sender_id: number) => {

		if (user_id !== sender_id) return

		const settingsBoxWidth = 150
		const inputBoxHeight = 150

		//calculating X and Y depending on where click was done,
		//in order settingsBox doesn't cross window's borders
		if (e.clientX + settingsBoxWidth >= window.innerWidth) {
			setSettingsX(e.clientX - 170)
		} else {
			setSettingsX(e.clientX)
		}
		if (e.clientY + inputBoxHeight >= window.innerHeight) {
			setSettingsY(e.clientY - 90)
		} else {
			setSettingsY(e.clientY)
		}

	}


	return <ChatMessagesBoxWrapper id="scroll-cont"
								   length={messages?.length ? messages?.length : 0}>

		<ChatMessageSettings X={settingsX}
							 Y={settingsY}/>

		{isMessageSettings && <div onClick={() => SetMessageSettings(false)} className="settings-overlay"/>}


		{messages?.map(({content, sender_id, createdAt, updatedAt, chat_message_id}, i) => {

			const isPrevMessageFromSameSender = IsPrevMessageFromSameSender(messages, i)

			//checking if curMessage is loading(being updated or deleted)
			const isLoading = loadingMessagesIds.find(id => id === chat_message_id)
			//calculation an animation delay
			let delayNum = 1
			delayNum = messages.length - i + 1 //as farther el as less the delay
			return <MessageWrapper
				isPrevMessageFromSameSender={isPrevMessageFromSameSender}
				fontSize={messageFontSize ? messageFontSize : localStorage.getItem("message-font-size")}
				key={chat_message_id}
			>
				<div
					style={{
						animationDelay: delayNum * 0.04 + 1 + "s",
					}}
					onClick={(e: React.MouseEvent<HTMLDivElement>) => HandleClick(e, chat_message_id, sender_id, content)}
					className={`message  ${user_id === sender_id ? "your-message" : "other-message"}`}>
					{content}
					<div className="extra-info">
						{!isLoading ? <span
								className="created-at">{updatedAt !== createdAt && "edited"} {isLoading && "fuck me lol"} {getMessageDate(createdAt)}</span>
							: <div className="loading-clock">
								<img src="/clock-icon.svg"/>
							</div>
						}

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
  flex: 1 1 auto;
  height: calc(100vh - ${AdaptiveValue(140, 140)});
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
	isPrevMessageFromSameSender: boolean | null
}>`
  width: 100%;
  display: grid;
  font-family: Roboto, sans-serif;
  padding: ${({isPrevMessageFromSameSender}) => isPrevMessageFromSameSender ? "3px 10px 0" : "10px 10px 0	"};
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
      justify-content: center;
      margin-left: 5px;
      //padding-right: 5px;
      transform: translateY(6px);
      float: right;
      gap: 5px;

      .created-at {
        color: rgba(255, 255, 255, 0.6);
        font-size: ${Rem(12)};
        font-family: Roboto, sans-serif;
      }

      .loading-clock {
        position: relative;
        width: 15px;
        height: 15px;
        margin-right: 10px;

        img {
          width: 100%;
          height: 100%;

        }
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
