import React, {useState} from "react"
import styled from "styled-components"
import Image from "next/image"
import {Field, Form, Formik} from "formik"
import * as Yup from "yup"
import {useRouter} from "next/router"
import {Rem} from "../../styles/functions/mixins"
import useIsLoginPage from "../hooks/useIsLoginPage"
import {useAppDispatch, useTypedSelector} from "../store/ReduxStore"
import {addUser, fetchCreateCandidate} from "../store/AuthSlice"
import {useClearErrors} from "../hooks/useClearErrors"

const validSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Required"),
	isRememberMe: Yup.boolean(),
})

interface formValues {
	email: string
	isRememberMe: boolean
}


const AuthEmail = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()

	const {emailError} = useTypedSelector((state) => state.Auth)

	// const [createCandidate, result] = useCreateCandidateMutation()

	const [isPending, setIsPending] = useState<boolean>(false)

	useClearErrors()
	const {mainColor, isLoginPage} = useIsLoginPage()

	const HandleSubmit = async ({email, isRememberMe}: formValues) => {
		document.cookie =
			encodeURIComponent("isRememberMe") +
			" = " +
			encodeURIComponent(isRememberMe)
		setIsPending(true)


		const response: any = await dispatch(
			fetchCreateCandidate({
				email,
				type: isLoginPage ? "login" : "register",
			})
		)

		//
		dispatch(addUser(email))

		if (!response.error) await router.push("code")
		setIsPending(false)
	}

	return (
		<Auth1Wrapper mainColor={mainColor} className="Auth1__wrapper">
			<div className="Auth1__container">
				<div className="form-icon">
					<Image
						alt="telegram logo"
						src={
							isLoginPage
								? "/telegram-icon.svg"
								: "/telegram-icon-purple.svg"
						}
						width={160}
						height={160}
					/>
				</div>
				<h1 className="form-title">Telegram</h1>
				<h2 className="form-sub-title">
					Please enter your email address.
				</h2>
				<Formik
					validationSchema={validSchema}
					initialValues={
						{
							email: "",
							isRememberMe: false,
						} as formValues
					}
					onSubmit={HandleSubmit}
				>
					{({isValid, dirty}) => (
						<Form autoComplete="off">
							<div className="form-field-cont">
								<Field className="form-field" name="email"/>
								<label htmlFor="Email">
									{emailError || "Your email"}
								</label>
							</div>
							<div className="remember-me-cont">
								<div className="checkbox-cont">
									<Field
										type="checkbox"
										name="isRememberMe"
									/>
									<span/>
								</div>
								<p className="form-rememberMe-text">
									Keep me signed in
								</p>
							</div>
							<button
								disabled={isPending}
								className={`submit 
                                ${isValid && dirty ? "submit-active" : ""}`}
								type="submit"
							>
								Next
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</Auth1Wrapper>
	)
}
export default AuthEmail
const Auth1Wrapper = styled.div<{ mainColor: string }>`
  background-color: rgb(33, 33, 33);
  display: flex;
  align-items: center;
  justify-content: center;

  .Auth1__container {
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .form-icon {
      border-radius: 50%;
      margin-bottom: 40px;

      span {
        position: relative;

        &::after {
          content: "";
          position: absolute;
          background-color: white;
          width: 150px;
          height: 150px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
        }

        img {
          z-index: 1;

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
          transition: 0.3s;
          overflow: visible;
          color: transparent;

          &:hover,
          &:focus {
            border: ${({mainColor}) => mainColor} 1px solid;
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
              content: "";
              background-color: transparent;
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
        font-family: Roboto, sans-serif;
        border-radius: 13px;
        font-size: ${Rem(20)};
        background-color: transparent;
        color: transparent;
        transition: 0.5s;
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
