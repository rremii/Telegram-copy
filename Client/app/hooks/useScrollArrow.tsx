import {useEffect, useState} from "react"

const useScrollArrow = () => {


	const [isScrollArrow, setScrollArrow] = useState(false)

	useEffect(() => {
		const scrollBox = document.getElementById("scroll-cont")
		scrollBox?.addEventListener("scroll", HandleScroll)

		return () => window.removeEventListener("scroll", HandleScroll)
	})


	const HandleScroll = (e: Event) => {
		const scrollBox = e.currentTarget as HTMLDivElement
		//set is arrow to on in scroll more than 200px top
		if (scrollBox.scrollTop + scrollBox.clientHeight < scrollBox.scrollHeight - 200) {
			setScrollArrow(true)
		} else {
			setScrollArrow(false)
		}
	}

	return {
		isScrollArrow
	}

}
export default useScrollArrow
