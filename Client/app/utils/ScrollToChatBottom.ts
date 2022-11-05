export const ScrollChatToBottom = () => {
	const scrollBox = document.getElementById("scroll-cont")
	if (scrollBox) {
		scrollBox.scrollTo(0, scrollBox.scrollHeight)
	}
}
