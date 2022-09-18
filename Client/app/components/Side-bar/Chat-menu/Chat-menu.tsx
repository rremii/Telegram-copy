import React, {useContext, useEffect} from "react"
import styled from "styled-components"
import ChatCell from "./Chat-cell"
import {SideBarContext} from "../../../hooks/useSideBarContext"
import useGlobalContext from "../../../hooks/useGlobalContext"
import {useAppDispatch, useTypedSelector} from "../../../store/ReduxStore"
import {fetchChatsByUserId} from "../../../store/ChatSlice"


// const chat = [
// 	{
// 		avatar: "/dog-icon.png",
// 		title: "Go StudyGo StudyGo StudyGo Study",
// 		subTitle: "some message from Go Study some message from Go Study"
// 	}
// ]

const ChatMenu = () => {
	const dispatch = useAppDispatch()

	const id = useTypedSelector(state => state.Me.me.user_id)

	const {isSearchOn} = useContext(SideBarContext)


	useEffect(() => {
		dispatch(fetchChatsByUserId(id))
	}, [id])


	const {chats} = useTypedSelector(state => state.Chats)

	return <ChatMenuWrapper isSearchOn={isSearchOn}>
		{chats.map(({chatId, memberData}) => {
			return <ChatCell key={chatId} avatar={memberData.profilePic}
							 subTitle={"gotta fix"}
							 title={memberData.firstName + " " + memberData.lastName}/>
		})
		}
	</ChatMenuWrapper>
}
export default ChatMenu
const ChatMenuWrapper = styled.div<{
	isSearchOn: boolean
}>`
  overflow: hidden;

  //header height
  height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  transition: 0.4s;
  transform: ${({isSearchOn}) => isSearchOn ? "scale(0.95)" : "scale(1)"};
  opacity: ${({isSearchOn}) => isSearchOn ? 0 : 1};

  ::-webkit-scrollbar {
    background-color: transparent;
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #777777;
    border-radius: 5px;
  }

`
