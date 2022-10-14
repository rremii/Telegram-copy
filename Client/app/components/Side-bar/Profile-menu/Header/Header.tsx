import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../../../../styles/functions/mixins"
import Ripple from "../../../../ui/Ripple"
import React, {useContext} from "react"
import useRipple from "../../../../hooks/useRipple"
import {SideBarContext} from "../../../../hooks/useSideBarContext"
import Logout from "./Logout"

const Header = () => {

	const {isProfile, SetIsProfile, SetLogout, isLogout} = useContext(SideBarContext)


	const {X: XEdit, Y: YEdit, isRipple: isRippleEdit, SetIsRipple: SetIsRippleEdit} = useRipple()
	const {X: XMore, Y: YMore, isRipple: isRippleMore, SetIsRipple: SetIsRippleMore} = useRipple()

	const HandleArrowClick = () => {
		SetIsProfile(!isProfile)
	}
	const HandleMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		SetLogout(!isLogout)
		SetIsRippleMore(e)
	}


	return <HeaderWrapper>
		<section>
			<button onClick={HandleArrowClick} className="arrow">
				<Image width={24} height={24} src="/arrow-left-icon.svg"/>
			</button>
			<h1>Settings</h1>
		</section>
		<section>
			<button onClick={SetIsRippleEdit} className="edit">
				<Image width={22} height={22} src="/pencil-icon.svg"/>
				{isRippleEdit && <Ripple X={XEdit} Y={YEdit}/>}
			</button>
			<button onClick={HandleMoreClick} className="more">
				<span/>
				<span/>
				<span/>
				{isRippleMore && <Ripple X={XMore} Y={YMore}/>}
			</button>
		</section>
		<Logout/>
	</HeaderWrapper>
}
export default Header
const HeaderWrapper = styled.div`
  width: 100%;
  height: 60px;
  background-color: rgb(33, 33, 33);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  position: relative;


  section {
    display: flex;
    align-items: center;
    gap: 25px;

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

      &:hover {
        background-color: rgb(43, 43, 43);
      }
    }

    h1 {
      font-size: ${Rem(21)};
      letter-spacing: 1px;
      font-family: Roboto, sans-serif;
      font-weight: 600;
    }

    .edit {
      position: relative;
      cursor: pointer;
      overflow: hidden;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      transition: 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: rgb(43, 43, 43);
      }

      * {
        pointer-events: none;
      }

      img {
        position: relative;
        z-index: 1;
      }
    }

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
