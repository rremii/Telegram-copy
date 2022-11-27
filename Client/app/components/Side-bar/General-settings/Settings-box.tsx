import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../../../styles/functions/mixins"
import {ChangeEvent, useContext} from "react"
import {GlobalContext} from "../../../hooks/useGlobalContext"
import {SideBarContext} from "../../../hooks/useSideBarContext"

const maxFontSize = 20
const minFontSize = 12

const CalcPercentOfRange = (messageFontSize: number) => {
	return (messageFontSize - minFontSize) / (maxFontSize - minFontSize) * 100
}

const SettingsBox = () => {


	const {messageFontSize, SetMessageFontSize, language} = useContext(GlobalContext)
	const {SetBackgroundSettings} = useContext(SideBarContext)


	const HandleOnRangeChange = (e: ChangeEvent<HTMLInputElement>) => {
		SetMessageFontSize(e.currentTarget.value)
	}


	return <SettingsBoxWrapper fontSize={CalcPercentOfRange(+messageFontSize)}>

		<h1 className="title">{language === "English" ? "Settings" : "Настройки"}</h1>
		<div className="text-size-box">
			<h2 className="sub-title">
				{language === "English" ? "Message Text Size" : "Размер Шрифта"}
				<span>{+messageFontSize}</span>
			</h2>
			<input value={+messageFontSize} min={minFontSize} step={1} max={maxFontSize}
				   onChange={HandleOnRangeChange} type="range"/>
		</div>
		<div onClick={() => SetBackgroundSettings(true)} className="bg-box">
			<Image width={29} height={29} src="/gallery-icon.svg"/>
			<span>{language === "English" ? "Chat Background" : "Фон"}</span>
		</div>
	</SettingsBoxWrapper>
}
export default SettingsBox
const SettingsBoxWrapper = styled.div<{
	fontSize: number
}>`
  background-color: rgb(33, 33, 33);
  padding: 8px 6px 20px;


  .title {
    color: #8774e1;
    font-family: Roboto, sans-serif;
    font-size: ${Rem(16)};
    font-weight: 500;
    padding: 8px 18px;

  }

  .text-size-box {
    padding: 16px 14px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .sub-title {
      color: white;
      font-family: Roboto, sans-serif;
      font-size: ${Rem(16)};
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        color: #AAAAAA;
      }
    }

    input[type="range"] {
      width: 100%;
      -webkit-appearance: none;
      height: 3px;
      border-radius: 6px;
      cursor: pointer;
      outline: none;
      padding: 0;
      margin: 0;
      position: relative;
      background-color: #AAAAAA;

      &::after {
        position: absolute;
        content: '';
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        background-color: #8774e1;
        height: 100%;
        width: ${({fontSize}) => fontSize + "%"};
        border-radius: inherit;
      }
    }


    input[type='range']::-webkit-slider-thumb {
      z-index: 10;
      -webkit-appearance: none;
      background: #8774e1;
      height: 12px;
      width: 12px;
      border-radius: 50%;
    }
  }

  .bg-box {
    height: 56px;
    margin-top: 10px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    gap: 30px;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      background-color: rgba(171, 171, 171, 0.08);
    }

    span {
      font-size: ${Rem(16)};
      font-family: Roboto, sans-serif;

    }
  }


`
