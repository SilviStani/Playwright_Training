import {test, Browser, Page, expect} from '@playwright/test';

(async () => {
    let browser: Browser;
    let page: Page;

    test.describe('Free Range Tests', () => {
        test("Links redirection as expected", async ({page}) => {
            await test.step("Being in main page", async () => {
                await page.goto('https://www.freerangetesters.com/');
                await expect(page).toHaveTitle('Free Range Testers');
            });

            await test.step("When clicking on Courses link", async () => {
                page.getByTestId('header-container').
                getByRole('link', { name: 'Cursos', exact: true }).click();
                await page.waitForURL('**/cursos');
            });

            await test.step("redirected to 'Courses' section", async () => {
                await expect(page).toHaveTitle('cursos');
            });
        });
    });
})();

function getByTestId(arg0: string) {
    throw new Error('Function not implemented.');
}
