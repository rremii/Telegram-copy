import React, {FC, useState} from "react"
import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../../../styles/functions/mixins"

interface IInfo {
}

const ArrOfAvatars = [
	"/dog-icon.png",
	"/chat-background.jpg",
]

const Info: FC<IInfo> = () => {

	const [currentAvatar, setCurrentAvatar] = useState(0)

	const NextAvatar = () => {
		if (currentAvatar !== ArrOfAvatars.length - 1) {
			setCurrentAvatar(currentAvatar + 1)
		} else {
			setCurrentAvatar(0)
		}
	}
	const PrevAvatar = () => {
		if (currentAvatar !== 0) {
			setCurrentAvatar(currentAvatar - 1)
		} else {
			setCurrentAvatar(ArrOfAvatars.length - 1)
		}
	}
	return <InfoWrapper>
		<div className="avatar-cont">
			<div className="bio">
				<h1>Artem Romanov</h1>
				<span>online</span>
			</div>
			<div className="avatar-indicator">
				{ArrOfAvatars.map((_, i) => {
					return <span key={i} className={currentAvatar === i ? "current" : ""}/>
				})}
			</div>
			<Image src={ArrOfAvatars[currentAvatar]} layout="fill"/>
			<button onClick={PrevAvatar} className="arrow-left">&lt;</button>
			<button onClick={NextAvatar} className="arrow-right">&gt;</button>
		</div>
		<div className="padding-cont">
			<div className="change-avatar">
				<img src="add-photo-icon.svg" alt="add photo"/>
				<input type="file"/>
			</div>
			<div className="email-cont">
				<div className="icon">
					<Image src="/phone-icon.svg" width={35} height={35}/>
				</div>
				<div className="text-cont">
					<h1 className="email">noruto2021@gmail.com</h1>
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

      &:hover {
        color: white;
      }
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
