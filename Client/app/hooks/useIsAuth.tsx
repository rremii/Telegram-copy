import {useRouter} from "next/router"
import {useEffect} from "react"
import {useAppDispatch, useTypedSelector} from "../store/ReduxStore"
import {fetchCheckIsAuth} from "../store/AuthSlice"

const useIsAuth = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const {isLoggedIn} = useTypedSelector((state) => state.Auth)
	const {isPending} = useTypedSelector((state) => state.Auth)

	useEffect(() => {
		if (!localStorage.getItem("accessToken")) router.push("./auth")
		// if access token is dead then check refresh
		if (process.env.NEXT_PUBLIC_MODE === "production") {
			if (isLoggedIn === "first loading") dispatch(fetchCheckIsAuth())
		}
		if (process.env.NEXT_PUBLIC_MODE === "development") {
			return () => {
				if (isLoggedIn === "first loading") dispatch(fetchCheckIsAuth())
			}
		}
	}, [])

	useEffect(() => {
		// if login\refresh was rejected
		if (isLoggedIn === "rejected" || !localStorage.getItem("accessToken")) router.push("./auth")
	}, [dispatch, isLoggedIn])

	return {isPending, isLoggedIn}
}
export default useIsAuth

// HomePage.getInitialProps = wrapper.getInitialPageProps(({dispatch}) =>
//
//
//     async () => {
//         await dispatch(await fetchCheckIsAuth());
//     }
// );
