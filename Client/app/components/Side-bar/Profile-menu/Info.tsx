import React, {ChangeEvent, useContext} from "react"
import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../../../styles/functions/mixins"
import {useTypedSelector} from "../../../store/ReduxStore"
import {API_URL_STATIC} from "../../../api/config"
import {useChangeAvatarMutation, useGetMeQuery} from "../../../api/rtk/MeApi"
import {SideBarContext} from "../../../hooks/useSideBarContext"


const Info = () => {


	const {email} = useTypedSelector(state => state.Me.me)
	const {user_id} = useTypedSelector(state => state.Me.me)

	const {data: user} = useGetMeQuery()
	const [changeAvatar] = useChangeAvatarMutation()


	const {isDarkMode} = useContext(SideBarContext)


	const profilePic = user?.profilePic
	const firstName = user?.firstName
	const lastName = user?.lastName

	const ChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files)
			changeAvatar({
				profilePic: e.target.files[0],
				user_id
			})
	}
	const HandleEmailClick = (email: string) => {
		navigator.clipboard.writeText(email)
	}

	return <InfoWrapper isDarkMode={isDarkMode}>
		<div className="avatar-cont">
			<div className="bio">
				<h1>{firstName} {lastName}</h1>
				<span>online</span>
			</div>

			<Image src={profilePic ? API_URL_STATIC + profilePic : "/no-avatar.svg"} layout="fill"/>
		</div>
		<div className="padding-cont">
			<div className="change-avatar">
				<img src={"add-photo-icon.svg"} alt="add photo"/>
				<input onChange={ChangeAvatar} type="file" accept="*.png,*.jpg,*.jpeg"/>
			</div>
			<div onClick={() => HandleEmailClick(email)} className="email-cont">
				<div className="icon">
					<Image src="/email.svg" width={35} height={35}/>
				</div>
				<div className="text-cont">
					<h1 className="email">{email}</h1>
					<h2>Email</h2>
				</div>
			</div>
		</div>
	</InfoWrapper>
}
export default Info
const InfoWrapper = styled.div<{
	isDarkMode: boolean
}>`
  display: flex;
  flex-direction: column;
  background-color: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "rgb(255,255,255)"};

  .avatar-cont {
    flex: 0 0 240px;
    position: relative;

    .bio {
      position: absolute;
      bottom: 5%;
      left: 8%;
      display: flex;
      flex-direction: column;
      z-index: 1;

      h1 {
        color: white;
        font-size: ${Rem(24)};
        font-family: Roboto, sans-serif;
        font-weight: 500;
      }

      span {
        font-size: ${Rem(18)};
        color: rgba(255, 255, 255, 0.61);
      }
    }

    .arrow-left {
      font-size: ${Rem(25)};
      position: absolute;
      height: 100%;
      width: 30%;
      top: 0;
      left: 0;
      z-index: 1;
      color: rgba(255, 255, 255, 0.44);
      transition: .3s;


    }

    .arrow-right {
      font-size: ${Rem(25)};
      position: absolute;
      height: 100%;
      width: 30%;
      top: 0;
      right: 0;
      z-index: 1;
      color: rgba(255, 255, 255, 0.44);
      transition: .3s;

      &:hover {
        color: white;
      }
    }

    .avatar-indicator {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      height: 3px;
      width: 95%;
      transition: .3s;
      z-index: 1;

      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;

      span {
        height: 100%;
        flex: 1 1 auto;
        background-color: rgb(180, 180, 180);
        border-radius: 3px;
      }

      .current {
        background-color: rgb(230, 230, 230);
      }


    }
  }

  .padding-cont {
    position: relative;
    padding: 10px;


    .change-avatar {
      position: absolute;
      left: 80%;
      bottom: 100%;
      transform: translateY(50%);
      width: 54px;
      height: 54px;
      border-radius: 50%;
      background-color: rgb(135, 116, 225);
      cursor: pointer;
      overflow: hidden;
      z-index: 1;

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60%;
      }

      input {
        cursor: pointer;
        opacity: 0;
        transform: translateY(-30px);
        width: 54px;
        height: 84px;
        background-color: black;
      }
    }

    .email-cont {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      gap: 25px;
      border-radius: 10px;
      cursor: pointer;

      &:hover {
        background-color: ${({isDarkMode}) => isDarkMode ? "rgb(43, 43, 43)" : "rgb(226,226,226)"};

      }

      .icon {

      }

      .text-cont {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        gap: 7px;

        .email {
          font-size: ${Rem(17)};
          font-family: Roboto, sans-serif;
          font-weight: 400;
          color: ${({isDarkMode}) => isDarkMode ? "white" : "black"};


        }

        h2 {
          letter-spacing: .5px;
          color: rgb(170, 170, 170);
          font-size: ${Rem(15)};
          font-family: Roboto, sans-serif;
          font-weight: 400;
        }
      }
    }

  }
`
