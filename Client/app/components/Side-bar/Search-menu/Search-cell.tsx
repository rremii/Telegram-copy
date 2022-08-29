import Image from "next/image"
import React, {FC} from "react"
import styled from "styled-components"
import {Rem} from "../../../../styles/functions/mixins"

interface SearchCell {
	avatar: string
	title: string
	subTitle: string
}

const SearchCell: FC<SearchCell> = ({title, subTitle, avatar}) => {


	return <CellWrapper>
		<div className="avatar">
			<Image width={54} height={54} src={avatar}/>
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
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

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
      font-family: Roboto;
      font-size: ${Rem(18)};
      font-weight: 600;
      letter-spacing: 1px;
      line-height: 27px;

    }

    h2 {
      font-family: Roboto;
      font-weight: 400;
      font-size: ${Rem(17)};
    }
  }

`
