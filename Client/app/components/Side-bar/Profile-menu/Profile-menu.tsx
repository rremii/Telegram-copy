import React, {FC} from "react"
import styled from "styled-components"

interface ProfileMenuType {
}

const ProfileMenu: FC<ProfileMenuType> = () => {
	return <ProfileMenuWrapper className="profileMenu__wrapper">
		profile
	</ProfileMenuWrapper>
}
export default ProfileMenu
const ProfileMenuWrapper = styled.div`
  position: absolute;
  left: 100%;
  top: 0;
  height: 100%;
  background-color: red;
  //transform: translateX(-100%);
`
