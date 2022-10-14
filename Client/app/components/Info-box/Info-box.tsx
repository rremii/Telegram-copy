import React, {FC, useContext} from "react"
import styled from "styled-components"
import {AdaptiveValue} from "../../../styles/functions/mixins"
import {GlobalContext} from "../../hooks/useGlobalContext"
import Info from "./Info"
import Header from "./Header"

interface InfoBoxType {
}

const InfoBox: FC<InfoBoxType> = () => {

	const {screenMode} = useContext(GlobalContext)


	return <InfoBoxWrapper isOpen={screenMode === "info"}>
		<Header/>
		<Info/>
	</InfoBoxWrapper>
}
export default InfoBox
const InfoBoxWrapper = styled.div<{ isOpen: boolean }>`
  height: 100%;
  padding: 0;
  background-color: rgb(33, 33, 33);
  flex: 0 0 ${AdaptiveValue(420, 50)};
  z-index: 150;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0,0,0,0.25) -2px 0px 10px 0px;
  @media screen and (max-width: 1250px) {
    transition: 0.5s;
    position: absolute;
    flex-basis: initial;
    width: 420px;
    top: 0;
    left: 100%;
    transform: ${({isOpen}) => isOpen ? "translateX(-100%)" : "translateX(0)"};
  }
  @media screen and (max-width: 600px) {
    transition: 0.5s;
    position: absolute;
    flex-basis: initial;
    width: 100vw;
    top: 0;
    left: 100%;
    transform: ${({isOpen}) => isOpen ? "translateX(-100%)" : "translateX(0)"};
  }

`
