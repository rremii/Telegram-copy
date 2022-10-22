import styled from "styled-components"
import {FC} from "react"


interface IChatMessageSettings {
	X: number,
	Y: number
}

const ChatMessageSettings: FC<IChatMessageSettings> = ({X, Y}) => {


	return <MessageSettings>
		<div className="option">Edit</div>
		<div className="option">Copy</div>
		<div className="option">Delete</div>
	</MessageSettings>
}
export default ChatMessageSettings
const MessageSettings = styled.div`
  position: fixed;
  width: 180px;
  height: 230px;
  background-color: rgba(33, 33, 33, 0.75);
  border-radius: 10px;



`
