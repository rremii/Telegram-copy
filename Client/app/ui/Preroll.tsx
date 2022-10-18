import styled from "styled-components"
import Image from "next/image"

const Preroll = () => {
	return <PrerollWrapper>
		<div className="spinner">
			<Image layout="fill" src="/spinner.svg"/>
		</div>
		Updating...
	</PrerollWrapper>
}
export default Preroll
const PrerollWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 70px;
  width: 100%;
  height: 65px;
  background-color: rgb(254, 216, 90);
  color: rgb(91, 82, 43);
  font-weight: 600;
  font-family: Roboto, sans-serif;
  border-radius: 10px;
  position: relative;
  animation: fade 0.2s;
  transform-origin: top;
  @keyframes fade {
    0% {
      transform: scaleY(0);
    }
    100% {
      transform: scaleY(1);
    }
  }

  .spinner {
    position: absolute;
    top: 50%;
    left: 20px;
    width: 35px;
    height: 35px;
    transform: translateY(-50%);
    animation: spin 1s infinite linear;
  }

  @keyframes spin {
    0% {
      transform: translateY(-50%) rotate(0);
    }
    100% {
      transform: translateY(-50%) rotate(360deg);

    }
  }
`
