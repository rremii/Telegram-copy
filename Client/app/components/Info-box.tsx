import React, {FC} from "react"
import styled from "styled-components"
import {AdaptiveValue} from "../../styles/functions/mixins"

interface InfoBoxType {
	isOpen: boolean
}

const InfoBox: FC<InfoBoxType> = ({isOpen}) => {
	return <InfoBoxWrapper isOpen={isOpen}>
		INFO BOX
	</InfoBoxWrapper>
}
export default InfoBox
const InfoBoxWrapper = styled.div<{ isOpen: boolean }>`
  height: 100%;
  padding: 0;
  background-color: rgb(33, 33, 33);
  flex: 0 0 ${AdaptiveValue(420, 50)};
  background-color: #0070f3;

  @media screen and (max-width: 1250px) {
    transition: 0.7s;
    position: absolute;
    flex-basis: initial;
    width: 420px;
    top: 0;
    left: 100%;
    transform: ${({isOpen}) => isOpen ? "translateX(-100%)" : "translateX(0)"};
  }

`
