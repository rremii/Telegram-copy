import {createContext, useState} from "react"
import {useLocalStorage} from "./useLocalStorage"

export interface IGlobalContext {
	screenMode: "sideBar" | "chat" | "info"
	SetScreenMode: (values: "sideBar" | "chat" | "info") => void
	messageFontSize: string
	SetMessageFontSize: (values: string) => void
	background: string
	SetBackground: (values: string) => void
	isBackgroundBlur: "true" | "false"
	SetBackgroundBlur: (values: "true" | "false") => void
}


export const GlobalContext = createContext<IGlobalContext>({
	screenMode: "sideBar",
	SetScreenMode: (values) => {
	},
	messageFontSize: "16",
	SetMessageFontSize: (values) => {
	},
	background: "forest.png",
	SetBackground: (values) => {
	},
	isBackgroundBlur: "false",
	SetBackgroundBlur: (values: "true" | "false") => {
	}

})


const useGlobalContext = (): IGlobalContext => {
	//TODO check that all useContexts work correctly
	const [screenMode, setScreenMode] = useState<"sideBar" | "chat" | "info">("sideBar")
	const [messageFontSize, setMessageFontSize] = useLocalStorage("message-font-size", "16")
	const [background, setBackground] = useLocalStorage("background", "forest.png")
	const [isBackgroundBlur, setBackgroundBlur] = useLocalStorage("backgroundBlur", "false")

	const SetScreenMode = (value: "sideBar" | "chat" | "info") => {
		setScreenMode(value)
	}
	const SetMessageFontSize = (value: string) => {
		setMessageFontSize(value)
	}
	const SetBackground = (value: string) => {
		setBackground(value)
	}
	const SetBackgroundBlur = (value: "true" | "false") => {
		setBackgroundBlur(value)
	}
	return {
		screenMode,
		SetScreenMode,
		messageFontSize,
		SetMessageFontSize,
		background,
		SetBackground,
		isBackgroundBlur,
		SetBackgroundBlur
	}
}
export default useGlobalContext
