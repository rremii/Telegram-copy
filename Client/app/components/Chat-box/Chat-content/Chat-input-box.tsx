import {FC} from "react"
import styled from "styled-components"
import {Rem} from "../../../../styles/functions/mixins"
import Image from "next/image"
import {Field, Form, Formik} from "formik"
import {useAppDispatch, useTypedSelector} from "../../../store/ReduxStore"
import {addMessage} from "../../../store/ChatSlice"
import * as Yup from "yup"
import useScrollArrow from "../../../hooks/useScrollArrow"
import {ScrollChatToBottom} from "../../../utils/ScrollToChatBottom"

interface IChatInputBox {

}

const validSchema = Yup.object().shape({
	content: Yup.string().required()
})

const ChatInputBox: FC<IChatInputBox> = () => {

	const dispatch = useAppDispatch()

	const {currentChatId} = useTypedSelector(state => state.Chats)
	const {user_id} = useTypedSelector(state => state.Me.me)


	const {isScrollArrow} = useScrollArrow()


	return <ChatInputBoxWrapper>
		<div onClick={ScrollChatToBottom} className={`scroll-down-btn ${isScrollArrow ? "active" : ""} `}>
			<div className="arrow-cont">
				<Image layout="fill" src="/arrow-left-icon.svg"/>
			</div>
		</div>

		<Formik
			initialValues={{
				content: "" as string
			}}
			validationSchema={validSchema}
			onSubmit={(({content}, {resetForm}) => {
				if (!currentChatId) return
				dispatch(addMessage({content, user_id, chat_id: currentChatId}))
				resetForm()
			})}
		>
			{({dirty, isValid, handleSubmit}) => (
				<Form>

					<div className="input-box">
						<div className="input-cont">
							<Field name="content" placeholder="Message" type="text"/>
						</div>
						<div className="tail-cont">
							<Image layout="fill" className="tail" src={"/bubble-tail-left.svg"} alt=""/>
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
const ChatInputBoxWrapper = styled.div`
  flex: 0 0 54px;
  display: flex;
  align-items: center;
  width: calc(100% - 15px);
  border-radius: 12px 12px 0 12px;
  font-family: Roboto, sans-serif;
  position: relative;
  margin-top: 5px;


  .scroll-down-btn {
    position: absolute;
    background-color: rgb(33, 33, 33);
    width: 54px;
    height: 54px;
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
    padding-right: 70px;
  }

  .input-box {
    border-radius: inherit;
    //padding-left: 50px;
    background-color: rgb(33, 33, 33);
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
        padding-left: 50px;
        width: 100%;
        height: 100%;
        background-color: transparent;
        caret-color: rgb(135, 116, 225);
        color: white;
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
    width: 54px;
    height: 54px;
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
