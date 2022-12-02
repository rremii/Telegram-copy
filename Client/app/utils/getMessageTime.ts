// const twentyFourHours = 60 * 60 * 24

export const getMessageTime = (stringDate: string | null) => {
	if (!stringDate) return ""
	return new Date(stringDate).getHours().toString().padStart(2, "0")
		+ ":"
		+ new Date(stringDate).getMinutes().toString().padStart(2, "0")


}
