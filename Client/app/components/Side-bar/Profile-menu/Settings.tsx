import styled from "styled-components"
import Image from "next/image"
import {Rem} from "../../../../styles/functions/mixins"

const Settings = () => {
	return <SettingsWrapper>
		<div className="cell">
			<div className="icon">
				<Image width={35} height={35} src="/setting-gray.svg"/>
			</div>
			<h1 className="title">
				General Settings
			</h1>
		</div>
		<div className="cell">
			<div className="icon">
				<Image width={35} height={35} src="/language-icon.svg"/>
			</div>
			<h1 className="title">
				Language
			</h1>
		</div>
	</SettingsWrapper>
}
export default Settings
const SettingsWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin: 12px 0;
  background-color: rgb(33, 33, 33);

  .cell {
    width: 100%;
    display: flex;
    padding: 10px;
    gap: 25px;
    border-radius: 10px;
    cursor: pointer;
    align-items: center;

    &:hover {
      background-color: rgb(43, 43, 43);
    }

    .icon {

    }

    .title {
      font-size: ${Rem(18)};
      font-weight: 500;
      font-family: Roboto, sans-serif;
    }
  }
`
