import {useState, useEffect, useRef, Dispatch, SetStateAction} from 'react'

type TypeOut = {
    ref: any
    isShow: boolean
    setIsShow: Dispatch<SetStateAction<boolean>>
    refBtn: any
}

/* 
	Personal Hook
	Hide element when click outside
*/
export const useOutside = (initialIsVisible: boolean): TypeOut => {
    const [isShow, setIsShow] = useState(initialIsVisible)
    const ref = useRef<HTMLElement>(null)
    const refBtn = useRef<HTMLElement>(null)

    const handleClickOutside = (event: any) => {
        if (refBtn.current && refBtn.current !== event.target && !refBtn.current.contains(event.target)) {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsShow(false)
            }
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])
    return {ref, isShow, setIsShow, refBtn}
}

// const {ref, isShow, setIsShow} = useOutside(false)
