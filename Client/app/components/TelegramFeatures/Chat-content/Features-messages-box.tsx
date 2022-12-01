import styled from "styled-components"
import {Rem} from "../../../../styles/functions/mixins"
import Image from "next/image"
import {useContext} from "react"
import {SideBarContext} from "../../../hooks/useSideBarContext"


const FeaturesMessages = () => {

	const {isDarkMode} = useContext(SideBarContext)

	const bubbleTailSrc = isDarkMode ? "/bubble-tail-left.svg" : "/bubble-tail-left-white.svg"

	return <FeaturesMessagesWrapper isDarkMode={isDarkMode} id="scroll-cont">

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
				<img src={bubbleTailSrc}
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
				<img src={bubbleTailSrc}
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
				<img src={bubbleTailSrc}
					 alt="bubble-tail"/>
			</div>
		</div>


	</FeaturesMessagesWrapper>
}
export default FeaturesMessages
const FeaturesMessagesWrapper = styled.div<{
	isDarkMode: boolean
}>`
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
      color: ${({isDarkMode}) => isDarkMode ? "white" : "black"};
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
      background-color: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "white"};

      img {
        bottom: 0;
        transform: translateX(7px);
        right: 100%;
      }
    }

  }
`
