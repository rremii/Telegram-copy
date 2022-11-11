import React, {useContext} from "react"
import styled from "styled-components"
import ChatCell from "./Chat-cell"
import {SideBarContext} from "../../../hooks/useSideBarContext"
import {useTypedSelector} from "../../../store/ReduxStore"
import {useGetChatsByUserIdQuery} from "../../../api/ChatApiRtk"
import Preroll from "../../../ui/Preroll"
import useUpdateMemberOnline from "../../../hooks/useUpdateMemberOnline"


const ChatMenu = () => {

	const id = useTypedSelector(state => state.Me.me.user_id)


	const {isSearchOn} = useContext(SideBarContext)


	const {
		data: chats,
		isLoading,
		isFetching
	} = useGetChatsByUserIdQuery({user_id: id}, {
		pollingInterval: 2000,
		skip: !id
	})

	useUpdateMemberOnline(chats, isFetching)


	return <ChatMenuWrapper isSearchOn={isSearchOn}>

		{isLoading && <Preroll/>}

		{chats?.map(({chat_id, lastMessage, unSeenMessages, memberInfo}) => {
			return <ChatCell chat_id={chat_id} lastMessage={lastMessage}
							 unSeenMessages={unSeenMessages}
							 memberInfo={memberInfo}
							 key={chat_id}
			/>
		})}
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
