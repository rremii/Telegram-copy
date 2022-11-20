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
	language: string
	SetLanguage: (values: string) => void
	isMessageSettings: boolean
	SetMessageSettings: (values: boolean) => void
	isEditingMode: boolean
	SetEditingMode: (values: boolean) => void
	isChatSettings: boolean
	SetChatSettings: (values: boolean) => void
	isChatDeletePopUp: boolean
	SetChatDeletePopUp: (values: boolean) => void
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
	},
	language: "English",
	SetLanguage: (values: string) => {
	},
	isMessageSettings: false,
	SetMessageSettings: (values) => {
	},
	isEditingMode: false,
	SetEditingMode: (values: boolean) => {
	},
	isChatSettings: false,
	SetChatSettings: (values: boolean) => {
	},
	isChatDeletePopUp: false,
	SetChatDeletePopUp: (values) => {
	}
})


const useGlobalContext = (): IGlobalContext => {
	//TODO check that all useContexts work correctly
	const [screenMode, setScreenMode] = useState<"sideBar" | "chat" | "info">("sideBar")
	const [messageFontSize, setMessageFontSize] = useLocalStorage("message-font-size", "16")
	const [background, setBackground] = useLocalStorage("background", "forest.png")
	const [isBackgroundBlur, setBackgroundBlur] = useLocalStorage("backgroundBlur", "false")
	const [language, setLanguage] = useLocalStorage("language", "English")
	const [isMessageSettings, setMessageSettings] = useState(false)
	const [isEditingMode, setEditingMode] = useState(false)
	const [isChatSettings, setChatSettings] = useState(false)
	const [isChatDeletePopUp, setChatDeletePopUp] = useState(false)


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
	const SetLanguage = (value: string) => {
		setLanguage(value)
	}
	const SetMessageSettings = (value: boolean) => {
		setMessageSettings(value)
	}
	const SetEditingMode = (value: boolean) => {
		setEditingMode(value)
	}
	const SetChatSettings = (value: boolean) => {
		setChatSettings(value)
	}
	const SetChatDeletePopUp = (value: boolean) => {
		setChatDeletePopUp(value)
	}

	return {
		screenMode,
		SetScreenMode,
		messageFontSize,
		SetMessageFontSize,
		background,
		SetBackground,
		isBackgroundBlur,
		SetBackgroundBlur,
		SetLanguage,
		language,
		isEditingMode,
		SetEditingMode,
		isMessageSettings,
		SetMessageSettings,
		isChatSettings,
		SetChatSettings,
		isChatDeletePopUp,
		SetChatDeletePopUp
	}
}
export default useGlobalContext
