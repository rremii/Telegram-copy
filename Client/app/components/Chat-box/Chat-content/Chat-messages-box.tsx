import {FC} from "react"
import styled from "styled-components"
import {Rem} from "../../../../styles/functions/mixins"
import Image from "next/image"

interface IChatMessagesBox {

}


const ChatMessagesBox: FC<IChatMessagesBox> = () => {
	return <ChatMessagesBoxWrapper>
		<div className="message-cont">
			<p className="message your-message">your message
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aut culpa deleniti distinctio, dolorum
				excepturi facilis impedit magni, minima, molestiae nisi reiciendis totam vitae! At harum impedit
				officiis qui sint.
				<div className="extra-info">
					<span className="created-at">19:54</span>
					<Image width={19}
						   height={16} src="/check.svg"/>
				</div>
				<img src="/bubble-tail-left-purple.svg" alt="bubble-tail"/>
			</p>
		</div>
		<div className="message-cont">
			<p className="message other-message">other message
				<div className="extra-info">
					<span className="created-at">19:54</span>
					<Image width={19}
						   height={16} src="/check.svg"/>
				</div>
				<img src="/bubble-tail-left.svg" alt="bubble-tail"/>
			</p>
		</div>
	</ChatMessagesBoxWrapper>
}
export default ChatMessagesBox
const ChatMessagesBoxWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 140px);
  overflow-y: auto;
  //background-color: green;
  display: flex;
  flex-direction: column;
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
