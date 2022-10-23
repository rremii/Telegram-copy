import styled from "styled-components"
import {Dispatch, FC, SetStateAction, useEffect, useState} from "react"
import Image from "next/image"
import {AdaptiveValue, Rem} from "../../../../styles/functions/mixins"

interface IChatMessageSettings {
	X: number,
	Y: number,
	setId: Dispatch<SetStateAction<number | null>>
	chosenId: number | null
}

const ChatMessageSettings: FC<IChatMessageSettings> = ({X, Y, chosenId, setId}) => {

	// const [currentX, setX] = useState(X)
	// const [currentY, setY] = useState(Y)


	useEffect(() => {

		// const windowRec = window.cli
		// if (X + 150 >= window.innerWidth) {
		// 	setX(X - 180)
		// } else {
		// 	setX(X)
		// }


	}, [chosenId])

	const HandleMouseLeave = () => {
		setId(null)
	}

	return <MessageSettings chosenId={chosenId} X={X} Y={Y} onMouseLeave={HandleMouseLeave}>
		<div className="content-cont">

			<div className="option">
				<Image width={20} height={20} src="/pencil-icon.svg"/> <span>Edit</span>
			</div>
			<div className="option">
				<Image width={20} height={20} src="/copy-icon.svg"/> <span>Copy</span>
			</div>
			<div className="option">
				<Image width={20} height={20} src="/trash-bin.svg"/> <span>Delete</span>
			</div>
		</div>
	</MessageSettings>
}
export default ChatMessageSettings
const MessageSettings = styled.div<{
	X: number
	Y: number
	chosenId: number | null
}>`
  position: fixed;
  top: ${({Y}) => Y}px !important;
  left: ${({X}) => X}px !important;
  transform: ${({chosenId}) => chosenId ? "translate(-15px, -15px) scale(1)" : "translate(0, 0) scale(0.7)"};
  pointer-events: ${({chosenId}) => chosenId ? "initial" : "none"};
  transition: 0.3s transform;
  //right: 0;
  z-index: 10;
  //gap: 5px;
  width: 210px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  //.overlay{
  //position: absolute;
  //background-color: green;
  //width: 300px;
  //}
  .content-cont {
    opacity: ${({chosenId}) => chosenId ? 1 : 0};
    width: ${AdaptiveValue(180, 150)};
    //height: 230px;
    background-color: rgba(33, 33, 33, 0.5);
    border-radius: 10px;
    padding: 5px;
    transition: .3s;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(50px);
    display: flex;
    flex-direction: column;

    .option:last-of-type {
      span {
        color: #df3f40;
      }
    }

    .option {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 5px 12px;
      border-radius: 5px;

      &:hover {
        background-color: rgba(171, 171, 171, 0.08);
      }

      span {
        font-family: Roboto, sans-serif;
        font-size: ${Rem(14)};
        font-weight: 500;
      }
    }
  }


`
