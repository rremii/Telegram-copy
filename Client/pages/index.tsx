import Home from "../app/views/home"
import {NextPageWithLayout} from "./_app"

const HomePage: NextPageWithLayout = () => {
	// const { isPending, isLoggedIn } = useIsAuth()
	// return <main>{!isPending && isLoggedIn === "success" && <Home />}</main>
	return <main><Home/></main>
}
export default HomePage
// HomePage.getLayout = function (page: ReactElement) {
//     return <>
//         {page}
//         <div>footer</div>
//     </>
// }
