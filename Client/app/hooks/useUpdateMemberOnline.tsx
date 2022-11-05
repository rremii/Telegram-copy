import {useEffect} from "react"
import {setCurrentMemberOnline} from "../store/ChatSlice"
import {Chat} from "../store/types"
import {useAppDispatch, useTypedSelector} from "../store/ReduxStore"

const useUpdateMemberOnline = (chats: Chat[] | undefined, isFetching: boolean) => {
	const dispatch = useAppDispatch()

	const {currentChatId} = useTypedSelector(state => state.Chats)

	useEffect(() => {
		if (currentChatId && chats) {
			const currentChat = chats.find(({chat_id}) => chat_id === currentChatId)
			if (currentChat?.memberInfo.lastOnline) dispatch(setCurrentMemberOnline(currentChat.memberInfo.lastOnline))
		}
	}, [isFetching])
}
export default useUpdateMemberOnline
