import React, {FC, useContext, useEffect} from "react"
import styled from "styled-components"
import SideBar from "../components/Side-bar/Side-bar"
import ChatBox from "../components/Chat-box/Chat-box"
import InfoBox from "../components/Info-box/Info-box"
import LogoutPopUp from "../components/Globals/Logout-pop-up"
import {fetchMe, setMe} from "../store/MeSlice"
import {useAppDispatch} from "../store/ReduxStore"
import {GlobalContext} from "../hooks/useGlobalContext"
import {useRouter} from "next/router"
import TelegramFeatures from "../components/TelegramFeatures/TelegramFeatures"
import {useGetMeQuery} from "../api/rtk/MeApi"

interface HomeType {
}


const Home: FC<HomeType> = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()

	const {screenMode} = useContext(GlobalContext)


	const {data: userData,} = useGetMeQuery()


	useEffect(() => {
		if (userData)
			dispatch(setMe(userData))
	}, [userData])

	const queryPath = router.asPath


	return (
		<HomeWrapper isOpen={screenMode === "info"} className="home__wrapper">

			<div className="home__container">
				<SideBar/>
				{queryPath === "/?TelegramTips" ? <TelegramFeatures/> :
					<>
						<ChatBox/>
						<InfoBox/>
					</>
				}
				<LogoutPopUp/>
			</div>

		</HomeWrapper>
	)
}
export default Home
const HomeWrapper = styled.div<{ isOpen: boolean }>`
  background-color: rgb(33, 33, 33);
  padding: 0;
  position: relative;
  overflow: hidden;
  width: 100vw;

  .home__container {
    transition: 0.7s width;
    width: ${({isOpen}) => isOpen ? "100%" : "calc(100vw + 420px)"};
    position: relative;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 1250px) {
      width: 100%;
    }
  }
`
