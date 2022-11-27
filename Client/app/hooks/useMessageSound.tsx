import {useEffect} from "react"

const UseMessageSound = (unSeenMessages: number) => {
	const messageAudio = new Audio("/audio/messageSound.mp3")
	const Play = async () => {
		await messageAudio.play()
	}
	useEffect(() => {
		if (unSeenMessages > 0)
			Play().then(r => r)
	}, [unSeenMessages])
}
export default UseMessageSound
