import React, {useContext, useEffect, useState} from "react"
import styled from "styled-components"
import {AdaptiveValue, Rem} from "../../../../styles/functions/mixins"
import useRipple from "../../../hooks/useRipple"
import Ripple from "../../../ui/Ripple"
import Burger from "./burger"
import {SideBarContext} from "../../../hooks/useSideBarContext"
import {useAppDispatch, useTypedSelector} from "../../../store/ReduxStore"
import useDebounce from "../../../hooks/useDebounce"
import {useGetUsersQuery} from "../../../api/rtk/SearchApi"
import {setSearchedUsers} from "../../../store/SearchSlice"
import {GlobalContext} from "../../../hooks/useGlobalContext"


const Header = () => {
	const dispatch = useAppDispatch()

	const {user_id} = useTypedSelector(state => state.Me.me)

	const {
		isBurger,
		SetIsBurger,
		SetIsSearch,
		isSearchOn,
		isSearchLayout,
		SetIsSearchLayout,
		isDarkMode
	} = useContext(SideBarContext)

	const {X, Y, isRipple, SetIsRipple} = useRipple()
	const [searchString, setSearchString] = useState<string>("")
	const debouncedSearchString = useDebounce<string>(searchString, 300)

	const {data: searchedUsers} = useGetUsersQuery(debouncedSearchString, {
		refetchOnMountOrArgChange: true
	})

	useEffect(() => {
		if (searchedUsers)
			dispatch(setSearchedUsers({users: searchedUsers, user_id}))
	}, [searchedUsers])


	const HandleSearchFocus = () => {
		SetIsSearchLayout(true)
		SetIsSearch(true)
	}
	const HandleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchString(e.currentTarget.value)
	}

	const HandleBurgerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!isSearchOn) {
			SetIsRipple(e)
			SetIsBurger(!isBurger)
		}
		SetIsSearch(false)
	}

	return <HeaderWrapper isDarkMode={isDarkMode} isSearchOn={isSearchOn} isSearchLayout={isSearchLayout}>
		<div className="burger">
			<Burger/>
		</div>
		<button onClick={HandleBurgerClick} className="burger-icon">
			<img className="arrow" src="/arrow-left-icon.svg"/>
			<span/>
			<span/>
			<span/>
			{isRipple && <Ripple X={X} Y={Y}/>}
		</button>
		<div className="search-cont">
			<input value={searchString} onChange={HandleSearchChange} onBlur={() => SetIsSearchLayout(false)}
				   onFocus={HandleSearchFocus} placeholder="Search"
				   type="text" autoComplete="false"/>
			<div className="search-icon">
				<img src="/search-icon.svg"/>
				<img src="/search-icon-active.svg"/>
			</div>
		</div>
	</HeaderWrapper>
}
export default React.memo(Header)
const HeaderWrapper = styled.div<{
	isSearchLayout: boolean
	isSearchOn: boolean
	isDarkMode: boolean
}>`

  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;


  .burger-icon {
    width: ${AdaptiveValue(45, 35)};
    height: ${AdaptiveValue(45, 35)};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    transition: 0.5s transform;
    transform: ${({isSearchOn}) => isSearchOn ? "rotate(-180deg)" : ""};

    &:hover {
      background-color: ${({isDarkMode}) => isDarkMode ? "rgb(43, 43, 43)" : "rgba(81,81,81,0.11)"};

    }

    .arrow {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 27px;
      height: 27px;
      transform: translate(-50%, -50%) rotate(180deg);
      z-index: 10;
      opacity: ${({isSearchOn}) => isSearchOn ? 1 : 0};
    }

    span {
      z-index: 1;
      position: absolute;
      top: 50%;
      left: 50%;
      opacity: ${({isSearchOn}) => isSearchOn ? 0 : 1};
      transition: 0.5s;
      transform: rotate(0deg) translate(-50%, -50%);
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
    height: 43px;
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 7px;
    color: ${({isDarkMode}) => isDarkMode ? "rgb(24, 24, 24)" : "transparent"};

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
        opacity: ${({isSearchLayout}) => isSearchLayout ? 1 : 0};
      }
    }

    input {
      padding: 0 44px;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background-color: transparent;
      font-family: Roboto, sans-serif;
      font-size: ${Rem(18)};
      line-height: 42px;
      color: ${({isDarkMode}) => isDarkMode ? "white" : "black"};
      font-weight: 500;
      transition: 0.4s;
      border: rgb(47, 47, 47) 1px solid;

      &::placeholder {
        color: rgb(120, 120, 120);
      }

      &:hover {
        border: rgb(112, 117, 121) 1px solid;

        background-color: ${({isDarkMode}) => isDarkMode ? "rgb(29, 29, 29)" : "rgba(29,29,29,0.1)"};

      }

      &:focus {
        border: rgb(114, 99, 188) 1px solid;
      }
    }


  }



`
