import {message} from "../store/types"


const getDateDifference = (stringDate: string) => {
	if (!stringDate) return ""

	const messageDate = new Date(stringDate).toLocaleDateString("en-us", {
		month: "long",
		day: "numeric",
		year: "numeric",

	})

	const currentDate = new Date().toLocaleDateString("en-us", {month: "long", day: "numeric", year: "numeric"})

	if (messageDate === currentDate) return "Today"


	const arrOfDate = messageDate.split(",")[0].split(" ")

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
