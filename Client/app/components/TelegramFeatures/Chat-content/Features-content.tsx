import {FC} from "react"
import styled from "styled-components"
import FeaturesMessagesBox from "./Features-messages-box"

interface IFeaturesContent {

}

const FeaturesContent: FC<IFeaturesContent> = () => {
	return <FeaturesContentWrapper>
		<div className="features-cont">
			<FeaturesMessagesBox/>

		</div>
	</FeaturesContentWrapper>
}
export default FeaturesContent
const FeaturesContentWrapper = styled.div`
  flex: 1 1 auto;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;

  .features-cont {
    flex: 1 1 728px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    align-items: center;
  }
`
