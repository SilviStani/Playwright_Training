import { Browser, Page, expect, test } from "@playwright/test";

(async () => {
    let browser: Browser;
    let page: Page;

    test.describe("Static Table Practice on Playwright Sandbox", () => {
        test("Static Table Practice", async ({ page }) => {
            await test.step("Loads Practice Page", async () => {
                await page.goto("");
            })
            await test.step("Static Table", async () => {
                const tableNames = await page.$$eval("h2:has-text('Tabla estática') + table tbody tr td:nth-child(2)", elements => elements.map(element => element.textContent))
                const table = page.locator("h2:has-text('Tabla estática')");

                const expectedNames = ["Messi", "Ronaldo", "Mbappe"];

                await table.scrollIntoViewIfNeeded();
                await test.info().attach("Table Names Screenshot", {
                    body: await page.screenshot(),
                    contentType: "image/png"
                })
                expect(tableNames).toEqual(expectedNames);
            })
        })
    })
    test.describe("Dynamic Table Practice on Playwright Sandbox", () => {
        test("Dynamic Table Practice", async ({ page }) => {
            await test.step("Loads Practice Page", async () => {
                await page.goto("");
            })
            await test.step("Dynamic Table", async () => {
                const table = page.locator("h2:has-text('Tabla dinámica')");
                await table.scrollIntoViewIfNeeded();

                const tableDynamic = await page.$$eval("h2:has-text('Tabla dinámica') + table tbody tr td", elements => elements.map(element => element.textContent))
                console.log(tableDynamic);

                await test.info().attach("Table Names Screenshot", {
                    body: await page.screenshot(),
                    contentType: "image/png"
                })

                await page.reload();

                const tableReloaded = await page.$$eval("h2:has-text('Tabla dinámica') + table tbody tr td", elements => elements.map(element => element.textContent))
                console.log(tableReloaded);
                await test.info().attach("Table Names Screenshot", {
                    body: await page.screenshot(),
                    contentType: "image/png"
                })
                expect(tableDynamic).not.toEqual(tableReloaded);
            })
        })

    })
    test.describe("Soft Assertion Practioce", () => {

        test.only("Soft Assertions Practice", async ({ page }) => {
            test.info().annotations.push({ type: "issue", description: "Revisar los nombres de los elementos, hay algunos typos" });
            await test.step("Loads Practice Page", async () => {
                await page.goto("");
            })

            await test.step("Soft Assertions", async ({ }) => {
                await expect.soft(page.getByText("Pissa 🍕"), "Revisar typo u otra falla en este elemento: Pizza").toBeVisible();
                await expect.soft(page.getByText("Hamburguesa 🍔"), "Revisar typo u otra falla en este elemento: Hamburguesa").toBeVisible();
                await expect.soft(page.getByText("Pastta 🍝"), "Revisar typo u otra falla en este elemento: Pasta").toBeVisible();
                await expect.soft(page.getByText("Helado 🍧"), "Revisar typo u otra falla en este elemento: Helado").toBeVisible();
                await expect.soft(page.getByText("Torta 🍰"), "Revisar typo u otra falla en este elemento: Torta").toBeVisible();
            })
        })

    })
})();