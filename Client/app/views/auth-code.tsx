import React, {ChangeEvent} from "react"
import styled from "styled-components"
import Image from "next/image"
import {Field, Form, Formik, FormikProps} from "formik"
import {useRouter} from "next/router"
import {Rem} from "../../styles/functions/mixins"
import useIsLoginPage from "../hooks/useIsLoginPage"
import {useAppDispatch, useTypedSelector} from "../store/ReduxStore"
import {useClearErrors} from "../hooks/useClearErrors"
import {FormikHelpers} from "formik/dist/types"
import {fetchLogin, fetchRegistration} from "../store/AuthSlice"

interface FormValues {
	code: string
}


const AuthCode = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const {firstName} = useTypedSelector((state) => state.Auth.userBio)
	const {lastName} = useTypedSelector((state) => state.Auth.userBio)
	const {email} = useTypedSelector((state) => state.Auth.user)
	const {profilePic} = useTypedSelector((state) => state.Auth.userBio)
	const {codeError} = useTypedSelector((state) => state.Auth)


	useClearErrors()
	const {isLoginPage, mainColor} = useIsLoginPage()

	const HandleSubmit = async (
		{code}: FormValues,
		{resetForm}: FormikHelpers<FormValues>
	) => {
		let response: any

		if (isLoginPage) response = await dispatch(fetchLogin(code))
		else
			response = await dispatch(
				fetchRegistration({
					code,
					firstName,
					lastName,
					profilePic,
				})
			)

		if (response.error) resetForm()

		if (!response.error && response) await router.push("/")
	}

	const HandleOnChange = (
		e: ChangeEvent<HTMLInputElement>,
		{handleChange, isValid, submitForm}: FormikProps<FormValues>
	) => {
		handleChange(e)
		if (isValid && e.currentTarget.value.length === 6) submitForm()
	}

	return (
		<Auth2Wrapper mainColor={mainColor} className="Auth2__wrapper">
			<div className="Auth2__container">
				<div className="form-icon">
					<Image
						alt=""
						src="/dog-icon.png"
						width={180}
						height={180}
					/>
				</div>
				<h1 className="form-title">{email}</h1>
				<h2 className="form-sub-title">
					We&apos;ve sent the code to your email.
				</h2>
				<Formik
					initialValues={{
						code: "" as string,
					}}
					onSubmit={HandleSubmit}
				>
					{(helpers) => (
						<Form autoComplete="off">
							<div className="form-field-cont">
								<Field
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) => HandleOnChange(e, helpers)}
									type="text"
									autoComplete="off"
									className="form-field"
									name="code"
								/>
								<label htmlFor="Code">
									{codeError || "Code"}
								</label>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</Auth2Wrapper>
	)
}
export default AuthCode
const Auth2Wrapper = styled.div<{ mainColor: string }>`
  background-color: rgb(33, 33, 33);
  display: flex;
  align-items: center;
  justify-content: center;

  .Auth2__container {
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .form-icon {

      border-radius: 50%;
      margin-bottom: 40px;

      img {
        background-color: transparent;
        z-index: 1;
        border-radius: 50%;

        width: 100%;
        height: 100%;
        position: relative;
      }
    }
  }

  .form-title {
    font-family: "Roboto";
    color: white;
    font-size: ${Rem(32)};
    margin-bottom: 8px;
  }

  .form-sub-title {
    color: rgb(150, 165, 152);
    font-family: "Roboto";
    font-size: ${Rem(16)};
    margin-bottom: 40px;
  }

  form {

    width: 100%;

    .form-field-cont {

      width: 100%;
      position: relative;
      margin-bottom: 30px;
      position: relative;
      outline: none;

      &:hover input {
        border: ${({mainColor}) => mainColor} 1px solid;
        color: white;
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
          color: ${({mainColor}) => mainColor};
          background-color: rgb(33, 33, 33);
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
        position: relative;
        overflow: visible;
        color: transparent;

        &:hover,
        &:focus {
          border: 1px solid ${({mainColor}) => mainColor};
          color: white;

        }
      }

      .form-field:hover + label {
        top: 0;
        color: ${({mainColor}) => mainColor};
        background-color: rgb(33, 33, 33);
        left: 5px;
        padding: 5px;
        font-size: ${Rem(14)};
      }

      .form-field:focus + label {
        top: 0;
        color: ${({mainColor}) => mainColor};
        background-color: rgb(33, 33, 33);
        left: 5px;
        padding: 5px;
        font-size: ${Rem(14)};
      }
    }


    .remember-me-cont {
      width: 100%;
      display: flex;
      gap: 30px;
      align-items: center;
      padding-left: 20px;

      .checkbox-cont {
        position: relative;

        input {
          position: relative;
          width: 18px;
          height: 18px;
          border-radius: 3px;
          border: rgb(83, 83, 82) 2px solid;
          background-color: transparent;
          appearance: none;
          z-index: 1;


        }

        span {
          position: absolute;
          width: 18px;
          height: 18px;
          left: 0;

          &::after {
            width: 15px;
            height: 15px;
            top: 0;
            left: 3px;
            position: absolute;
            content: '';
            background-color: transparent;
            -webkit-clip-path: polygon(30% 89%, 90% 24%, 95% 31%, 30% 100%, 0 73%, 0 62%);
            clip-path: polygon(30% 89%, 90% 24%, 95% 31%, 30% 100%, 0 73%, 0 62%);
          }
        }

        input:checked + span {
          background-color: ${({mainColor}) => mainColor};
          border-radius: 4px;

          &::after {

            background-color: white;
          }
        }
      }

      .form-rememberMe-text {
        font-family: "Roboto";
        font-size: ${Rem(16)};
        color: white;
      }

    }

    .submit {
      margin-top: 40px;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      height: 56px;
      font-family: "Roboto";
      border-radius: 13px;
      font-size: ${Rem(20)};
      background-color: transparent;
      color: transparent;
      transition: .5s;
      pointer-events: none;
    }

    .submit-active {
      pointer-events: initial;
      background-color: ${({mainColor}) => mainColor};
      color: white;

    }
  }
}
`
