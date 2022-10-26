import {createContext, useState} from "react"

export interface ISideBarContext {
	isProfile: boolean
	SetIsProfile: (values: boolean) => void
	isBurger: boolean
	SetIsBurger: (values: boolean) => void
	isSearchOn: boolean
	SetIsSearch: (values: boolean) => void
	isSearchLayout: boolean
	SetIsSearchLayout: (values: boolean) => void
	isDarkMode: boolean
	SetDarkMode: (values: boolean) => void
	isLogout: boolean
	SetLogout: (values: boolean) => void
	isLogoutPopUp: boolean
	SetLogoutPopUp: (values: boolean) => void
	isSettings: boolean
	SetIsSettings: (values: boolean) => void
	isBackgroundSettings: boolean
	SetBackgroundSettings: (values: boolean) => void
}


export const SideBarContext = createContext<ISideBarContext>({
	isProfile: true,
	isBurger: false,
	isSearchOn: false,
	isSearchLayout: false,
	isDarkMode: false,
	isLogout: false,
	isLogoutPopUp: false,
	isSettings: false,
	isBackgroundSettings: false,
	SetIsBurger: (values) => {
	},
	SetIsProfile: (values) => {
	},
	SetIsSearch: (values) => {
	},
	SetIsSearchLayout: (values) => {
	},
	SetDarkMode: (values) => {
	},
	SetLogout: (values) => {
	},
	SetLogoutPopUp: (values) => {
	},
	SetIsSettings: (values) => {
	},
	SetBackgroundSettings: (values) => {
	},
})


const useSideBarContext = (): ISideBarContext => {
	const [isProfile, setIsProfile] = useState(false)
	const [isBurger, setIsBurger] = useState(false)
	const [isSearchOn, setIsSearch] = useState(false)
	const [isSearchLayout, setIsSearchLayout] = useState(false)
	const [isDarkMode, setDarkMode] = useState(true)
	const [isLogout, setLogout] = useState(false)
	const [isLogoutPopUp, setLogoutPopUp] = useState(false)
	const [isSettings, setIsSettings] = useState(false)
	const [isBackgroundSettings, setBackgroundSettings] = useState(false)


	const SetIsBurger = (value: boolean) => setIsBurger(value)
	const SetIsProfile = (value: boolean) => setIsProfile(value)
	const SetIsSearch = (value: boolean) => setIsSearch(value)
	const SetIsSearchLayout = (value: boolean) => setIsSearchLayout(value)
	const SetDarkMode = (value: boolean) => setDarkMode(value)
	const SetLogout = (value: boolean) => setLogout(value)
	const SetLogoutPopUp = (value: boolean) => setLogoutPopUp(value)
	const SetIsSettings = (value: boolean) => setIsSettings(value)
	const SetBackgroundSettings = (value: boolean) => setBackgroundSettings(value)

	return {
		isProfile,
		SetIsProfile,
		isBurger,
		SetIsBurger,
		isSearchOn,
		SetIsSearch,
		isSearchLayout,
		SetIsSearchLayout,
		isDarkMode,
		SetDarkMode,
		isLogout,
		SetLogout,
		isLogoutPopUp,
		SetLogoutPopUp,
		isSettings,
		SetIsSettings,
		isBackgroundSettings,
		SetBackgroundSettings
	}

}
export default useSideBarContext
