import React, {FC} from "react"
import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../../../../styles/functions/mixins"
import {cutStringToLength} from "../../../../utils/cutStringToLength"

interface ChatListType {

}


const chat = [
	{
		avatar: "/dog-icon.png",
		title: "Go StudyGo StudyGo StudyGo Study",
		subTitle: "some message from Go Study some message from Go Study"
	}
]

const ChatList: FC<ChatListType> = () => {
	return <ChatListWrapper className="chat-list">

		{chat.map(({title, subTitle, avatar}, index) => {
			return <div key={index} className="cell">
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
			</div>
		})}

	</ChatListWrapper>
}
export default ChatList
const ChatListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  position: relative;
  //header height
  flex: 0 0 calc(100vh - 60px);

  padding-right: 4px;

  ::-webkit-scrollbar {
    background-color: transparent;
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #777777;
    border-radius: 5px;
  }

  .cell {
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
          font-family: Roboto;
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
            font-family: Roboto;
          }
        }
      }

      .sub-title-cont {
        display: flex;
        align-items: center;
        justify-content: space-between;


        h2 {
          font-family: Roboto;
          font-weight: 400;
          font-size: ${Rem(17)};
          flex: 1 1 auto;
        }

        .unseen-messages {
          font-family: Roboto;
          font-weight: 600;
          font-size: ${Rem(16)};
          background-color: rgb(131, 131, 131);
          border-radius: 15px;
          padding: 5px 8px;
        }
      }


    }
  }
`
