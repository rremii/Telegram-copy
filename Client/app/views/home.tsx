import React, {FC, useState} from "react"
import styled from "styled-components"
import SideBar from "../components/Side-bar/Side-bar"
import ChatBox from "../components/Chat-box/Chat-box"
import InfoBox from "../components/Info-box"

interface HomeType {
}


const Home: FC<HomeType> = () => {

	const [isOpen, setOpen] = useState(false)
	return (
		<HomeWrapper isOpen={isOpen} className="home__wrapper">
			<div className="home__container">
				<SideBar isOpen={isOpen} setOpen={setOpen}/>
				<ChatBox/>
				<InfoBox isOpen={isOpen}/>
			</div>
		</HomeWrapper>
	)
}
export default Home
const HomeWrapper = styled.div<{ isOpen: boolean }>`
  background-color: rgb(33, 33, 33);
  padding: 0;

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
