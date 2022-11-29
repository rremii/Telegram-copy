import React, {FC, useContext} from "react"
import styled from "styled-components"
import Image from "next/image"
import {AdaptiveValue, Rem} from "../../../../styles/functions/mixins"
import {cutStringToLength} from "../../../utils/cutStringToLength"
import {GlobalContext} from "../../../hooks/useGlobalContext"
import {useAppDispatch, useTypedSelector} from "../../../store/ReduxStore"
import {useRouter} from "next/router"
import {setCurrentChatId, setCurrentMemberInfo, setCurrentMemberOnline} from "../../../store/ChatSlice"
import {Chat} from "../../../store/types"
import {API_URL_STATIC} from "../../../api/config"
import {getMessageTime} from "../../../utils/getMessageTime"
import {getStatusByLastOnline} from "../../../utils/getStatusByLastOnline"
import useMessageSound from "../../../hooks/useMessageSound"
import {SideBarContext} from "../../../hooks/useSideBarContext"


interface IChatList extends Chat {
	chat_id: number
}


const ChatCell: FC<IChatList> = ({
	chat_id: chatId,
	unSeenMessages, lastMessage,
	memberInfo
}) => {
	const {lastName, firstName, profilePic: avatar} = memberInfo

	const dispatch = useAppDispatch()
	const router = useRouter()

	const {currentChatId} = useTypedSelector(state => state.Chats)


	const {SetScreenMode} = useContext(GlobalContext)
	const {isDarkMode} = useContext(SideBarContext)

	useMessageSound(unSeenMessages)

	const HandleCellClick = async () => {
		dispatch(setCurrentChatId({chatId}))
		dispatch(setCurrentMemberInfo(memberInfo))
		if (memberInfo.lastOnline)
			dispatch(setCurrentMemberOnline(memberInfo.lastOnline))

		await router.push("/?chatId=" + chatId)
		SetScreenMode("chat")
	}

	const title = firstName + " " + (lastName ? lastName : "")
	return <ChatCellWrapper isActive={chatId === currentChatId} isDarkMode={isDarkMode} onClick={HandleCellClick}
							className="cell">
		<div className="avatar">
			<Image width={54} height={54} src={avatar ? API_URL_STATIC + avatar : "/no-avatar.svg"}/>

			{getStatusByLastOnline(memberInfo.lastOnline) === "online" &&
				<div className="online-sign"/>
			}
		</div>
		<div className="text-box">
			<div className="title-cont">
				<h1>{cutStringToLength(title, 15)}</h1>
				<div className="message-info-cont">
					<span className="date">
						 {getMessageTime(lastMessage.updatedAt)}
					</span>
				</div>
			</div>
			<div className="sub-title-cont">
				<h2>{cutStringToLength(lastMessage.content, 19)}</h2>
				{unSeenMessages > 0 ?
					<span className="unseen-messages">{unSeenMessages}</span>
					: ""}
			</div>
		</div>

	</ChatCellWrapper>
}
export default ChatCell
const ChatCellWrapper = styled.div<{
	isDarkMode: boolean
	isActive: boolean
}>`
  border-radius: 10px;
  width: 100%;
  flex: 0 0 72px;
  padding: 9px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 9px;
  cursor: pointer;

  &:hover {
    background-color: ${({isActive}) => isActive ? "rgb(135, 116, 225)" : "rgba(64, 64, 64, 0.3)"};
  }

  background-color: ${({isActive}) => isActive ? "rgb(135, 116, 225)" : "transparent"};

  .avatar {
    border-radius: 50%;
    position: relative;

    .online-sign {
      width: 12px;
      height: 12px;
      position: absolute;
      bottom: 5px;
      right: 5px;
      background-color: green;
      border-radius: 50%;
    }

    img, span {
      border-radius: inherit;
    }
  }

  .text-box {
    flex: 1 1 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 7px;

    .title-cont {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h1 {
        font-family: Roboto, sans-serif;
        font-size: ${AdaptiveValue(16, 14)};
        font-weight: 600;
        letter-spacing: 1px;
        line-height: ${AdaptiveValue(27, 15)};
        color: ${({isDarkMode}) => isDarkMode ? "rgba(255, 255, 255, 1)" : "black"};

      }

      .message-info-cont {
        display: flex;
        gap: 5px;
        align-items: center;

        .is-checked {

        }

        .date {
          font-weight: 500;
          font-size: ${Rem(14)};
          font-family: Roboto, sans-serif;
          color: ${({isDarkMode}) => isDarkMode ? "rgba(255, 255, 255, 0.8)" : "black"};

        }
      }
    }

    .sub-title-cont {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${({isDarkMode}) => isDarkMode ? "rgba(255, 255, 255, 0.8)" : "black"};


      h2 {
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: ${AdaptiveValue(17, 15)};
        flex: 1 1 auto;
      }

      .unseen-messages {
        font-family: Roboto, sans-serif;
        font-weight: 600;
        font-size: ${AdaptiveValue(16, 14)};
        background-color: rgb(131, 131, 131);
        border-radius: 15px;
        padding: 5px 8px;
      }
    }


  }
`
