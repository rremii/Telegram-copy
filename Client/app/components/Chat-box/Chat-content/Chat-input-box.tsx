import {useContext} from "react"
import styled from "styled-components"
import {AdaptiveValue, Rem} from "../../../../styles/functions/mixins"
import Image from "next/image"
import {Field, Form, Formik} from "formik"
import {useAppDispatch, useTypedSelector} from "../../../store/ReduxStore"
import {resetEditingMessage, setLoadingMessageId} from "../../../store/ChatSlice"
import * as Yup from "yup"
import useScrollArrow from "../../../hooks/useScrollArrow"
import {ScrollChatToBottom} from "../../../utils/ScrollToChatBottom"
import {GlobalContext} from "../../../hooks/useGlobalContext"
import {useAddMessageMutation, useEditMessageMutation} from "../../../api/rtk/ChatApi"
import {SideBarContext} from "../../../hooks/useSideBarContext"
import {b} from "msw/lib/glossary-297d38ba"


const validSchema = Yup.object().shape({
	content: Yup.string().required()
})

const ChatInputBox = () => {

	const dispatch = useAppDispatch()

	const {currentChatId} = useTypedSelector(state => state.Chats)
	const {id: messageId} = useTypedSelector(state => state.Chats.editingMessage)
	const {content: editingContent} = useTypedSelector(state => state.Chats.editingMessage)
	const {user_id} = useTypedSelector(state => state.Me.me)


	const [editMessage] = useEditMessageMutation()
	const [addMessage] = useAddMessageMutation()

	const {isEditingMode, SetEditingMode, language} = useContext(GlobalContext)
	const {isDarkMode} = useContext(SideBarContext)

	const {isScrollArrow} = useScrollArrow()


	const CloseEditingMode = () => {
		SetEditingMode(false)
		dispatch(resetEditingMessage())
	}

	return <ChatInputBoxWrapper isDarkMode={isDarkMode} isEditingMode={isEditingMode}>
		<div onClick={ScrollChatToBottom} className={`scroll-down-btn ${isScrollArrow ? "active" : ""} `}>
			<div className="arrow-cont">
				<Image layout="fill" src="/arrow-left-icon.svg"/>
			</div>
		</div>

		<Formik
			initialValues={{
				content: isEditingMode ? editingContent : "" as string
			}}
			enableReinitialize={true}
			validationSchema={validSchema}
			onSubmit={(({content}, {resetForm}) => {
				if (!currentChatId) return


				if (isEditingMode && messageId && currentChatId) {
					dispatch(setLoadingMessageId(messageId))
					editMessage({newContent: content, id: messageId, chat_id: currentChatId})
				} else {
					addMessage({content, user_id, chat_id: currentChatId})
				}


				CloseEditingMode()
				resetForm()
			})}
		>
			{({dirty, isValid}) => (
				<Form>
					<div className="input-box">

						<EditingBox isDarkMode={isDarkMode} isEditingMode={isEditingMode}>
							<div className="pencil-box">
								<Image width={22} height={22} src="/pencil-icon-purple.svg"/>
							</div>
							<div className="text-box">
								<h2>{language === "English" ? "Editing" : "Редактирование"}</h2>
								<h1>{editingContent}</h1>
							</div>
							<div onClick={CloseEditingMode} className="cross">
								<span/>
								<span/>
							</div>
						</EditingBox>

						<div className="input-cont">
							<Field name="content" placeholder={language === "English" ? "Message" : "Сообщение"}
								   type="text"/>
						</div>
						<div className="tail-cont">
							<Image layout="fill" className="tail"
								   src={isDarkMode ? "/bubble-tail-left.svg" : "/bubble-tail-left-white.svg"} alt=""/>
						</div>
					</div>

					<button className={`send-btn ${dirty && isValid ? "active" : ""}`}>
						<Image src="/telegram-icon-purple.svg" layout="fill"/>
					</button>
				</Form>
			)}
		</Formik>

	</ChatInputBoxWrapper>
}
export default ChatInputBox
const ChatInputBoxWrapper = styled.div<{
	isEditingMode: boolean
	isDarkMode: boolean
}>`
  flex: 0 0 ${AdaptiveValue(54, 46)};
  display: flex;
  align-items: center;
  width: calc(100% - 15px);
  border-radius: ${({isEditingMode}) => isEditingMode ? "0 0 0 12px" : "12px 12px 0 12px"};
  font-family: Roboto, sans-serif;
  position: relative;
  margin-top: 5px;
  z-index: 15;
  transition: .3s;

  .scroll-down-btn {
    position: absolute;
    background-color: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "white"};
    width: ${AdaptiveValue(54, 45)};
    height: ${AdaptiveValue(54, 45)};
    top: -65px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
    opacity: 0;
    pointer-events: none;
    transition: .4s;

    .arrow-cont {
      cursor: pointer;
      transform: rotate(-90deg);
      border-radius: 50%;
      position: relative;
      width: 24px;
      height: 24px;
    }
  }

  .active {
    opacity: 1;
    pointer-events: initial;
  }


  form {
    border-radius: inherit;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: ${AdaptiveValue(70, 58)};

  }

  .input-box {
    border-radius: inherit;
    //padding-left: 50px;
    background-color: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "white"};

    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .input-cont {
      width: 100%;
      padding: 5px 8px;
      height: 100%;
      position: relative;

      input {
        padding-left: ${AdaptiveValue(50, 10)};
        width: 100%;
        height: 100%;
        background-color: transparent;
        caret-color: rgb(135, 116, 225);
        color: ${({isDarkMode}) => isDarkMode ? "white" : "rgb(47,47,47)"};
        font-size: ${Rem(18)};
        word-wrap: anywhere;

        ::placeholder {
          font-family: Roboto, sans-serif;
          color: rgb(101, 106, 110);
        }

      }
    }

    .tail-cont {

      width: 20px;
      height: 20px;
      position: absolute;
      left: 100%;
      bottom: 0;
      transform: translateX(-7px) rotateY(180deg);

      .tail {
      }
    }
  }

  .send-btn {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-10px, -50%);
    width: ${AdaptiveValue(54, 46)};
    height: ${AdaptiveValue(54, 46)};
    background-color: white;
    border-radius: 50%;
    opacity: 0;
    transition: .3s;
    pointer-events: none;
  }

  .active {
    pointer-events: initial;
    opacity: 1;
  }


`
const EditingBox = styled.div<{
	isEditingMode: boolean
	isDarkMode: boolean
}>`
  border-radius: 12px 12px 0 0;
  background-color: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "white"};

  position: absolute;
  width: 100%;
  height: ${AdaptiveValue(50, 46)};
  bottom: ${({isEditingMode}) => isEditingMode ? "100%" : "0"};
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px 7px;
  z-index: -1;
  transition: .5s;

  .pencil-box {
    flex: 0 0 36px;
    border-right: 2px #8774e1 solid;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    //padding: 0 15px;
    padding-right: 10px;
    box-sizing: content-box;
  }

  .text-box {
    height: 100%;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
    padding-left: 10px;
    overflow: hidden;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      width: 20px;
      background-color: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "white"};
      box-shadow: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "white"} 0 0 50px 50px;
    }

    h1 {
      color: ${({isDarkMode}) => isDarkMode ? "white" : "rgb(47,47,47)"};

      font-family: Roboto, sans-serif;
      font-size: ${Rem(14)};
    }

    h2 {
      color: #8774e1;
      font-family: Roboto, sans-serif;
      font-size: ${Rem(14)};
    }
  }

  .cross {
    flex: 0 0 36px;
    height: 36px;
    position: relative;
    cursor: pointer;
    border-radius: 50%;
    transition: .3s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 2px;
      border-radius: 50px;
      background-color: rgb(170, 170, 170);
    }

    span:nth-of-type(1) {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    span:nth-of-type(2) {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`
