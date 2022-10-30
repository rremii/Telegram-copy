import styled from "styled-components"
import Header from "./Header"
import {useContext} from "react"
import {SideBarContext} from "../../../hooks/useSideBarContext"
import EditingForm from "./EditingForm"

const EditProfileMenu = () => {


	const {isEditProfile} = useContext(SideBarContext)


	return <EditProfileMenuWrapper isEditProfile={isEditProfile}>
		<div className="EditProfileMenu-cont">
			<Header/>
			<EditingForm/>
		</div>
	</EditProfileMenuWrapper>
}
export default EditProfileMenu
const EditProfileMenuWrapper = styled.div<{
	isEditProfile: boolean
}>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 55;
  background-color: transparent;
  pointer-events: none;
  overflow: hidden;

  .EditProfileMenu-cont {
    transition: .4s;
    pointer-events: initial;
    position: absolute;
    left: 100%;
    top: 0;
    transform: ${({isEditProfile}) => isEditProfile ? "translateX(-100%)" : "translateX(0)"};
    width: 100%;
    height: 100%;
    background-color: rgb(22, 22, 22);
    display: flex;
    flex-direction: column;

  }




`
