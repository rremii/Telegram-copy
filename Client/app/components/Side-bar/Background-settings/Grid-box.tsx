import styled from "styled-components"
import Image from "next/image"
import React, {useContext} from "react"
import {GlobalContext} from "../../../hooks/useGlobalContext"
import {AdaptiveValue, Rem} from "../../../../styles/functions/mixins"
import useRipple from "../../../hooks/useRipple"
import Ripple from "../../../ui/Ripple"

const backgrounds = ["forest.png",
	"misty-forest.png",
	"misty-forest.png",
	"misty-forest.png",
	"misty-forest.png",
	"misty-forest.png",
	"misty-forest.png",
	"misty-forest.png",
	"misty-forest.png",
	"misty-forest.png",
	"misty-forest.png",
	"misty-forest.png",

]

const GridBox = () => {


	const {background, SetBackground, isBackgroundBlur, SetBackgroundBlur} = useContext(GlobalContext)


	const ChangeBackground = (src: string) => {
		SetBackground(src)
	}
	const ChangeBackgroundBlur = () => {
		SetBackgroundBlur(isBackgroundBlur !== "true" ? "true" : "false")
	}

	return <GridBoxWrapper isBlur={isBackgroundBlur === "true"}>
		<div className="utils">

			<div onClick={ChangeBackgroundBlur} className="blur-setting">
				<div className="check-box">
					<input checked={isBackgroundBlur === "true"} type="checkbox"/>
					<span/>
				</div>
				<h2>Blur Wallpaper Image</h2>
			</div>
		</div>
		<div className="grid">

			{backgrounds.map((src, i) => (
				<div key={i} onClick={() => ChangeBackground(src)}
					 className={`cell ${background === src ? "active" : ""}`}>
					<Image layout="fill" src={"/backgrounds/" + src}/>
				</div>
			))}

		</div>
	</GridBoxWrapper>
}
export default GridBox
const GridBoxWrapper = styled.div<{
	isBlur: boolean | null
}>`
  background-color: rgb(24, 24, 24);
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
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

  .utils {
    background-color: rgb(34, 34, 34);
    padding: 8px;

    .blur-setting {
      border-radius: 10px;
      display: flex;
      padding: 20px 25px;
      transition: 0.3s;
      gap: 25px;
      cursor: pointer;

      &:hover {
        background-color: rgb(43, 43, 43);
      }

      .check-box {
        position: relative;

        input {
          position: relative;
          width: 18px;
          height: 18px;
          border-radius: 3px;
          border: rgb(83, 83, 82) 2px solid;
          background-color: transparent;
          appearance: none;
          z-index: 1;
        }

        span {
          position: absolute;
          width: 18px;
          height: 18px;
          left: 0;

          &::after {
            width: 15px;
            height: 15px;
            top: 0;
            left: 3px;
            position: absolute;
            content: "";
            background-color: transparent;
            -webkit-clip-path: polygon(30% 89%,
            90% 24%,
            95% 31%,
            30% 100%,
            0 73%,
            0 62%);
            clip-path: polygon(30% 89%,
            90% 24%,
            95% 31%,
            30% 100%,
            0 73%,
            0 62%);
          }
        }

        input:checked + span {
          background-color: rgb(135, 116, 225);
          border-radius: 4px;

          &::after {
            background-color: white;
          }
        }
      }

      h2 {
        font-size: ${Rem(16)};
        font-family: Roboto, sans-serif;
      }
    }
  }

  .grid {
    background-color: rgb(34, 34, 34);
    padding: 5px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    gap: 5px;

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
  }

`
