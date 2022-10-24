import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../../../styles/functions/mixins"

const SettingsBox = () => {
	return <SettingsBoxWrapper>

		<h1 className="title">Settings</h1>
		<div className="text-size-box">
			<h2 className="sub-title">Message Text Size</h2>
			<input type="range"/>
		</div>
		<div className="bg-box">
			<Image width={24} height={24} src="/gallery-icon.svg"/>
		</div>
	</SettingsBoxWrapper>
}
export default SettingsBox
const SettingsBoxWrapper = styled.div`
  background-color: rgb(33, 33, 33);

  .title {
    color: #8774e1;
    font-family: Roboto, sans-serif;
    font-size: ${Rem(16)};
    font-weight: 500;
    padding: 8px 16px;
  }

  .text-size-box {
    padding: 16px 14px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .sub-title {
      color: white;
      font-family: Roboto, sans-serif;
      font-size: ${Rem(18)};
      font-weight: 400;
    }
  }

  .bg-box {
    padding: 0 16px;
  }


`
