import { useEffect } from "react"
import { useAppDispatch, useTypedSelector } from "../store/ReduxStore"
import { clearAuthErrors } from "../store/AuthSlice"

export const useClearErrors = () => {
    const dispatch = useAppDispatch()
    const { codeError } = useTypedSelector((state) => state.Auth)
    const { emailError } = useTypedSelector((state) => state.Auth)

    useEffect(() => {
        if (codeError || emailError) {
            const timeout = setTimeout(() => {
                dispatch(clearAuthErrors())
            }, 3000)
            return () => clearTimeout(timeout)
        }
    }, [codeError, emailError])
}
