import React, {FC} from "react"
import styled from "styled-components"
import Header from "../Header/Header"

interface SearchMenuType {
	isSearchOn: boolean
}

const SearchMenu: FC<SearchMenuType> = ({isSearchOn}) => {
	return <SearchMenuWrapper isSearchOn={isSearchOn} className="searchMenu__wrapper">
		search menu
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
`
