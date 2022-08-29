import React, {FC} from "react"
import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../../../styles/functions/mixins"
import SearchCell from "./Search-cell"

interface SearchMenuType {
	isSearchOn: boolean
}

const Users = [
	{
		avatar: "/dog-icon.png",
		title: "Artem Romanov",
		subTitle: "noruto2021@gmail.com"
	}
]

const SearchMenu: FC<SearchMenuType> = ({isSearchOn}) => {
	return <SearchMenuWrapper isSearchOn={isSearchOn} className="searchMenu__wrapper">
		<nav>
			<button className="btn-active">
				<span>Chats</span>
			</button>
			<button>
				<span>People</span>
			</button>
		</nav>
		<div className="cell-box">
			{Users.map((userData, index) => {
				return <SearchCell key={index} {...userData} />
			})}
		</div>
	</SearchMenuWrapper>
}
export default SearchMenu
const SearchMenuWrapper = styled.div<{
	isSearchOn: boolean
}>`
  width: 100%;
  height: calc(100% - 60px);
  position: absolute;
  top: 60px;
  left: 0;
  background-color: rgb(33, 33, 33);
  transition: 0.4s;
  transform: ${({isSearchOn}) => isSearchOn ? "scale(1)" : "scale(0.95)"};
  opacity: ${({isSearchOn}) => isSearchOn ? 1 : 0};
  pointer-events: ${({isSearchOn}) => isSearchOn ? "initial" : "none"};
  display: flex;
  flex-direction: column;
  gap: 15px;

  nav {
    width: 100%;
    display: flex;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: calc(100% + 3px);
      left: 50%;
      transform: translateX(-50%);
      width: 110%;
      height: 1px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.46);
    }

    button {
      display: flex;
      align-items: center;
      padding: 16px;
      border-radius: 10px;
      position: relative;


      &:hover {
        background-color: rgba(170, 170, 170, 0.08);
      }

      span {
        font-size: ${Rem(16)};
        font-weight: 600;
        letter-spacing: 0.5px;
        font-family: Roboto;
        color: rgb(170, 170, 170);
      }
    }

    .btn-active {
      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 3px;
        border-radius: 5px;
        background-color: rgb(135, 116, 225);
      }

      &:hover {
        background-color: rgba(135, 116, 225, 0.08);
      }

      span {
        color: rgb(135, 116, 225);
      }
    }
  }

  .cell-box {
    display: flex;
    flex-direction: column;


  }
`
