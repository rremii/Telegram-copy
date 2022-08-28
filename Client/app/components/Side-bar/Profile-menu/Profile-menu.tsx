import React, {FC} from "react"
import styled from "styled-components"

interface ProfileMenuType {
}

const ProfileMenu: FC<ProfileMenuType> = () => {
	return <ProfileMenuWrapper>
		<div className="profileMenu-cont">
			profile

		</div>
	</ProfileMenuWrapper>
}
export default ProfileMenu
const ProfileMenuWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background-color: transparent;
  pointer-events: none;
  overflow: hidden;

  .profileMenu-cont {
    position: absolute;
    left: 100%;
    top: 0;
    //transform: translateX(-100%);
    width: 100%;
    height: 100%;
    background-color: red;
  }
`
