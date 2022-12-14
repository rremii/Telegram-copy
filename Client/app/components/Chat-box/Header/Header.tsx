import React, {useContext} from "react"
import styled from "styled-components"
import Image from "next/image"
import Ripple from "../../../ui/Ripple"
import useRipple from "../../../hooks/useRipple"
import {AdaptiveValue} from "../../../../styles/functions/mixins"
import {GlobalContext} from "../../../hooks/useGlobalContext"
import {useTypedSelector} from "../../../store/ReduxStore"
import {API_URL_STATIC} from "../../../api/config"
import {getStatusByLastOnline} from "../../../utils/getStatusByLastOnline"
import ChatSettings from "./Chat-settings"
import {SideBarContext} from "../../../hooks/useSideBarContext"

const Header = () => {


	const {memberInfo} = useTypedSelector(state => state.Chats.currentChat)

	const {screenMode, SetScreenMode, SetChatSettings} = useContext(GlobalContext)
	const {isDarkMode} = useContext(SideBarContext)
	const {X: XMore, Y: YMore, isRipple: isRippleMore, SetIsRipple: SetIsRippleMore} = useRipple()


	const HandleMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		SetChatSettings(true)
		SetIsRippleMore(e)
	}
	const HandleArrowClick = () => {
		SetScreenMode(screenMode === "sideBar" ? "chat" : "sideBar")
	}
	const HandleAvatarClick = () => {
		SetScreenMode("info")
	}


	return <HeaderWrapper isDarkMode={isDarkMode} screenMode={screenMode}>
		<ChatSettings/>
		<section className="chat-info">
			<button onClick={HandleArrowClick} className="arrow">
				<Image width={24} height={24} src="/arrow-left-icon.svg"/>
			</button>
			<div onClick={HandleAvatarClick}>
				<div className="avatar">
					<Image width={42} height={42}
						   src={memberInfo.profilePic ? API_URL_STATIC + memberInfo.profilePic : "/no-avatar.svg"}/>
				</div>
				<div className="text-content">
					<h1>{memberInfo.firstName} {memberInfo.lastName ? memberInfo.lastName : ""}</h1>
					<h2>{getStatusByLastOnline(memberInfo.lastOnline)}</h2>
				</div>
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
	screenMode: "sideBar" | "chat" | "info"
	isDarkMode: boolean
}>`
  background-color: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "white"};
  flex: 0 0 60px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
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
      cursor: pointer;
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
        background-color: ${({isDarkMode}) => isDarkMode ? "rgb(43, 43, 43)" : "rgba(178,178,178,0.19)"};
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
        color: ${({isDarkMode}) => isDarkMode ? "white" : "rgb(47,47,47)"};
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
        background-color: ${({isDarkMode}) => isDarkMode ? "rgb(43, 43, 43)" : "rgba(178,178,178,0.19)"};
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
