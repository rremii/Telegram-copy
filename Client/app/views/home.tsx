import React, {FC, useEffect, useState} from "react"
import styled from "styled-components"
import SideBar from "../components/Side-bar/Side-bar"
import ChatBox from "../components/Chat-box/Chat-box"
import InfoBox from "../components/Info-box"
import LogoutPopUp from "../components/Globals/Logout-pop-up"
import {fetchMe} from "../store/MeSlice"
import {useAppDispatch} from "../store/ReduxStore"

interface HomeType {
}


const Home: FC<HomeType> = () => {
	const dispatch = useAppDispatch()
	const [isOpen, setOpen] = useState(false)

	useEffect(() => {
		dispatch(fetchMe())
	})

	return (
		<HomeWrapper isOpen={isOpen} className="home__wrapper">

			<div className="home__container">
				<SideBar isOpen={isOpen} setOpen={setOpen}/>
				<ChatBox/>
				<InfoBox isOpen={isOpen}/>
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
