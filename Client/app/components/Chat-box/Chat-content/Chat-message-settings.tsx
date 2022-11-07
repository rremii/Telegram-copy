import styled from "styled-components"
import {FC, useContext, useEffect} from "react"
import Image from "next/image"
import {AdaptiveValue, Rem} from "../../../../styles/functions/mixins"
import {useDeleteMessageMutation} from "../../../api/ChatApiRtk"
import {GlobalContext} from "../../../hooks/useGlobalContext"
import {useAppDispatch, useTypedSelector} from "../../../store/ReduxStore"

interface IChatMessageSettings {
	X: number,
	Y: number,

}

const ChatMessageSettings: FC<IChatMessageSettings> = ({X, Y}) => {

	const {id: messageId} = useTypedSelector(state => state.Chats.editingMessage)
	const {content: messageContent} = useTypedSelector(state => state.Chats.editingMessage)


	const {SetEditingMode, SetMessageSettings, isMessageSettings} = useContext(GlobalContext)
	const [deleteMessage] = useDeleteMessageMutation()


	const HandleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.relatedTarget === window) return

		SetMessageSettings(false)
		console.log("out")
	}


	const DeleteMessage = () => {
		if (messageId)
			deleteMessage(messageId)
		SetMessageSettings(false)
	}
	const CopyMessage = () => {
		navigator.clipboard.writeText(messageContent)
		SetMessageSettings(false)

	}


	return <MessageSettings id="qwe" onMouseLeave={HandleMouseLeave} isMessageSettings={isMessageSettings} X={X} Y={Y}

	>
		<div className="content-cont">

			<div onClick={() => SetEditingMode(true)} className="option">
				<Image width={20} height={20} src="/pencil-icon.svg"/> <span>Edit</span>
			</div>
			<div onClick={CopyMessage} className="option">
				<Image width={20} height={20} src="/copy-icon.svg"/> <span>Copy</span>
			</div>
			<div onClick={DeleteMessage} className="option">
				<Image width={20} height={20} src="/trash-bin.svg"/> <span>Delete</span>
			</div>
		</div>
	</MessageSettings>
}
export default ChatMessageSettings
const MessageSettings = styled.div<{
	X: number
	Y: number
	isMessageSettings: boolean
}>`
  position: fixed;
  top: ${({Y}) => Y}px;
  left: ${({X}) => X}px;
  //top: 270px;
  //left: 550px;
  transform: ${({isMessageSettings}) => isMessageSettings ? "translate(-15px, -15px) scale(1)" : "translate(0, 0) scale(0.7)"};
  pointer-events: ${({isMessageSettings}) => isMessageSettings ? "initial" : "none"};
  transition: 0.3s transform;
  //right: 0;
  z-index: 999;
  //gap: 5px;
  width: 210px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;


  .content-cont {
    opacity: ${({isMessageSettings}) => isMessageSettings ? 1 : 0};
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
