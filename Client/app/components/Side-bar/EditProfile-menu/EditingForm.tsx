import styled from "styled-components"
import Image from "next/image"
import React, {ChangeEvent, useContext, useRef, useState} from "react"
import {Field, Form, Formik} from "formik"
import {Rem} from "../../../../styles/functions/mixins"
import {useTypedSelector} from "../../../store/ReduxStore"
import {API_URL_STATIC} from "../../../api/config"
import * as Yup from "yup"
import {useEditUserBioMutation} from "../../../api/rtk/MeApi"
import {GlobalContext} from "../../../hooks/useGlobalContext"
import {SideBarContext} from "../../../hooks/useSideBarContext"

interface formValues {
	firstName: string,
	lastName: string
}

const validSchema = Yup.object().shape({
	firstName: Yup.string().required().min(3).max(25),
	lastName: Yup.string(),
})

const EditingForm = () => {

	const {profilePic} = useTypedSelector(state => state.Me.me)
	const {user_id} = useTypedSelector(state => state.Me.me)
	const {firstName} = useTypedSelector(state => state.Me.me)
	const {lastName} = useTypedSelector(state => state.Me.me)

	const [editUser] = useEditUserBioMutation()

	const {language} = useContext(GlobalContext)
	const {isDarkMode} = useContext(SideBarContext)


	const [img, setImg] = useState<string>()
	const fileRef = useRef<HTMLInputElement>(null)

	const HandlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) setImg(URL.createObjectURL(e.target.files[0]))
	}

	return <EditingFormWrapper isDarkMode={isDarkMode}>
		<Formik
			onSubmit={(values: formValues) => {


				editUser({
					...values,
					profilePic: fileRef?.current?.files ? fileRef?.current?.files[0] : null,
					user_id
				})

			}}
			validationSchema={validSchema}
			enableReinitialize={true}
			initialValues={{
				firstName: firstName ? firstName : "" as string,
				lastName: lastName ? lastName : "" as string
			}}

		>
			{({dirty, isValid}) => (
				<Form autoComplete="off">
					<div className="avatar-cont">
						<div className="avatar">
							<Image layout="fill" src={img ? img : API_URL_STATIC + profilePic}/>
							<div className="add-photo">
								<Image layout="fill" src="/add-photo-icon.svg"/>
							</div>
							<input onChange={HandlePictureChange} ref={fileRef} type="file"/>
						</div>
					</div>
					<div className="form-field-cont">
						<Field
							// onChange={(
							// 	e: ChangeEvent<HTMLInputElement>
							/*) => handleChange(e)}*/
							// value={!initialValues.firstName ? firstName : initialValues.firstName}
							type="text"
							autoComplete="off"
							className="form-field"
							name="firstName"
						/>
						<label htmlFor="Code">
							{language === "English" ? "First Name" : "Имя"}

						</label>
					</div>
					<div className="form-field-cont">
						<Field
							// onChange={(
							// 	e: ChangeEvent<HTMLInputElement>
							// ) => HandleOnChange(e, helpers)}
							type="text"
							autoComplete="off"
							className="form-field"
							name="lastName"
						/>
						<label htmlFor="Code">
							{language === "English" ? "Last Name" : "Фамилия"}

						</label>
					</div>
					{dirty && isValid && <button className="submit">
						<span/>
					</button>}
				</Form>
			)}
		</Formik>
		<h3 className="helper-text">
			{language === "English" ?
				"You can use a-z, 0-9 and underscores. Minimum length is 3 characters." :
				"Используйте а-я, 0-9 и нижнее подчеркивание. Минимальная длинна 3 символа"}

		</h3>
	</EditingFormWrapper>
}
export default React.memo(EditingForm)
const EditingFormWrapper = styled.div<{
	isDarkMode: boolean
}>`
  width: 100%;

  background-color: ${({isDarkMode}) => isDarkMode ? "rgb(22, 22, 22)" : "rgb(170,170,170)"};

  form {
    background-color: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "white"};

    padding: 12px;
    width: 100%;

    .avatar-cont {
      padding: 32px 0;
      background-color: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "white"};

      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;


      .avatar {
        border-radius: 50%;
        overflow: hidden;
        width: 120px;
        height: 120px;
        position: relative;
        cursor: pointer;

        img, span {
          border-radius: inherit;
        }

        &:hover .add-photo {
          transform: translate(-50%, -50%) scale(1.2);
        }

        .add-photo {
          width: 48px;
          height: 48px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          transition: 0.5s;
          pointer-events: none;
        }

        input {
          position: relative;
          width: 100%;
          height: 100%;
          opacity: 0;
          border-radius: inherit;
          cursor: pointer;

        }
      }

    }


    .form-field-cont {

      width: 100%;
      position: relative;
      margin-bottom: 30px;
      outline: none;

      &:hover input {
        border: rgb(135, 116, 225) 1px solid;

      }

      &:hover label {
        pointer-events: none;
      }


      label {
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        padding-left: 20px;
        letter-spacing: 1px;
        font-size: ${Rem(18)};
        color: #a2acb4;
        position: absolute;
        transition: 0.5s;

        &:hover {
          top: 0;
          color: rgb(135, 116, 225);
          background-color: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "white"};

          left: 5px;
          padding: 5px;
          font-size: ${Rem(14)};
        }
      }

      .form-field {
        position: relative;
        font-family: "Roboto";
        width: 100%;
        background-color: transparent;
        border: 1px solid rgb(83, 83, 82);
        padding: 15px 11px;
        border-radius: 12px;
        transition: .3s;
        overflow: visible;
        color: transparent;

        &:hover,
        &:focus {
          border: 1px solid rgb(135, 116, 225);
          color: ${({isDarkMode}) => isDarkMode ? "white" : "rgb(47,47,47)"};


        }
      }

      .form-field:hover + label {
        top: 0;
        color: rgb(135, 116, 225);
        background-color: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "white"};

        left: 5px;
        padding: 5px;
        font-size: ${Rem(14)};
      }

      .form-field:focus + label {
        top: 0;
        color: rgb(135, 116, 225);
        background-color: ${({isDarkMode}) => isDarkMode ? "rgb(33, 33, 33)" : "white"};

        left: 5px;
        padding: 5px;
        font-size: ${Rem(14)};
      }
    }


    .submit {
      position: absolute;
      background-color: rgb(135, 116, 225);
      width: 54px;
      height: 54px;
      border-radius: 50%;
      bottom: 60px;
      right: 20px;

      &::after {
        width: 24px;
        height: 24px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        content: "";
        background-color: white;
        -webkit-clip-path: polygon(30% 89%,
        90% 24%,
        95% 31%,
        30% 100%,
        0 73%,
        0 62%);
        clip-path: polygon(30% 89%,
        90% 24%,
        95% 31%,
        30% 100%,
        0 73%,
        0 62%);
      }


    }

  }

  .helper-text {
    position: absolute;
    bottom: 10px;
    width: 100%;
    padding: 0 12px;
    line-height: 1.6;
    color: ${({isDarkMode}) => isDarkMode ? "rgb(170, 170, 170)" : "rgb(47,47,47)"};

    font-size: ${Rem(14)};
  }

`
