import React, {FC} from "react"
import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../../../styles/functions/mixins"
import {cutStringToLength} from "../../../utils/cutStringToLength"

interface IChatList {
	avatar: string
	title: string
	subTitle: string
}


const ChatCell: FC<IChatList> = ({subTitle, title, avatar}) => {

	return <ChatCellWrapper className="cell">
		<div className="avatar">
			<Image width={54} height={54} src={avatar}/>
		</div>
		<div className="text-box">
			<div className="title-cont">
				<h1>{cutStringToLength(title, 17)}</h1>
				<div className="message-info-cont">
					<div className="is-checked">
						<Image width={23} height={23} src="/double-check.svg"/>
					</div>
					<span className="date">
							12:06
						</span>
				</div>
			</div>
			<div className="sub-title-cont">
				<h2>{cutStringToLength(subTitle, 25)}</h2>
				<span className="unseen-messages">21</span>
			</div>
		</div>

	</ChatCellWrapper>
}
export default ChatCell
const ChatCellWrapper = styled.div`


  border-radius: 10px;
  width: 100%;
  //background-color: rgb(135, 116, 225);

  flex: 0 0 72px;
  padding: 9px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 9px;
  cursor: pointer;

  &:hover {
    background-color: rgba(64, 64, 64, 0.3);

  }

  .avatar {
    border-radius: 50%;


    img, span {
      border-radius: inherit;
    }
  }

  .text-box {
    flex: 1 1 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 3px;

    .title-cont {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h1 {
        font-family: Roboto, sans-serif;
        font-size: ${Rem(18)};
        font-weight: 600;
        letter-spacing: 1px;
        line-height: 27px;
      }

      .message-info-cont {
        display: flex;
        gap: 5px;
        align-items: center;

        .is-checked {

        }

        .date {
          font-weight: 500;
          font-size: ${Rem(14)};
          font-family: Roboto, sans-serif;
        }
      }
    }

    .sub-title-cont {
      display: flex;
      align-items: center;
      justify-content: space-between;


      h2 {
        font-family: Roboto, sans-serif;
        font-weight: 400;
        font-size: ${Rem(17)};
        flex: 1 1 auto;
      }

      .unseen-messages {
        font-family: Roboto, sans-serif;
        font-weight: 600;
        font-size: ${Rem(16)};
        background-color: rgb(131, 131, 131);
        border-radius: 15px;
        padding: 5px 8px;
      }
    }


  }
`
