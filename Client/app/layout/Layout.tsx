import React, {FC} from "react"

interface LayoutType {
	children: React.ReactNode
}

const Layout: FC<LayoutType> = ({children}) => {
	return <>
		{children}
	</>
}
export default Layout
