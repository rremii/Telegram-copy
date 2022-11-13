import {message} from "../store/types"

const twentyFourHours = 1000 * 60 * 60 * 24


const getDateDifference = (stringDate: string) => {
	if (!stringDate) return ""
	// const createdDate = new Date(stringDate).getTime()

	// const difference = (Date.now() - createdDate)
	// if (difference <= twentyFourHours) return "Today"

	const messageDate = new Date(stringDate).toLocaleDateString("en-us", {
		month: "long",
		day: "numeric",
		year: "numeric",

	})

	const currentDate = new Date().toLocaleDateString("en-us", {month: "long", day: "numeric", year: "numeric"})

	if (messageDate === currentDate) return "Today"


	//excluding year from the string
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
