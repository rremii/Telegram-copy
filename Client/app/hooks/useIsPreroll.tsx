import {useEffect, useState} from "react"
//TODO get rid of it cuz i dont need that probably
export const UseIsPreroll = (
	currentChatId: number | null,
	isLoading: boolean,
	isFetching: boolean) => {

	if (isLoading) return {isPreroll: true}
	if (!isLoading) return {isPreroll: false}


	const [lastChatId, setChatId] = useState<number | null>(null)
	const [isPreroll, setPreroll] = useState<boolean>(false)

	useEffect(() => {
		if (isFetching && currentChatId !== lastChatId) {
			setPreroll(true)
		} else {
			setPreroll(false)
		}

	}, [isFetching])


	return {isPreroll}
}
