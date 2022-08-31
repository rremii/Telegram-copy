import "@testing-library/jest-dom"
import {screen} from "@testing-library/react"
import AuthBio from "../views/auth-bio"
import {renderWithProviders} from "../utils/test-utils"
import userEvent from "@testing-library/user-event"

describe("AuthBio component", () => {
	it("should render the component", function () {
		renderWithProviders(<AuthBio/>)
		expect(
			screen.getByText(
				/please enter your name and add a profile picture/i
			)
		).toBeInTheDocument()
	})
	it("should type user name, submit the form,set data to state", async function () {
		const {store} = renderWithProviders(<AuthBio/>)
		const nameInput = screen.getByPlaceholderText(/first name/i)
		await userEvent.type(nameInput, "Artem")
		expect(nameInput).toHaveValue("Artem")

		const submitBtn = screen.getByRole("button")
		await userEvent.click(submitBtn)

		const state = store?.getState()
		expect(state.Auth.userBio.firstName).toBe("Artem")
	})
})
