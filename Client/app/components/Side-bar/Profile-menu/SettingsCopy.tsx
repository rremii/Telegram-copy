import {FC} from "react"
import styled from "styled-components"
import {useAppDispatch} from "../../../store/ReduxStore"

interface ISettingsCopy {

}


const SettingsCopy: FC<ISettingsCopy> = () => {
	const dispatch = useAppDispatch()


	return <SettingsCopyWrapper className="settingsCopy__wrapper">
		<div className="settingsCopy__container">

		</div>
	</SettingsCopyWrapper>
}
export default SettingsCopy
const SettingsCopyWrapper = styled.div`
  .settingsCopy__container {
    width: 100%;
    display: flex;
    padding: 10px;
    gap: 10px;
    border-radius: 10px;
    cursor: pointer;
    align-items: center;


  }
`
