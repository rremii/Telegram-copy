import styled from "styled-components"
import Header from "./Header"
import GridBox from "./Grid-box"
import {useContext} from "react"
import {SideBarContext} from "../../../hooks/useSideBarContext"

const BackgroundSettings = () => {

	const {isBackgroundSettings, SetBackgroundSettings} = useContext(SideBarContext)


	return <BackgroundSettingsWrapper isBackground={isBackgroundSettings}>
		<div className="BackgroundSettings-cont">
			<Header/>
			<GridBox/>
		</div>
	</BackgroundSettingsWrapper>
}
export default BackgroundSettings
const BackgroundSettingsWrapper = styled.div<{
	isBackground: boolean
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

  .BackgroundSettings-cont {
    transition: .4s;
    pointer-events: initial;
    position: absolute;
    left: 100%;
    top: 0;
    transform: ${({isBackground}) => isBackground ? "translateX(-100%)" : "translateX(0)"};
    width: 100%;
    height: 100%;
    background-color: rgb(22, 22, 22);
    gap: 1px;
    display: flex;
    flex-direction: column;

  }






`
