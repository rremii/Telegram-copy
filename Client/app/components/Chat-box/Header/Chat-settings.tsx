import styled from "styled-components"
import {FC, useContext} from "react"
import Image from "next/image"
import {AdaptiveValue, Rem} from "../../../../styles/functions/mixins"
import {GlobalContext} from "../../../hooks/useGlobalContext"
import {useAppDispatch, useTypedSelector} from "../../../store/ReduxStore"
import {useDeleteChatMutation} from "../../../api/rtk/ChatApi"
import {useGetMeQuery} from "../../../api/rtk/MeApi"
import {useRouter} from "next/router"

interface IChatSettings {

}

const ChatSettings: FC<IChatSettings> = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()

	// const {id: messageId} = useTypedSelector(state => state.Chats.editingMessage)
	// const {content: messageContent} = useTypedSelector(state => state.Chats.editingMessage)
	const {user_id} = useTypedSelector(state => state.Chats.currentChat.memberInfo)


	const {data: userData} = useGetMeQuery()
	const [deleteChat] = useDeleteChatMutation()


	const {
		SetChatSettings,
		isChatSettings
	} = useContext(GlobalContext)


	const HandleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {

		if (e.relatedTarget === window) return

		SetChatSettings(false)
	}


	const DeleteMessage = () => {
		SetChatSettings(false)
		if (!userData) return
		deleteChat([user_id, userData.user_id])
		router.push("/")
	}
	const HandleOverlayClick = () => {
		SetChatSettings(false)
	}


	return <>
		<Overlay isChatSettings={isChatSettings} onClick={HandleOverlayClick}/>
		<ChatSettingsWrapper onMouseLeave={HandleMouseLeave}
							 isChatSettings={isChatSettings}>
			<div className="content-cont">
				<div onClick={DeleteMessage} className="option">
					<Image width={20} height={20} src="/trash-bin.svg"/> <span>Delete</span>
				</div>
			</div>
		</ChatSettingsWrapper>
	</>
}
export default ChatSettings
const ChatSettingsWrapper = styled.div<{

	isChatSettings: boolean
}>`
  //background-color: red;
  padding: 10px;
  position: absolute;
  top: 100%;
  right: 0;
  //top: 270px;
  //left: 550px;
  transform: ${({isChatSettings}) => isChatSettings ? "translate(0, -15px) scale(1)" : "translate(15px, 0) scale(0.7)"};
  pointer-events: ${({isChatSettings}) => isChatSettings ? "initial" : "none"};
  transition: 0.3s transform;
  //right: 0;
  z-index: 101;
  //gap: 5px;
  width: 210px;
  //height: 130px;
  height: min-content;
  display: flex;
  align-items: center;
  justify-content: center;


  .content-cont {
    opacity: ${({isChatSettings}) => isChatSettings ? 1 : 0};
    width: ${AdaptiveValue(180, 150)};
    //height: 230px;
    background-color: rgba(33, 33, 33, 0.5);
    border-radius: 10px;
    padding: 5px;
    transition: .3s;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(50px);
    display: flex;
    flex-direction: column;

    .option:last-of-type {
      span {
        color: #df3f40;
      }
    }

    .option {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 5px 12px;
      border-radius: 5px;

      &:hover {
        background-color: rgba(171, 171, 171, 0.08);
      }

      span {
        font-family: Roboto, sans-serif;
        font-size: ${Rem(14)};
        font-weight: 500;
      }
    }
  }


`
const Overlay = styled.div<{
	isChatSettings: boolean
}>`
  pointer-events: ${({isChatSettings}) => isChatSettings ? "initial" : "none"};
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: calc(100vh);
  z-index: 100;
`
