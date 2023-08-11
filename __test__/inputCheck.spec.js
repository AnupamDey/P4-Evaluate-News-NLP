import { isValid } from "../src/client/js/inputChecker";

describe("UTC #2 - URL validation - Pass", () => {
	let url = "https://www.meaningcloud.com/"
	test("Return true", () => {
		const res = isValid(url)
		expect(res).toBeDefined()
		expect(res).toBeTruthy()
	})
})

describe("UTC #3 - URL validation - Fail", () => {
	let url = "Invalid URL input"
	test("Return false", () => {
		const res = isValid(url)
		expect(res).toBeDefined()
		expect(res).toBeFalsy()
	})
})