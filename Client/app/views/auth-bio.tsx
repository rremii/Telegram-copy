import React, {ChangeEvent, useRef, useState} from "react"
import styled from "styled-components"
import Image from "next/image"
import {Field, Form, Formik} from "formik"
import * as Yup from "yup"
import {useRouter} from "next/router"
import {Rem} from "../../styles/functions/mixins"
import {useAppDispatch} from "../store/ReduxStore"
import {addUserBio} from "../store/AuthSlice"

const validSchema = Yup.object().shape({
	firstName: Yup.string().required(),
	lastName: Yup.string(),
})

interface FormValues {
	firstName: string
	lastName: string
}


const AuthBio = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const [img, setImg] = useState<string>()
	const fileRef = useRef<HTMLInputElement>(null)

	const HandleSubmit = async (values: FormValues) => {
		if (fileRef?.current?.files) {
			await dispatch(
				addUserBio({
					...values,
					profilePic: fileRef.current.files[0],
				})
			)
		}
		await router.push("email")
	}
	const HandlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) setImg(URL.createObjectURL(e.target.files[0]))
	}
	return (
		<Auth3Wrapper isActive={!!img} className="Auth3__wrapper">
			<div className="Auth__container">
				<div className="title">
					Please enter your name and add a profile picture
				</div>
				<section>
					<div className="img-upload-cont">
						<div className="no-avatar">
							<Image
								alt=""
								width={75}
								height={75}
								src={"/add-photo-icon.svg"}
							/>
						</div>
						<div className="avatar">
							{img && (
								<Image
									alt=""
									width={100}
									height={100}
									src={img}
								/>
							)}
						</div>
						<input
							className="img-upload"
							onChange={HandlePictureChange}
							ref={fileRef}
							type="file"
							accept="*.png,*.jpeg,*.jpg"
						/>
					</div>
					<Formik

						validationSchema={validSchema}
						initialValues={
							{
								firstName: "",
								lastName: "",
							} as FormValues
						}
						onSubmit={HandleSubmit}
					>
						<Form>
							<div className="field-cont">
								<Field
									placeholder="First name (required)"
									name="firstName"
									className="Form-field"
								/>
								<Field
									placeholder="Last name (optional)"
									name="lastName"
									className="Form-field"
								/>
							</div>
							<div className="submit-cont">
								<button type="submit" className="submit">
									➜
								</button>
							</div>
						</Form>
					</Formik>
				</section>
			</div>
		</Auth3Wrapper>
	)
}
export default AuthBio
const Auth3Wrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(33, 33, 33);

  .Auth__container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;

    .title {
      color: white;
      display: flex;
      font-family: Roboto, sans-serif;
      font-size: ${Rem(16)};
      text-align: center;
    }

    section {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;

      .img-upload-cont {
        width: 100px;
        height: 100px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
        overflow: hidden;

        &::after {
          content: "";
          position: absolute;

          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgb(135, 116, 225);
          border-radius: 50%;
            // display: ${({isActive}) =>
	isActive ? "none" : "initial"};
        }

        //img {
          // border-radius: ${({isActive}) => (isActive ? "50%" : "0")};
        //z-index: 1;
        //}

        .no-avatar {
          z-index: 5;
          position: absolute;
        }

        .avatar {
          z-index: 10;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 50%;
        }

        .img-upload {
          z-index: 15;
          opacity: 0;
          //border-radius: inherit;
          position: absolute;
          top: -25px;
          left: 0;
          width: 100%;
          height: calc(100% + 25px);
          cursor: pointer;
        }
      }

      .field-cont {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .Form-field {
          width: 270px;
          background-color: transparent;
          padding: 10px;
          color: white;
          border-bottom: 2px solid rgb(135, 116, 225);
        }
      }

      .submit-cont {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .submit {
          margin-top: 10px;
          width: 50px;
          height: 50px;
          background-color: rgb(135, 116, 225);
          color: white;
          border-radius: 50%;
          justify-self: flex-end;
          font-size: ${Rem(22)};
        }
      }
    }
  }
`
