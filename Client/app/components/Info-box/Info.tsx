import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../../styles/functions/mixins"

const Info = () => {


	return <InfoWrapper>
		<div className="avatar">
			<Image layout="fill" src="/dog-icon.png"/>
		</div>
		<div className="padding-cont">
			<div className="info-box">
				<Image width={35} height={35} src="/email.svg"/>
				<div className="text-cont">
					<h1>noruto2021@gmail.com</h1>
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
