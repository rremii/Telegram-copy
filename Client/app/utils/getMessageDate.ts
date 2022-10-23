const twentyFourHours = 60 * 60 * 24

export const getMessageDate = (stringDate: string | null) => {
	if (!stringDate) return ""
	const updatedDate = new Date(stringDate).getTime()

	const difference = (Date.now() - updatedDate) / 1000

	if (difference <= twentyFourHours) {
		return new Date(stringDate).getHours().toString().padStart(2, "0")
			+ ":"
			+ new Date(stringDate).getMinutes().toString().padStart(2, "0")
	}
	if (difference > twentyFourHours) {

		const arrOfDate = new Date(stringDate).toDateString().split(" ")

		return arrOfDate[1] + " " + arrOfDate[2] // month + day

	}

	return ""
}
