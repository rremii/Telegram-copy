import React, {useEffect, useState} from "react"

const UseRipple = () => {

	const [isRipple, setIsRipple] = useState(false)
	const [X, setX] = useState(0)
	const [Y, setY] = useState(0)


	const SetIsRipple = (e: React.MouseEvent<HTMLButtonElement>): void => {
		const ElCoordinates = e.currentTarget.getClientRects()
		const {left, top} = ElCoordinates[0]

		setX(e.clientX - left)
		setY(e.clientY - top)
		setIsRipple(true)
	}
	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsRipple(false)
		}, 700)
		return () => clearTimeout(timeout)
	}, [isRipple])

	return {
		isRipple, SetIsRipple, X, Y
	}

}
export default UseRipple
