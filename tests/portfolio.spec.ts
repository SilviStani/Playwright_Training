import { test, Browser, Page, expect } from '@playwright/test';

(async () => {
    let browser: Browser;
    let page: Page;

    test.describe('Portfolio Tests', () => {
        const headerLinks = [
            { locator: "logo-link", name: 'silvina.dev', url: 'https://silvina-portfolio.vercel.app/', expectedTitle: 'Silvina Staniszewski · Web Developer & QA Automation Engineer' },
            { locator: "nav-link-about", name: 'About', url: '/#about', expectedTitle: 'Silvina Staniszewski · Web Developer & QA Automation Engineer' },
            { locator: "nav-link-projects", name: 'Projects', url: '/projects', expectedTitle: 'Projects & Portfolio | Silvina Dev - Web Developer & QA Automation' },
            { locator: "nav-link-qa", name: 'QA Automation', url: '/projects', expectedTitle: 'Projects & Portfolio | Silvina Dev - Web Developer & QA Automation' },
            { locator: "nav-link-skills", name: 'Skills', url: '/#skills', expectedTitle: 'Silvina Staniszewski · Web Developer & QA Automation Engineer' },
            // Add more headerLinks if necessary
        ];

        for (const link of headerLinks) {
            test(`Validate Link redirection "${link.name}" works as expected`, async ({ page }) => {
                await test.step("Being in main page", async () => {
                    await page.goto('https://silvina-portfolio.vercel.app/');
                    const isTitleCorrect = await page.title() === 'Silvina Staniszewski · Web Developer & QA Automation Engineer';
                    await expect(page).toHaveTitle('Silvina Staniszewski · Web Developer & QA Automation Engineer');
                    console.log(isTitleCorrect ? `Current Title: ${await page.title()}` : "Title is not correct");
                });

                await test.step(`When clicking on ${link.name} link`, async () => {
                    await page.getByTestId(`${link.locator}`).click();
                    await page.waitForURL(`**${link.url}`);
                    const isUrlCorrect = page.url().includes(link.url);
                    console.log(isUrlCorrect ? `Current URL: ${page.url()} is Correct` : "URL is not correct");
                });
            });
        }
    });
})();