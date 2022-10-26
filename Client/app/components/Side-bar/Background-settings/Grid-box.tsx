import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../../../styles/functions/mixins"
import {ChangeEvent, useContext} from "react"
import {GlobalContext} from "../../../hooks/useGlobalContext"


const GridBox = () => {


	const {messageFontSize, SetMessageFontSize} = useContext(GlobalContext)

	return <GridBoxWrapper>


	</GridBoxWrapper>
}
export default GridBox
const GridBoxWrapper = styled.div<{}>`
  background-color: rgb(33, 33, 33);
  padding: 8px 6px 20px;



`
