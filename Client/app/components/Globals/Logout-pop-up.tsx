import React, {FC, useContext} from "react"
import styled from "styled-components"
import {Rem} from "../../../styles/functions/mixins"
import {SideBarContext} from "../../hooks/useSideBarContext"
import {fetchLogout} from "../../store/AuthSlice"
import {useAppDispatch} from "../../store/ReduxStore"

interface ILogoutPopUp {

}

const LogoutPopUp: FC<ILogoutPopUp> = () => {
	const dispatch = useAppDispatch()

	const {
		isLogoutPopUp,
		SetLogoutPopUp
	} = useContext(SideBarContext)


	const Logout = () => {
		dispatch(fetchLogout())
		SetLogoutPopUp(false)
	}

	return <LogoutPopUpWrapper isActive={isLogoutPopUp}>
		<div className="pop-up-cont">
			<h1>Log out</h1>
			<span>Are you sure you want to log out?</span>
			<span>Note that you can seamlessly use Telegram on all your devices at once.</span>
			<div className="btn-cont">
				<button onClick={() => SetLogoutPopUp(false)} className="cancel">CANCEL</button>
				<button onClick={Logout} className="logout">LOGOUT</button>
			</div>
		</div>
	</LogoutPopUpWrapper>
}
export default LogoutPopUp
export const LogoutPopUpWrapper = styled.div<{
	isActive: boolean
}>`
  color: white;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .3s;
  opacity: ${({isActive}) => isActive ? 1 : 0};
  pointer-events: ${({isActive}) => isActive ? "initial" : "none"};

  .pop-up-cont {
    border-radius: 10px;
    width: 270px;
    height: 240px;
    //padding: 12px 8px;
    box-shadow: 0 2px 2px 0, rgba(0, 0, 0, 0.14);
    background-color: rgb(33, 33, 33);
    padding: 16px 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    //TODO check that all transition are applied to specific properties 
    transition: .3s;
    transform: ${({isActive}) => isActive ?
            "translateY(0) scale(1)" : " scale(0.8)translateY(100px)"};

    h1 {
      font-family: Roboto, sans-serif;
      font-size: ${Rem(21)};
      font-weight: 500;
    }

    span {
      margin-top: 10px;
      font-family: Roboto, sans-serif;
      font-size: ${Rem(17)};
      font-weight: 500;
    }


    .btn-cont {
      margin-top: 15px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      button {
        width: 90px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${Rem(17)};
        font-family: Roboto, sans-serif;
        border-radius: 10px;
      }

      .cancel {
        color: rgb(135, 116, 225);

        &:hover {
          background-color: rgba(135, 116, 225, 0.1);
        }
      }

      .logout {
        &:hover {
          background-color: rgba(255, 89, 90, 0.1);
        }

        color: rgb(255, 89, 90);
      }
    }
  }
`
