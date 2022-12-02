export const ParseSearchString = (searchString: string) => {
	let email
	let firstName
	let lastName

	if (searchString.includes("@")) {
		email = searchString
	} else {
		const splittedString = searchString.split(" ")
		firstName = splittedString[0]
		lastName = splittedString[1]
	}
	return {
		email: email ? email : null,
		firstName: firstName ? firstName : null,
		lastName: lastName ? lastName : null
	}
}
