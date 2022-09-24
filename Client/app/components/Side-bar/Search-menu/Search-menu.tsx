import React, {useContext, useEffect, useState} from "react"
import styled from "styled-components"
import {Rem} from "../../../../styles/functions/mixins"
import SearchCell from "./Search-cell"
import {SideBarContext} from "../../../hooks/useSideBarContext"
import {useAppDispatch, useTypedSelector} from "../../../store/ReduxStore"
import {fetchUsers} from "../../../store/SearchSlice"


// const Users = [
// 	{
// 		avatar: "/dog-icon.png",
// 		title: "Artem Romanov",
// 		subTitle: "noruto2021@gmail.com"
// 	}
// ]

type  searchingFilter = "people" | "groups"

const SearchMenu = () => {

	const {isSearchOn} = useContext(SideBarContext)


	const [searchFilter, setSearchFilter] = useState<searchingFilter>("people")

	const {users} = useTypedSelector(state => state.Search)
	const {groups} = useTypedSelector(state => state.Search)


	return <SearchMenuWrapper searchingFilter={searchFilter} isSearchOn={isSearchOn} className="searchMenu__wrapper">
		<nav>
			<button onClick={() => setSearchFilter("people")} className={searchFilter === "people" ? "btn-active" : ""}>
				<span>People</span>
			</button>
			<button onClick={() => setSearchFilter("groups")} className={searchFilter === "groups" ? "btn-active" : ""}>
				<span>Groups</span>
			</button>
		</nav>
		<div className="cell-box">
			{searchFilter === "people" && users.map((userInfo, index) => {
				return <SearchCell key={index} {...userInfo}/>
			})}
			{searchFilter === "groups" && groups.map((_, index) => {
				return <div key={index}/>
			})}
		</div>
	</SearchMenuWrapper>
}
export default SearchMenu
const SearchMenuWrapper = styled.div<{
	isSearchOn: boolean
	searchingFilter: searchingFilter
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

    &::before {
      content: '';
      position: absolute;
      top: 100%;
      left: 0;
      transition: transform .4s;
      transform: ${({searchingFilter}) => searchingFilter === "people" ? "translateX(16px)" : "translateX(102px)"};
      width: 51px;
      height: 3px;
      border-radius: 5px;
      background-color: rgb(135, 116, 225);
    }

    button {
      display: flex;
      align-items: center;
      padding: 16px;
      border-radius: 10px;
      position: relative;
      transition: .4s;

      &:hover {
        background-color: rgba(170, 170, 170, 0.08);
      }

      span {
        font-size: ${Rem(16)};
        font-weight: 600;
        letter-spacing: 0.5px;
        font-family: Roboto, sans-serif;
        color: rgb(170, 170, 170);
      }
    }

    .btn-active {

      //&::after {
      //  content: '';
      //  position: absolute;
      //  top: 100%;
      //  left: 50%;
      //  transform: translateX(-50%);
      //  width: 60%;
      //  height: 3px;
      //  border-radius: 5px;
      //  background-color: rgb(135, 116, 225);
      //}

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
