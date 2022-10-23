import {createContext, useState} from "react"

export interface IGlobalContext {
	screenMode: "sideBar" | "chat" | "info"
	SetScreenMode: (values: "sideBar" | "chat" | "info") => void
	// isMessageSettings:boolean
	// setMessageSettings:(values:boolean)=>
}


export const GlobalContext = createContext<IGlobalContext>({
	screenMode: "sideBar",
	SetScreenMode: (values) => {
	},

})


const useGlobalContext = (): IGlobalContext => {
	const [screenMode, setScreenMode] = useState<"sideBar" | "chat" | "info">("sideBar")
	const SetScreenMode = (value: "sideBar" | "chat" | "info") => {
		setScreenMode(value)
	}
	return {
		screenMode,
		SetScreenMode
	}
}
export default useGlobalContext
