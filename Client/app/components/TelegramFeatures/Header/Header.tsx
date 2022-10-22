import React, {FC, useContext} from "react"
import styled from "styled-components"
import Image from "next/image"
import Ripple from "../../../ui/Ripple"
import useRipple from "../../../hooks/useRipple"
import {AdaptiveValue} from "../../../../styles/functions/mixins"
import {GlobalContext} from "../../../hooks/useGlobalContext"
import {useTypedSelector} from "../../../store/ReduxStore"
import {API_URL_STATIC} from "../../../api"
import {getStatusByLastOnline} from "../../../utils/getStatusByLastOnline"

interface IHeader {

}

const Header: FC<IHeader> = () => {


	// const {memberInfo} = useTypedSelector(state => state.Chats.currentChat)
	//
	const {screenMode, SetScreenMode} = useContext(GlobalContext)
	// const {X: XMore, Y: YMore, isRipple: isRippleMore, SetIsRipple: SetIsRippleMore} = useRipple()
	//
	//
	// const HandleMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
	// 	SetIsRippleMore(e)
	// }
	const HandleArrowClick = () => {
		SetScreenMode(screenMode === "sideBar" ? "chat" : "sideBar")
	}
	// const HandleAvatarClick = () => {
	// 	SetScreenMode("info")
	// }


	return <HeaderWrapper screenMode={screenMode}>
		<section className="chat-info">
			<button onClick={HandleArrowClick} className="arrow">
				<Image width={24} height={24} src="/arrow-left-icon.svg"/>
			</button>
			<div>
				<div className="avatar">
					<Image layout="fill"
						   src={"/telegram-features-icon.svg"}/>
				</div>
				<div className="text-content">
					<h1>Telegram tips</h1>
					{/*<h2></h2>*/}
				</div>
			</div>
		</section>
		{/*<section className="chat-utils">*/}
		{/*	<button className="more">*/}
		{/*		<span/>*/}
		{/*		<span/>*/}
		{/*		<span/>*/}
		{/*	</button>*/}
		{/*</section>*/}
	</HeaderWrapper>
}
export default Header
const HeaderWrapper = styled.div<{
	screenMode: "sideBar" | "chat" | "info"
}>`
  background-color: rgb(33, 33, 33);
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  @media screen and (min-width: 1000px) {
    max-width: calc(100vw - 420px);
  }

  .chat-info {
    flex: 1 1 auto;
    display: flex;
    align-items: center;

    & > div {
      display: flex;
      gap: ${AdaptiveValue(18, 5)};
      align-items: center;
      //cursor: pointer;
    }

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
      margin-right: 10px;

      &:hover {
        background-color: rgb(43, 43, 43);
      }

      @media screen and (min-width: 920px) {
        display: none;
      }
      @media screen and (max-width: 919px ) {
        transform: ${({screenMode}) => screenMode !== "sideBar" ? "rotateY(0)" : "rotateY(180deg)"};
      }
    }

    .avatar {
      border-radius: 50%;
      overflow: hidden;
      background-color: white;
      width: 42px;
      height: 42px;
      position: relative;

      img, span {
        border-radius: 50%;
        overflow: hidden;

      }
    }

    .text-content {
      h1 {
        font-size: ${AdaptiveValue(16, 14)};
        font-weight: 600;
        font-family: Roboto, sans-serif;
        color: white;
        margin-bottom: 5px;
      }

      h2 {
        font-size: ${AdaptiveValue(14, 13)};
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
