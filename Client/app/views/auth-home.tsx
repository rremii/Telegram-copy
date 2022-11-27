import React from "react"
import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../styles/functions/mixins"
import {useRouter} from "next/router"
import Link from "next/link"


const AuthHome = () => {
	const router = useRouter()

	return <AuthHomeWrapper className="authHome__wrapper">
		<div className="authHome__container">
			<div className="logo-cont">
				<Image className="logo" src="/telegram-icon.svg" width={150} height={150}/>
			</div>
			<div className="btn-cont">
				<button onClick={async () => await router.push("./auth/login/email")}>log in</button>
			</div>
			<div className="link">
				<Link href="./auth/signup/bio">Dont got an account yet?</Link>
			</div>

		</div>
	</AuthHomeWrapper>
}
export default AuthHome
const AuthHomeWrapper = styled.div`
  background-color: rgb(33, 33, 33);
  display: flex;
  align-items: center;
  justify-content: center;

  .authHome__container {
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo-cont {
      position: relative;
      width: 150px;
      height: 150px;

      &::after {
        content: '';
        position: absolute;
        width: 140px;
        height: 140px;
        background-color: white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
      }

      .logo {
        position: relative;
        z-index: 1;

      }
    }

    .btn-cont {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 50px;

      button {
        font-family: Roboto, sans-serif;
        font-size: ${Rem(18)};
        width: 250px;
        height: 40px;
        color: white;
        background-color: rgb(42, 158, 214);
        position: relative;
        overflow: hidden;

        &::after {
          position: absolute;
          content: '';
          top: -10%;
          left: -40px;
          background-color: rgba(255, 255, 255, 0.25);
          box-shadow: 0 0 15px 10px rgba(255, 255, 255, 0.25);
          height: 120%;
          width: 30px;
          transform: rotate(30deg);
          animation: shift 1.5s infinite ease-in-out;
        }

        @keyframes shift {
          0% {
            left: -50px;
          }
          100% {
            left: calc(100% + 35px);
          }
        }
      }
    }

    .link {
      color: white;
      font-family: Roboto, sans-serif;
      font-size: ${Rem(16)};
      margin-top: 10px;
    }
  }
`
