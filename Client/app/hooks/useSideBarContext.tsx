import {createContext, useState} from "react"
import {useLocalStorage} from "./useLocalStorage"

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
	isEditProfile: boolean
	SetEditProfile: (values: boolean) => void
	isLanguageSettings: boolean
	SetLanguageSettings: (values: boolean) => void

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
	isEditProfile: false,
	isLanguageSettings: false,
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
	SetEditProfile: (values) => {
	},
	SetLanguageSettings: (values) => {
	},

})


const useSideBarContext = (): ISideBarContext => {
	const [isProfile, setIsProfile] = useState(false)
	const [isBurger, setIsBurger] = useState(false)
	const [isSearchOn, setIsSearch] = useState(false)
	const [isSearchLayout, setIsSearchLayout] = useState(false)
	const [isDarkMode, setDarkMode] = useLocalStorage("isDarkMode", true)
	const [isLogout, setLogout] = useState(false)
	const [isLogoutPopUp, setLogoutPopUp] = useState(false)
	const [isSettings, setIsSettings] = useState(false)
	const [isBackgroundSettings, setBackgroundSettings] = useState(false)
	const [isEditProfile, setEditProfile] = useState(false)
	const [isLanguageSettings, setLanguageSettings] = useState(false)


	const SetIsBurger = (value: boolean) => setIsBurger(value)
	const SetIsProfile = (value: boolean) => setIsProfile(value)
	const SetIsSearch = (value: boolean) => setIsSearch(value)
	const SetIsSearchLayout = (value: boolean) => setIsSearchLayout(value)
	const SetDarkMode = (value: boolean) => setDarkMode(value)
	const SetLogout = (value: boolean) => setLogout(value)
	const SetLogoutPopUp = (value: boolean) => setLogoutPopUp(value)
	const SetIsSettings = (value: boolean) => setIsSettings(value)
	const SetBackgroundSettings = (value: boolean) => setBackgroundSettings(value)
	const SetEditProfile = (value: boolean) => setEditProfile(value)
	const SetLanguageSettings = (value: boolean) => setLanguageSettings(value)

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
		SetBackgroundSettings,
		isEditProfile,
		SetEditProfile,
		isLanguageSettings,
		SetLanguageSettings,
	}

}
export default useSideBarContext
