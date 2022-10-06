import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../../styles/functions/mixins"
import {useTypedSelector} from "../../store/ReduxStore"
import React from "react"
import {API_URL_STATIC} from "../../api"
import {getStatusByLastOnline} from "../../utils/getStatusByLastOnline"

const Info = () => {


	const {email} = useTypedSelector(state => state.Chats.currentChat.memberInfo)
	const {profilePic} = useTypedSelector(state => state.Chats.currentChat.memberInfo)
	const {firstName} = useTypedSelector(state => state.Chats.currentChat.memberInfo)
	const {lastName} = useTypedSelector(state => state.Chats.currentChat.memberInfo)
	const {lastOnline} = useTypedSelector(state => state.Chats.currentChat.memberInfo)


	return <InfoWrapper>
		<div className="avatar">

			<Image layout="fill" src={profilePic ? API_URL_STATIC + profilePic : "/no-avatar.svg"}/>
			<div className="bio">
				<h1>{firstName} {lastName}</h1>
				<span>{getStatusByLastOnline(lastOnline)}</span>
			</div>
		</div>
		<div className="padding-cont">
			<div className="info-box">
				<Image width={35} height={35} src="/email.svg"/>
				<div className="text-cont">
					<h1>{email}</h1>
					<h2>Email</h2>
				</div>
			</div>
		</div>
	</InfoWrapper>

}
export default Info
const InfoWrapper = styled.div`


  .avatar {
    height: 320px;
    width: 100%;
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

    img {

    }
  }

  .padding-cont {
    padding: 10px;

    .info-box {
      cursor: pointer;
      padding: 10px;
      display: flex;
      height: 60px;
      gap: 25px;
      border-radius: 10px;

      &:hover {
        background: rgb(43, 43, 43);
      }

      img {

      }


      .text-cont {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        h1 {
          font-size: ${Rem(17)};
          font-family: Roboto, sans-serif;
          color: white;
        }

        h2 {
          font-size: ${Rem(15)};
          font-family: Roboto, sans-serif;
          color: #AAAAAA;
        }
      }
    }
  }

`
