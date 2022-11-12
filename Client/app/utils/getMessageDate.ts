import {message} from "../store/types"

const twentyFourHours = 1000 * 60 * 60 * 24


const getDateDifference = (stringDate: string) => {
	if (!stringDate) return ""
	const createdDate = new Date(stringDate).getTime()

	const difference = (Date.now() - createdDate)
	if (difference <= twentyFourHours) return "Today"

	const arrOfDate = new Date(stringDate).toLocaleString("en-us", {month: "long", day: "numeric"}).split(" ")

	return arrOfDate[0] + " " + arrOfDate[1] // month + day

}

export const getMessageDate = (messages: message[], index: number) => {
	const prevMessage = messages[index - 1]
	const curMessage = messages[index]


	const curCreationDate = getDateDifference(curMessage.createdAt)

	if (!prevMessage) return curCreationDate
	const prevCreationDate = getDateDifference(prevMessage.createdAt)

	if (prevCreationDate !== curCreationDate) return curCreationDate

	return null
}
