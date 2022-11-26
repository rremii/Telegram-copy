import {FC} from "react"
import styled from "styled-components"
import {Rem} from "../../../../styles/functions/mixins"
import Image from "next/image"

interface IFeaturesMessages {

}


const FeaturesMessages: FC<IFeaturesMessages> = () => {


	// const {currentChatId} = useTypedSelector(state => state.Chats)
	// const {user_id} = useTypedSelector(state => state.Me.me)
	//
	//
	// const {
	// 	data: messages,
	// } = useGetAllMessagesQuery({chat_id: currentChatId, user_id}, {
	// 	pollingInterval: 2000,
	// 	skip: !currentChatId
	// })
	//
	//
	// useEffect(() => {
	// 	const scrollBox = document.getElementById("scroll-cont")
	// 	if (scrollBox) {
	// 		scrollBox.scrollTo(0, scrollBox.scrollHeight)
	// 	}
	//
	// }, [messages])

	return <FeaturesMessagesWrapper id="scroll-cont">

		<div className="message-cont">
			<div style={{animationDelay: 0.02 + "s"}} className={`message other-message `}>
				hello there that&apos;s a just a copy of telegram
				no commerce, made only for fun,all rights belong to
				telegram
				<div className="extra-info">
					<span className="created-at">Oct 22</span>
					<Image width={19}
						   height={16} src="/check.svg"/>
				</div>
				<img src="/bubble-tail-left.svg"
					 alt="bubble-tail"/>
			</div>
		</div>
		<div className="message-cont">
			<div style={{animationDelay: 0.02 + "s"}} className={`message other-message `}>
				My nickname so you can find me here is Artem
				feel free to write me
				<div className="extra-info">
					<span className="created-at">Oct 22</span>
					<Image width={19}
						   height={16} src="/check.svg"/>
				</div>
				<img src="/bubble-tail-left.svg"
					 alt="bubble-tail"/>
			</div>
		</div>
		<div className="message-cont">
			<div style={{animationDelay: 0.02 + "s"}} className={`message other-message `}>
				you can find me on {//TODO and media
			}
				<div className="extra-info">
					<span className="created-at">Oct 22</span>
					<Image width={19}
						   height={16} src="/check.svg"/>
				</div>
				<img src="/bubble-tail-left.svg"
					 alt="bubble-tail"/>
			</div>
		</div>
		<div className="message-cont">
			<div style={{animationDelay: 0.02 + "s"}} className={`message other-message `}>Hey, now you can deal we the
				messages you send, hopefully you like that
				<div className="extra-info">
					<span className="created-at">Oct 23</span>
					<Image width={19}
						   height={16} src="/check.svg"/>
				</div>
				<img src="/bubble-tail-left.svg"
					 alt="bubble-tail"/>
			</div>
		</div>

	</FeaturesMessagesWrapper>
}
export default FeaturesMessages
const FeaturesMessagesWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 140px);
  overflow-y: auto;
  overflow-x: hidden;
  //background-color: green;
  display: flex;
  flex-direction: column;
  //scroll-behavior: smooth;
  gap: 10px;

  padding: 8px;

  ::-webkit-scrollbar {
    width: 0;
  }


  .message-cont {
    width: 100%;
    display: grid;
    gap: 10px;

    .message {
      color: white;
      font-size: ${Rem(16)};
      font-family: Roboto, sans-serif;
      padding: 8px 10px 8px 10px;
      min-width: min-content;
      max-width: min(80vw, 350px);
      position: relative;
      word-wrap: anywhere;
      animation: fadeOut 0.5s forwards;
      opacity: 0;
      animation-delay: 0.5s;


      @keyframes fadeOut {
        0% {
          opacity: 0;
          transform: scaleY(0.5);
        }
        100% {
          opacity: 1;
          transform: scaleY(1);
        }
      }

      .extra-info {
        display: flex;
        align-items: center;
        margin-left: 5px;
        transform: translateY(6px);
        float: right;
        gap: 5px;

        .created-at {
          color: rgba(255, 255, 255, 0.6);
          font-size: ${Rem(12)};
          font-family: Roboto, sans-serif;
        }

      }


      img {
        width: 20px;
        height: 20px;
        position: absolute;
      }

    }


    .your-message {
      border-radius: 12px 12px 0 12px;
      justify-self: end;
      background-color: rgb(135, 116, 225);
      position: relative;

      img {
        bottom: 0;
        transform: rotateY(180deg) translateX(7px);
        left: 100%;
      }
    }

    .other-message {
      justify-self: start;
      border-radius: 12px 12px 12px 0;
      background-color: rgb(33, 33, 33);

      img {
        bottom: 0;
        transform: translateX(7px);
        right: 100%;
      }
    }

  }
`
