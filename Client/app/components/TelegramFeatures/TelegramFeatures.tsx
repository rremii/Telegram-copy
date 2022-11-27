import React, {useContext} from "react"
import styled from "styled-components"
import {GlobalContext} from "../../hooks/useGlobalContext"
import FeaturesContent from "./Chat-content/Features-content"
import Header from "./Header/Header"


const TelegramFeatures = () => {
	const {screenMode, background} = useContext(GlobalContext)

	return <TelegramFeaturesWrapper background={background} screenMode={screenMode}>
		<div className="telegram-features-content">
			<Header/>
			<FeaturesContent/>
		</div>
	</TelegramFeaturesWrapper>
}
export default TelegramFeatures
const TelegramFeaturesWrapper = styled.div<{
	screenMode: "sideBar" | "chat" | "info"
	background: string
}>`
  height: 100%;
  padding: 0;
  background-color: rgb(33, 33, 33);
  background-image: ${({background}) => ("url(/backgrounds/" + background + ")")};
  //background-image: url("/chat-background.jpg");
  background-size: cover;
  flex: 1 1 auto;
  z-index: 15;
  @media screen and (max-width: 920px) {
    z-index: 15;
    position: absolute;
    top: 0;
    width: 100vw;
    transition: .4s left;
    left: ${({screenMode}) => screenMode !== "sideBar" ? 0 : "420px"};
  }
  @media screen and (max-width: 600px) {
    z-index: 15;
    position: absolute;
    top: 0;
    width: 100vw;
    transition: .4s left;
    left: ${({screenMode}) => screenMode !== "sideBar" ? 0 : "100%"};
  }

  .telegram-features-content {
    width: 100%;
    height: 100%;
    flex-direction: column;

  }
`
