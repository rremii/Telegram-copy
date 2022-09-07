import {createContext, useState} from "react"

export interface IGlobalContext {
	screenMode: "sideBar" | "chat"
	SetScreenMode: (values: "sideBar" | "chat") => void
}


export const GlobalContext = createContext<IGlobalContext>({
	screenMode: "sideBar",
	SetScreenMode: (values) => {
	},
})


const useGlobalContext = (): IGlobalContext => {
	const [screenMode, setScreenMode] = useState<"sideBar" | "chat">("sideBar")
	const SetScreenMode = (value: "sideBar" | "chat") => {
		setScreenMode(value)
	}
	return {
		screenMode,
		SetScreenMode
	}
}
export default useGlobalContext
