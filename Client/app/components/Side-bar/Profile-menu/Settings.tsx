import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../../../styles/functions/mixins"
import React, {useContext} from "react"
import {SideBarContext} from "../../../hooks/useSideBarContext"
import {GlobalContext} from "../../../hooks/useGlobalContext"

const Settings = () => {

	const {SetIsSettings, SetLanguageSettings, isDarkMode} = useContext(SideBarContext)
	const {language} = useContext(GlobalContext)


	return <SettingsWrapper isDarkMode={isDarkMode}>
		<div onClick={() => SetIsSettings(true)} className="cell">
			<div className="icon">
				<Image width={35} height={35} src="/setting-gray.svg"/>
			</div>
			<h1 className="title">
				{language === "English" ? "General Settings" : "Главные настройки"}
			</h1>
		</div>
		<div onClick={() => SetLanguageSettings(true)} className="cell">
			<div className="icon">
				<Image width={35} height={35} src="/language-icon.svg"/>
			</div>
			<h1 className="title">
				{language === "English" ? "Language" : "Язык"}
			</h1>
		</div>
	</SettingsWrapper>
}
export default React.memo(Settings)
const SettingsWrapper = styled.div<{
	isDarkMode: boolean
}>`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin: 12px 0;
  background-color: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "rgb(255,255,255)"};
  color: ${({isDarkMode}) => isDarkMode ? "white" : "black"};

  .cell {
    width: 100%;
    display: flex;
    padding: 10px;
    gap: 25px;
    border-radius: 10px;
    cursor: pointer;
    align-items: center;

    &:hover {
      background-color: ${({isDarkMode}) => isDarkMode ? "rgb(43, 43, 43)" : "rgb(226,226,226)"};

    }

    .icon {

    }

    .title {
      font-size: ${Rem(18)};
      font-weight: 500;
      font-family: Roboto, sans-serif;
    }
  }
`
