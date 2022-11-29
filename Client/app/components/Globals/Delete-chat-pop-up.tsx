import React, {useContext} from "react"
import styled from "styled-components"
import {Rem} from "../../../styles/functions/mixins"
import {useAppDispatch, useTypedSelector} from "../../store/ReduxStore"
import {GlobalContext} from "../../hooks/useGlobalContext"
import {resetCurrentChat} from "../../store/ChatSlice"
import {useRouter} from "next/router"
import {useGetMeQuery} from "../../api/rtk/MeApi"
import {useDeleteChatMutation} from "../../api/rtk/ChatApi"
import {SideBarContext} from "../../hooks/useSideBarContext"


const DeleteChatPopUp = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()


	const {user_id} = useTypedSelector(state => state.Chats.currentChat.memberInfo)
	const {firstName} = useTypedSelector(state => state.Chats.currentChat.memberInfo)


	const {data: userData} = useGetMeQuery()
	const [deleteChat] = useDeleteChatMutation()


	const {
		isChatDeletePopUp,
		SetChatDeletePopUp,
		SetScreenMode,
		language,
	} = useContext(GlobalContext)
	const {isDarkMode} = useContext(SideBarContext)

	const DeleteChat = () => {
		if (!userData) return
		deleteChat([user_id, userData.user_id])
		dispatch(resetCurrentChat())
		router.push("/")
		SetChatDeletePopUp(false)
		SetScreenMode("sideBar")
	}

	return <DeleteChatPopUpWrapper isDarkMode={isDarkMode} isActive={isChatDeletePopUp}>
		<div className="pop-up-cont">
			<h1>{language === "English" ? "Delete chat" : "Удалить чат"}</h1>
			<span>{language === "English" ?
				`Permanently delete the chat with ${firstName}` :
				`Навсегда удалить чат с ${firstName}`}</span>
			<div className="btn-cont">
				<button onClick={() => SetChatDeletePopUp(false)} className="cancel">CANCEL</button>
				<button onClick={DeleteChat} className="delete">DELETE</button>
			</div>
		</div>
	</DeleteChatPopUpWrapper>
}
export default DeleteChatPopUp
// const DeleteChatPopUpWrapper = styled.div(LogoutPopUpWrapper)
const DeleteChatPopUpWrapper = styled.div<{
	isActive: boolean
	isDarkMode: boolean
}>`
  color: ${({isDarkMode}) => isDarkMode ? "white" : "rgb(47,47,47)"};
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .3s;
  opacity: ${({isActive}) => isActive ? 1 : 0};
  pointer-events: ${({isActive}) => isActive ? "initial" : "none"};

  .pop-up-cont {
    border-radius: 10px;
    width: 270px;
    height: 200px;
    //padding: 12px 8px;
    box-shadow: 0 2px 2px 0, rgba(0, 0, 0, 0.14);
    background-color: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "white"};
    padding: 16px 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    //TODO check that all transition are applied to specific properties
    transition: .3s;
    transform: ${({isActive}) => isActive ?
            "translateY(0) scale(1)" : " scale(0.8)translateY(100px)"};

    h1 {
      font-family: Roboto, sans-serif;
      font-size: ${Rem(21)};
      font-weight: 500;
    }

    span {
      margin-top: 10px;
      font-family: Roboto, sans-serif;
      font-size: ${Rem(17)};
      font-weight: 500;
    }


    .btn-cont {
      margin-top: 15px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      button {
        width: 90px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${Rem(17)};
        font-family: Roboto, sans-serif;
        border-radius: 10px;
      }

      .cancel {
        color: rgb(135, 116, 225);

        &:hover {
          background-color: rgba(135, 116, 225, 0.1);
        }
      }

      .delete {
        &:hover {
          background-color: rgba(255, 89, 90, 0.1);
        }

        color: rgb(255, 89, 90);
      }
    }
  }
`
