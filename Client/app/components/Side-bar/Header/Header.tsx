import React, {FC, MouseEventHandler, useEffect, useState} from "react"
import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../../../styles/functions/mixins"
import Burger from "./burger"
import useRipple from "../../../hooks/useRipple"
import Ripple from "../../../ui/Ripple"
import {c} from "msw/lib/glossary-297d38ba"

interface HeaderType {

}


const Header: FC<HeaderType> = () => {

	const [isSearchActive, setIsSearchActive] = useState(false)

	const {clientX, clientY, isRipple, SetIsRipple} = useRipple()

	return <HeaderWrapper isSearch={isSearchActive}>
		{/*<Burger/>*/}
		<button onClick={SetIsRipple} className="burger-icon">
			<span/>
			<span/>
			<span/>
			{isRipple && <Ripple clientX={clientX} clientY={clientY}/>}
		</button>
		<div className="search-cont">
			<input onBlur={() => setIsSearchActive(false)} onFocus={() => setIsSearchActive(true)} placeholder="Search"
				   type="text" autoComplete="false"/>
			<div className="search-icon">
				<img src="/search-icon.svg"/>
				<img src="/search-icon-active.svg"/>
			</div>
		</div>
	</HeaderWrapper>
}
export default Header
const HeaderWrapper = styled.div<{
	isSearch: boolean
}>`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;


  .burger-icon {
    width: 45px;
    height: 45px;
    display: flex;
    position: relative;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
    overflow: hidden;


    &:hover {
      background-color: rgb(43, 43, 43);
    }


    span {
      z-index: 1;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgb(170, 170, 170);
      height: 2px;
      width: 50%;
      border-radius: 2px;
      pointer-events: none;
    }

    span:nth-of-type(1) {
      top: calc(50% - 6px);
      height: 2px;

    }

    span:nth-of-type(3) {
      top: calc(50% + 6px);
      height: 2px;

    }
  }


  .search-cont {
    position: relative;
    flex: 1 1 auto;
    height: 47px;
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 7px;
    background-color: rgb(24, 24, 24);

    .search-icon {
      pointer-events: none;
      position: absolute;
      top: 50%;
      left: 22px;
      transform: translateY(-50%) translateX(-10.5px);
      width: 22px;
      height: 22px;


      img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      img:nth-of-type(2) {
        transition: 0.4s;
        opacity: ${({isSearch}) => isSearch ? 1 : 0};
      }
    }

    input {
      padding: 0 44px;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background-color: transparent;
      font-family: Roboto;
      font-size: ${Rem(18)};
      line-height: 42px;
      color: white;
      font-weight: 500;
      transition: 0.4s;
      border: rgb(47, 47, 47) 1px solid;

      &::placeholder {
        color: rgb(120, 120, 120);
      }

      &:hover {
        border: rgb(112, 117, 121) 1px solid;
        background-color: rgb(29, 29, 29);
      }

      &:focus {
        border: rgb(114, 99, 188) 1px solid;
      }
    }


  }



`
