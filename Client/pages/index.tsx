import Home from "../app/components/Home"
import { NextPageWithLayout } from "./_app"
import useIsAuth from "../app/hooks/useIsAuth"

const HomePage: NextPageWithLayout = () => {
    const { isPending, isLoggedIn } = useIsAuth()
    return <main>{!isPending && isLoggedIn === "success" && <Home />}</main>
}
export default HomePage
// HomePage.getLayout = function (page: ReactElement) {
//     return <>
//         {page}
//         <div>footer</div>
//     </>
// }
