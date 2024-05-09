// await expect(page.getByTestId("example")).toHaveAttribute("textContent");

// const locator = page.getByTestId("enquiryField");

// test("Test Actions", async ({ page }) => {
// 	await page.goto(enquireUrl);
// 	// Check if element with data-testid "emailLabel" has specific attribute
// 	await expect(page.getByTestId("emailLabel")).toHaveAttribute("data-type", "email");

// 	// Check if element with data-testid "emailLabel" contains specific text
// 	await expect(page.getByTestId("emailLabel")).toContainText("Email");

// 	// Check if element with data-testid "emailLabel" has specific style
// 	await expect(page.getByTestId("emailLabel")).toHaveStyle({ color: "blue" });

// 	// Check if element with data-testid "emailLabel" is disabled
// 	await expect(page.getByTestId("emailLabel")).toBeDisabled();

// 	// Check if element with data-testid "emailLabel" has specific attribute
// 	await expect(page.getByTestId("emailLabel")).toHaveAttribute("data-type", "email");

// 	// Check if element with data-testid "emailLabel" has specific attribute
// 	await expect(page.getByTestId("emailLabel")).toHaveAttribute("data-type", "email");

// 	// Check if element with data-testid "emailLabel" has specific attribute
// 	await expect(page.getByTestId("emailLabel")).toHaveAttribute("data-type", "email");

// 	await page.getByTestId("emailLabel").check();
// 	const emailLabel = await page.$eval(
// 		'[data-testId="emailLabel"]',
// 		label => label.textContent,
// 	);

// 	expect(emailLabel).toBe("Email");

// 	const inputType = await page.$eval('[data-testId="emailField"]', input => input.type);
// 	expect(inputType).toBe("email");

// 	expect(await page.getByTestId("nameLabel").check());
// 	await page.getByTestId("enquiryLabel").check();
// 	await page.getByTestId("submitEnquiryButton").check();

// });

// test("Verify menu option's item lists (On Hover)", async ({ page }) => {
// 	await page.goto(homeUrl);

// 	// DRE

// 	await page.click('[data-id="navMenuTraining"]');
// 	// Find the element you want to hover over
// 	const menuButton = await page.locator('[data-id="navMenuTraining"]');
// 	// Hover over the element
// 	await menuButton.hover();

// 	// Now, you can interact with the opened menu list - For example,  check if specific menu items are visible
// 	// Wait for the menu item to be visible
// 	// await page.waitForSelector('[data-id="menuItem"]');
// 	// // Assert that the menu item is visible
// 	// const menuItem = await page.locator('[data-id="trainingPrivatePilotLicense"]');
// 	// await expect(menuItem).toBeVisible();

// 	// await expect(page).toHaveURL('http://yourappurl.com/dashboard');
// 	// await page.fill('input[name="username"]', 'testuser');
// 	// await page.fill('input[name="password"]', 'password');
// 	// await page.click('text=Submit');
// });

// test("has title", async ({ page }) => {
// 	await page.goto("http://localhost:3000/");
// 	// Expect a title "to contain" a substring.
// 	await expect(page).toHaveTitle(/Helicopter Services/);
// });

// test("get started link", async ({ page }) => {
// 	await page.goto("http://localhost:3000/");

// 	// Click the get started link.
// 	await page.getByRole("link", { name: "Get started" }).click();

// 	// Expects page to have a heading with the name of Installation.
// 	await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
// });

// test("Validate Enquiry form page", async ({ page }) => {
// 	await page.goto("http://localhost:3000/");
// 	// await page.click('[data-id="navMenuHome"]');
// 	// await page.fill('input[name="username"]', 'testuser');
// 	// await page.fill('input[name="password"]', 'password');
// 	// await page.click('text=Submit');
// 	// await expect(page).toHaveURL('http://yourappurl.com/dashboard');
// });
