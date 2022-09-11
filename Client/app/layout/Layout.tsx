import React, {FC} from "react"
import useGlobalContext, {GlobalContext} from "../hooks/useGlobalContext"
import useSideBarContext, {SideBarContext} from "../hooks/useSideBarContext"

interface LayoutType {
	children: React.ReactNode
}

const Layout: FC<LayoutType> = ({children}) => {
	const globalContext = useGlobalContext()
	const sideBarContext = useSideBarContext()

	return <>
		<GlobalContext.Provider value={globalContext}>
			<SideBarContext.Provider value={sideBarContext}>

				{children}

			</SideBarContext.Provider>
		</GlobalContext.Provider>
	</>
}
export default Layout
