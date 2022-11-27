import Home from "../app/views/home"
import {NextPageWithLayout} from "./_app"
import useIsAuth from "../app/hooks/useIsAuth"

const HomePage: NextPageWithLayout = () => {
	const {isPending, isLoggedIn} = useIsAuth()
	return <main>{!isPending && isLoggedIn === "success" && <Home/>}</main>
}
export default HomePage
