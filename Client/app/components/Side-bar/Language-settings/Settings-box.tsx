import styled from "styled-components"
import {Rem} from "../../../../styles/functions/mixins"
import {useContext} from "react"
import {GlobalContext} from "../../../hooks/useGlobalContext"
import {SideBarContext} from "../../../hooks/useSideBarContext"


const Languages = [
	{engName: "Russian", nativeName: "Русский"},
	{engName: "English", nativeName: "English"},
]

const SettingsBox = () => {

	const {language, SetLanguage} = useContext(GlobalContext)
	const {isDarkMode} = useContext(SideBarContext)

	const ChangeLanguage = (newLanguage: string) => {
		SetLanguage(newLanguage)
	}

	return <SettingsBoxWrapper isDarkMode={isDarkMode}>
		{Languages.map(({engName, nativeName}, i) => {
			return <div onClick={() => ChangeLanguage(engName)} key={i}
						className={`cell ${language === engName ? "active" : ""}`}>
				<div className="radio">
					<span/>
				</div>
				<div className="text-box">
					<h1>{engName}</h1>
					<h2>{nativeName}</h2>
				</div>
			</div>
		})}

	</SettingsBoxWrapper>
}
export default SettingsBox
const SettingsBoxWrapper = styled.div<{
	isDarkMode: boolean
}>`
  background-color: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "white"};
  color: ${({isDarkMode}) => isDarkMode ? "white" : "rgb(47,47,47)"};

  padding: 8px 6px 20px;

  .cell {
    padding: 10px 18px;
    display: flex;
    align-items: center;
    gap: 40px;
    transition: .4s;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      background-color: ${({isDarkMode}) => isDarkMode ? "rgb(43, 43, 43)" : "rgba(178,178,178,0.19)"};

    }

    .radio {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: rgb(159, 159, 159) 2px solid;
      position: relative;
      transition: .3s;

      span {
        position: absolute;
        transition: .3s;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 13px;
        height: 13px;
        background-color: transparent;
        border-radius: 50%;
      }
    }


    .text-box {
      display: flex;
      flex-direction: column;
      gap: 5px;

      h1 {
        font-size: ${Rem(16)};
        font-family: Roboto, sans-serif;
      }

      h2 {
        font-size: ${Rem(14)};
        color: rgb(170, 170, 170);
        font-family: Roboto, sans-serif;
      }
    }
  }

  .active {
    .radio {

      border: rgb(135, 116, 225) 2px solid;

      span {
        background-color: rgb(135, 116, 225);

      }
    }

`
