import React, {FC} from "react"
import styled from "styled-components"
import Header from "../Header/Header"

interface SearchMenuType {

}

const SearchMenu: FC<SearchMenuType> = () => {
	return <SearchMenuWrapper className="searchMenu__wrapper">
		<Header/>

		search menu
	</SearchMenuWrapper>
}
export default SearchMenu
const SearchMenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(33, 33, 33);

`
