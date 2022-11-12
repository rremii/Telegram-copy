import React, {ChangeEvent, FC} from "react"
import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../../../styles/functions/mixins"
import {useAppDispatch, useTypedSelector} from "../../../store/ReduxStore"
import {API_URL_STATIC} from "../../../api"
import {changeAvatar} from "../../../store/MeSlice"
import {useGetMeQuery} from "../../../api/ChatApiRtk"

interface IInfo {
}


const Info: FC<IInfo> = () => {

	const dispatch = useAppDispatch()


	// const {profilePic} = useTypedSelector(state => state.Me.me)
	// const {lastName} = useTypedSelector(state => state.Me.me)
	// const {firstName} = useTypedSelector(state => state.Me.me)
	const {email} = useTypedSelector(state => state.Me.me)
	const {user_id} = useTypedSelector(state => state.Me.me)

//TODO fix rtk query and make everything on it
	const {data: user} = useGetMeQuery()

	const profilePic = user?.profilePic
	const firstName = user?.firstName
	const lastName = user?.lastName

	const ChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files)
			dispatch(changeAvatar({
				profilePic: e.target.files[0],
				user_id
			}))
	}


	return <InfoWrapper>
		<div className="avatar-cont">
			<div className="bio">
				<h1>{firstName} {lastName}</h1>
				<span>online</span>
			</div>
			{/*<div className="avatar-indicator">*/}
			{/*	{ArrOfAvatars.map((_, i) => {*/}
			{/*		return <span key={i} className={currentAvatar === i ? "current" : ""}/>*/}
			{/*	})}*/}
			{/*</div>*/}
			<Image src={profilePic ? API_URL_STATIC + profilePic : "/no-avatar.svg"} layout="fill"/>
			{/*<button onClick={PrevAvatar} className="arrow-left">*/}
			{/*	<Image width={25} height={50} src="/prev.svg"/>*/}
			{/*</button>*/}
			{/*<button onClick={NextAvatar} className="arrow-right">*/}
			{/*	<Image width={25} height={50} src="/next.svg"/>*/}
			{/*</button>*/}
		</div>
		<div className="padding-cont">
			<div className="change-avatar">
				<img src={"add-photo-icon.svg"} alt="add photo"/>
				<input onChange={ChangeAvatar} type="file" accept="*.png,*.jpg,*.jpeg"/>
			</div>
			<div className="email-cont">
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
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(33, 33, 33);

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
        background-color: rgb(43, 43, 43);
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
