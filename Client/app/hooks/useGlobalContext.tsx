import {createContext, useState} from "react"

export interface IGlobalContext {
	screenMode: "sideBar" | "chat" | "info"
	SetScreenMode: (values: "sideBar" | "chat" | "info") => void
	messageFontSize: string | null
	SetMessageFontSize: (values: string) => void
	background: string | null
	SetBackground: (values: string) => void
}


export const GlobalContext = createContext<IGlobalContext>({
	screenMode: "sideBar",
	SetScreenMode: (values) => {
	},
	messageFontSize: null,
	SetMessageFontSize: (values) => {
	},
	background: null,
	SetBackground: (values) => {
	},
})


const useGlobalContext = (): IGlobalContext => {
	//TODO check that all useContexts work correctly
	const [screenMode, setScreenMode] = useState<"sideBar" | "chat" | "info">("sideBar")
	const [messageFontSize, setMessageFontSize] = useState<string | null>(null)
	const [background, setBackground] = useState<string | null>(null)

	const SetScreenMode = (value: "sideBar" | "chat" | "info") => {
		setScreenMode(value)
	}
	const SetMessageFontSize = (value: string) => {
		setMessageFontSize(value)
	}
	const SetBackground = (value: string) => {
		setBackground(value)
	}
	return {
		screenMode,
		SetScreenMode,
		messageFontSize,
		SetMessageFontSize,
		background,
		SetBackground
	}
}
export default useGlobalContext
