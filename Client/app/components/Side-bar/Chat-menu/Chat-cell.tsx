import React, {FC, useContext} from "react"
import styled from "styled-components"
import Image from "next/image"
import {AdaptiveValue, Rem} from "../../../../styles/functions/mixins"
import {cutStringToLength} from "../../../utils/cutStringToLength"
import useGlobalContext, {GlobalContext} from "../../../hooks/useGlobalContext"
import {useAppDispatch, useTypedSelector} from "../../../store/ReduxStore"
import {setCurrentChat} from "../../../store/ChatSlice"
import {useRouter} from "next/router"

interface IChatList {
	avatar: string | null
	title: string
	subTitle: string
	chatId: number
	userId: number
}


const ChatCell: FC<IChatList> = ({userId, chatId, subTitle = "", title, avatar = ""}) => {
	const dispatch = useAppDispatch()
	const router = useRouter()

	const {user_id: id} = useTypedSelector(state => state.Me.me)

	const {screenMode, SetScreenMode} = useContext(GlobalContext)

	const HandleCellClick = async () => {
		dispatch(setCurrentChat({chatId, membersIds: [userId, id]}))
		await router.push("/?chatId=" + chatId)
		SetScreenMode("chat")
	}

	return <ChatCellWrapper onClick={HandleCellClick} className="cell">
		<div className="avatar">
			<Image width={54} height={54} src={avatar ? avatar : "/no-avatar.svg"}/>
		</div>
		<div className="text-box">
			<div className="title-cont">
				<h1>{cutStringToLength(title, 17)}</h1>
				<div className="message-info-cont">
					<div className="is-checked">
						<Image width={23} height={23} src="/double-check.svg"/>
					</div>
					<span className="date">
							12:06
						</span>
				</div>
			</div>
			<div className="sub-title-cont">
				<h2>{cutStringToLength(subTitle, 25)}</h2>
				<span className="unseen-messages">21</span>
			</div>
		</div>

	</ChatCellWrapper>
}
export default ChatCell
const ChatCellWrapper = styled.div`


  border-radius: 10px;
  width: 100%;
  //background-color: rgb(135, 116, 225);

  flex: 0 0 72px;
  padding: 9px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 9px;
  cursor: pointer;

  &:hover {
    background-color: rgba(64, 64, 64, 0.3);
  }

  .avatar {
    border-radius: 50%;


    img, span {
      border-radius: inherit;
    }
  }

  .text-box {
    flex: 1 1 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 3px;

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
        }
      }
    }

    .sub-title-cont {
      display: flex;
      align-items: center;
      justify-content: space-between;


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
