import {FC} from "react"
import styled from "styled-components"
import {Rem} from "../../../../styles/functions/mixins"
import Image from "next/image"

interface IChatInputBox {

}


const ChatInputBox: FC<IChatInputBox> = () => {
	return <ChatInputBoxWrapper>
		<div className="input-cont">
			<input placeholder="Message" type="text"/>
		</div>
		<div className="tail-cont">
			<Image width={20} height={20} layout="fill" className="tail" src={"/bubble-tail-left.svg"} alt=""/>
		</div>

	</ChatInputBoxWrapper>
}
export default ChatInputBox
const ChatInputBoxWrapper = styled.div`
  background-color: rgb(33, 33, 33);
  flex: 0 0 54px;
  display: flex;
  align-items: center;
  width: calc(100% - 15px);
  border-radius: 12px 12px 0 12px;
  font-family: Roboto, sans-serif;
  padding: 0 50px;
  position: relative;
  margin-top: 5px;

  .input-cont {
    width: 100%;
    padding: 5px 8px;
    height: 100%;
    position: relative;

    input {
      width: 100%;
      height: 100%;
      background-color: transparent;
      caret-color: rgb(135, 116, 225);
      color: white;
      font-size: ${Rem(18)};

      ::placeholder {
        font-family: Roboto, sans-serif;
        color: rgb(101, 106, 110);
      }

    }
  }

  .tail-cont {

    width: 20px;
    height: 20px;
    position: absolute;
    left: 100%;
    bottom: 0;
    transform: translateX(-7px) rotateY(180deg);

    .tail {
    }
  }


`
