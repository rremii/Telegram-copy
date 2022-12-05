import styled from "styled-components"
import Header from "./Header"
import SettingsBox from "./Settings-box"
import React, {useContext} from "react"
import {SideBarContext} from "../../../hooks/useSideBarContext"

const LanguageSettings = () => {

	const {isLanguageSettings, isDarkMode} = useContext(SideBarContext)


	return <LanguageSettingsWrapper isDarkMode={isDarkMode} isSettings={isLanguageSettings}>
		<div className="LanguageSettings-cont">
			<Header/>
			<SettingsBox/>
		</div>
	</LanguageSettingsWrapper>
}
export default React.memo(LanguageSettings)
const LanguageSettingsWrapper = styled.div<{
	isSettings: boolean
	isDarkMode: boolean
}>`

  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 55;
  background-color: transparent;
  pointer-events: none;
  overflow: hidden;
  gap: 1px;

  .LanguageSettings-cont {
    transition: .4s;
    pointer-events: initial;
    position: absolute;
    left: 100%;
    top: 0;
    transform: ${({isSettings}) => isSettings ? "translateX(-100%)" : "translateX(0)"};
    width: 100%;
    height: 100%;
    background-color: ${({isDarkMode}) => isDarkMode ? "rgb(22, 22, 22)" : "rgb(170,170,170)"};
    gap: 1px;
    display: flex;
    flex-direction: column;

  }






`
