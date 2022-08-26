import React, {useEffect, useState} from "react"

const UseRipple = () => {

	const [isRipple, setIsRipple] = useState(false)
	const [clientX, setClientX] = useState(0)
	const [clientY, setClientY] = useState(0)


	const SetIsRipple = (e: React.MouseEvent<HTMLButtonElement>): void => {
		setClientX(e.clientX)
		setClientY(e.clientY)
		setIsRipple(true)
	}
	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsRipple(false)
		}, 700)
		return () => clearTimeout(timeout)
	}, [isRipple])

	return {
		isRipple, SetIsRipple, clientX, clientY
	}

}
export default UseRipple
