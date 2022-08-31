import {useRouter} from "next/router"
import {useTypedSelector} from "../store/ReduxStore"

const useIsLoginPage = () => {
	const router = useRouter()

	const {codeError} = useTypedSelector((state) => state.Auth)
	const {emailError} = useTypedSelector((state) => state.Auth)

	const isLoginPage = router.pathname.split("/")[2] === "login"
	let mainColor = isLoginPage ? "rgb(42, 158, 214)" : "rgb(135, 116, 225)"

	if (codeError || emailError) mainColor = "rgb(172,39,39)"

	return {isLoginPage, mainColor}
}
export default useIsLoginPage
