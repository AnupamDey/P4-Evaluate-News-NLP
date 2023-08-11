import { handleSubmit } from "../src/client/js/formHandler";

describe('UTC #1 - Submit Form', () => {
	test('testing form submit', () => {
			expect(handleSubmit).toBeDefined();
	});
})