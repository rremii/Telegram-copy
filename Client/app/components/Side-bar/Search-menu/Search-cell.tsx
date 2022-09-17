import Image from "next/image"
import React, {FC} from "react"
import styled from "styled-components"
import {AdaptiveValue, Rem} from "../../../../styles/functions/mixins"
import {API_URL_STATIC} from "../../../api"
import {createChat} from "../../../store/ChatSlice"
import {useAppDispatch, useTypedSelector} from "../../../store/ReduxStore"

interface ISearchCell {
	avatar: string
	title: string
	subTitle: string
	id: number
}

const SearchCell: FC<ISearchCell> = ({title = "", subTitle = "", avatar, id}) => {

	const dispatch = useAppDispatch()

	const {user_id} = useTypedSelector(state => state.Me.me)

	const CreateChat = () => {
		dispatch(createChat([user_id, id]))
	}


	return <CellWrapper onClick={CreateChat}>
		<div className="avatar">
			<Image layout="fill" src={avatar ? API_URL_STATIC + avatar : "/no-avatar.svg"}/>
		</div>
		<div className="text-cont">

			<h1>{title}</h1>
			<h2>{subTitle}</h2>
		</div>
	</CellWrapper>
}
export default SearchCell
const CellWrapper = styled.div`
  cursor: pointer;
  flex: 0 0 72px;
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
  gap: 7px;
  padding: 9px;

  &:hover {
    background-color: rgba(64, 64, 64, 0.3);

  }

  .avatar {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${AdaptiveValue(54, 45)};
    height: ${AdaptiveValue(54, 45)};
    position: relative;

    img, span {
      border-radius: inherit;
    }
  }

  .text-cont {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: center;
    gap: 5px;
    height: 100%;

    h1 {
      font-family: Roboto, sans-serif;
      font-size: ${AdaptiveValue(18, 16)};
      font-weight: 600;
      letter-spacing: 1px;
      line-height: ${AdaptiveValue(27, 15)};

    }

    h2 {
      font-family: Roboto, sans-serif;
      font-weight: 400;
      font-size: ${Rem(17)};
    }
  }

`
