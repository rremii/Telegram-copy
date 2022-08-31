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
}


export const SideBarContext = createContext<ISideBarContext>({
	isProfile: true,
	isBurger: false,
	isSearchOn: false,
	isSearchLayout: false,
	isDarkMode: false,
	SetIsBurger: (values) => {
	},
	SetIsProfile: (values) => {
	},
	SetIsSearch: (values) => {
	},
	SetIsSearchLayout: (values) => {
	},
	SetDarkMode: (values) => {
	}
})


const useSideBarContext = (): ISideBarContext => {
	const [isProfile, setIsProfile] = useState(false)
	const [isBurger, setIsBurger] = useState(false)
	const [isSearchOn, setIsSearch] = useState(false)
	const [isSearchLayout, setIsSearchLayout] = useState(false)
	const [isDarkMode, setDarkMode] = useState(true)


	const SetIsBurger = (value: boolean) => setIsBurger(value)
	const SetIsProfile = (value: boolean) => setIsProfile(value)
	const SetIsSearch = (value: boolean) => setIsSearch(value)
	const SetIsSearchLayout = (value: boolean) => setIsSearchLayout(value)
	const SetDarkMode = (value: boolean) => setDarkMode(value)

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
		SetDarkMode
	}

}
export default useSideBarContext
