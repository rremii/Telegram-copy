import styled from "styled-components"
import Image from "next/image"
import {useContext} from "react"
import {GlobalContext} from "../../../hooks/useGlobalContext"
import {AdaptiveValue} from "../../../../styles/functions/mixins"

const backgrounds = ["forest.png",
	"misty-forest.png",

]

const GridBox = () => {


	const {background, SetBackground} = useContext(GlobalContext)


	const ChangeBackground = (src: string) => {
		SetBackground(src)
		localStorage.setItem("background", src)
	}


	const currentBackground = background ? background : localStorage.getItem("background") || "forest.png"

	return <GridBoxWrapper>
		{backgrounds.map((src, i) => (
			<div key={i} onClick={() => ChangeBackground(src)}
				 className={`cell ${currentBackground === src ? "active" : ""}`}>
				<Image layout="fill" src={"/backgrounds/" + src}/>
			</div>
		))}

	</GridBoxWrapper>
}
export default GridBox
const GridBoxWrapper = styled.div`
  background-color: rgb(33, 33, 33);
  padding: 8px 6px 20px;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(auto-fit, min-content);
  justify-items: center;
  gap: 5px;
  height: calc(100vh - 59px);
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(213, 213, 213, 0.25);
    border-radius: 5px;

  }


  .cell {
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 129px;
    @media screen and (max-width: 600px) {
      height: ${AdaptiveValue(400, 100)};
    }
  }

  .active {
    border: 2px solid rgb(135, 116, 225);
  }

`
