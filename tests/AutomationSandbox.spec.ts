import { Browser, Page, expect, test } from "@playwright/test";

(async () => {
    let browser: Browser;
    let page: Page;

    test.describe("Sandbox tests practice page", () => {
        test("Dropdown Practice", async ({ page }) => {
            await test.step("Loads the practice page", async () => {
                await page.goto("https://thefreerangetester.github.io/sandbox-automation-testing/");
            })

            await test.step("Sandbox page loads", async () => {
                const sportsOptions = [
                    { sport: 'Fútbol' },
                    { sport: 'Tennis' },
                    { sport: 'Basketball' },
                    { sport: 'Natación' },
                ];

                await page.getByLabel("Dropdown").click();

                for (const option of sportsOptions) {
                    try {
                        await test.step(`Select ${option.sport} from the dropdown`, async () => {
                            await page.selectOption("#formBasicSelect", { label: option.sport });
                            console.log(`Selected option: ${option.sport}`);
                        });
                    } catch (error) {
                        console.error(`Error selecting option "${option.sport}":`, error);
                    }
                    /*
                    training option
                    const element = await page.$(`select#formBasicSelect > option:is(:text("${option.sport}"))`);
                    if (element) {
                            console.log(`option: ${option.sport} is present`);
                        });
                    } else {
                        throw new Error(`Option "${option.sport}" not found in the dropdown`);
                }
                */
                }
            });
        })
    })
})();