import styled from "styled-components"
import {Rem} from "../../../styles/functions/mixins"
import {useContext} from "react"
import {GlobalContext} from "../../hooks/useGlobalContext"

const Header = () => {
	const {SetScreenMode} = useContext(GlobalContext)


	return <HeaderWrapper>
		<div onClick={() => SetScreenMode("chat")}
			 className="cross">
			<span/>
			<span/>
		</div>
		<h2>Profile</h2>
	</HeaderWrapper>
}
export default Header
const HeaderWrapper = styled.div`
  flex: 0 0 60px;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 16px;

  .cross {
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    transition: .3s;
    cursor: pointer;

    &:hover {
      background: rgb(47, 47, 47);
    }

    span {
      position: absolute;
      width: 23px;
      border-radius: 4px;
      height: 3px;
      background-color: rgb(170, 170, 170);
      left: 50%;
      top: 50%;
    }

    span:nth-of-type(1) {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    span:nth-of-type(2) {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  h2 {
    font-family: Roboto, sans-serif;
    font-size: ${Rem(20)};
    font-weight: 600;
    letter-spacing: 1px;
    padding-left: 20px;
  }

`
