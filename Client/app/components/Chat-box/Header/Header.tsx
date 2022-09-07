import React, {FC, useContext} from "react"
import styled from "styled-components"
import Image from "next/image"
import Ripple from "../../../ui/Ripple"
import useRipple from "../../../hooks/useRipple"
import {Rem} from "../../../../styles/functions/mixins"
import {GlobalContext} from "../../../hooks/useGlobalContext"

interface IHeader {

}

const Header: FC<IHeader> = () => {

	const {screenMode, SetScreenMode} = useContext(GlobalContext)
	const {X: XMore, Y: YMore, isRipple: isRippleMore, SetIsRipple: SetIsRippleMore} = useRipple()


	const HandleMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		SetIsRippleMore(e)
	}
	const HandleArrowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		SetScreenMode(screenMode === "sideBar" ? "chat" : "sideBar")
	}

	return <HeaderWrapper screenMode={screenMode}>
		<section className="chat-info">
			<button onClick={HandleArrowClick} className="arrow">
				<Image width={24} height={24} src="/arrow-left-icon.svg"/>
			</button>
			<div className="avatar">
				<Image width={42} height={42} src="/dog-icon.png"/>
			</div>
			<div className="text-content">
				<h1>Artem Romanov</h1>
				<h2>last seen 19 min ago</h2>
			</div>
		</section>
		<section className="chat-utils">
			<button onClick={HandleMoreClick} className="more">
				<span/>
				<span/>
				<span/>
				{isRippleMore && <Ripple X={XMore} Y={YMore}/>}
			</button>
		</section>
	</HeaderWrapper>
}
export default Header
const HeaderWrapper = styled.div<{
	screenMode: "sideBar" | "chat"
}>`
  background-color: rgb(33, 33, 33);
  flex: 0 0 60px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;

  .chat-info {
    flex: 1 1 auto;
    display: flex;
    gap: 18px;
    align-items: center;

    .arrow {
      width: 45px;
      height: 45px;
      padding: 0 10px;
      position: relative;
      overflow: hidden;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1;
      transition: .3s background-color;

      &:hover {
        background-color: rgb(43, 43, 43);
      }

      @media screen and (min-width: 920px) {
        display: none;
      }
      @media screen and (max-width: 919px ) {
        transform: ${({screenMode}) => screenMode === "chat" ? "rotateY(0)" : "rotateY(180deg)"};
      }
    }

    .avatar {
      border-radius: 50%;
      overflow: hidden;

      img, span {
        border-radius: 50%;
        overflow: hidden;

      }
    }

    .text-content {
      h1 {
        font-size: ${Rem(16)};
        font-weight: 600;
        font-family: Roboto, sans-serif;
        color: white;
        margin-bottom: 5px;
      }

      h2 {
        font-size: ${Rem(14)};
        font-family: Roboto, sans-serif;
        color: #AAAAAA;
      }
    }
  }

  .chat-utils {
    .more {
      position: relative;
      border-radius: 50%;
      cursor: pointer;
      overflow: hidden;
      transition: 0.3s;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 45px;
      height: 45px;
      justify-content: center;
      gap: 3px;

      &:hover {
        background-color: rgb(43, 43, 43);
      }

      span {
        position: relative;
        z-index: 1;
        width: 5px;
        height: 5px;
        pointer-events: none;
        border-radius: 50%;
        background-color: rgb(170, 170, 170);
      }
    }
  }

`
