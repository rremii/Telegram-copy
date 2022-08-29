import React, {Dispatch, FC, SetStateAction} from "react"
import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../../../styles/functions/mixins"

interface BurgerMenuType {
	ref: any
	isBurger: boolean
	setIsBurger: Dispatch<SetStateAction<boolean>>
}


const Burger: FC<BurgerMenuType> = ({isBurger, setIsBurger}) => {
	return <BurgerWrapper isBurger={isBurger}>
		<div className="burger-overlay" onClick={() => setIsBurger(false)}/>

		<div className="row">
			<div className="icon">
				<Image width={21} height={21} src="/bookmark-icon.svg"/>
			</div>
			<div className="setting-text">
				<span>Saved Messages</span>
			</div>
		</div>
		<div className="row">
			<div className="icon">
				<Image width={21} height={21} src="/contact.svg"/>
			</div>
			<div className="setting-text">
				<span>Contacts</span>
			</div>
		</div>
		<div className="row">
			<div className="icon">
				<Image width={21} height={21} src="/setting.svg"/>
			</div>
			<div className="setting-text">
				<span>Settings</span>
			</div>
		</div>
		<div className="row">
			<div className="icon">
				<Image width={21} height={21} src="/night-mode.svg"/>
			</div>
			<div className="setting-text with-toggle">
				<span>Dark mode</span>
				<div className="toggle">toggle</div>
			</div>
		</div>
		<div className="label">
			<span>Telegram Web Copy</span>
		</div>
	</BurgerWrapper>
}
export default Burger
const BurgerWrapper = styled.div<{
	isBurger: boolean
}>`
  position: absolute;
  top: 100%;
  left: 0;
  transition: .3s;
  transform-origin: left top;
  transform: ${({isBurger}) => isBurger ? "scale(1)" : "scale(0)"};
  opacity: ${({isBurger}) => isBurger ? 1 : 0.7};
  z-index: 21;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 10px;
  box-shadow: 5px 0 3px 0 rgba(0, 0, 0, 0.05);
  background: hsla(168, 6%, 16%, 1);

  background: linear-gradient(45deg, hsla(168, 6%, 16%, 1) 0%, hsla(0, 0%, 15%, 1) 54%, hsla(0, 0%, 14%, 1) 100%);

  background: -moz-linear-gradient(45deg, hsla(168, 6%, 16%, 1) 0%, hsla(0, 0%, 15%, 1) 54%, hsla(0, 0%, 14%, 1) 100%);

  background: -webkit-linear-gradient(45deg, hsla(168, 6%, 16%, 1) 0%, hsla(0, 0%, 15%, 1) 54%, hsla(0, 0%, 14%, 1) 100%);

  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#272C2B", endColorstr="#272727", GradientType=1);

  .burger-overlay {
    position: fixed;
    top: -60px;
    left: -100px;
    width: 110vw;
    height: 110vh;
    background-color: transparent;

    z-index: -1;
  }

  .row {
    cursor: pointer;
    display: flex;
    gap: 20px;
    align-items: center;
    padding: 8px 20px;
    border-radius: 12px;

    &:hover {
      background-color: rgba(171, 171, 171, 0.08);
    }

    .icon {

    }

    .setting-text {
      font-weight: 600;
      letter-spacing: 1px;
      font-size: ${Rem(16)};
      font-family: Roboto;
      flex: 1 1 auto;
    }

    .with-toggle {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    font-family: Roboto;
    color: rgba(255, 255, 255, 0.65);
  }
`
