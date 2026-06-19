import { test, Browser, Page, expect } from '@playwright/test';

(async () => {
    let browser: Browser;
    let page: Page;

    test.describe('Free Range Tests', () => {
        const sections = [
            { name: 'Experiencia real en QA', url: '/experiencia-en-qa', expectedTitle: 'Obtené experiencia real' },
            { name: 'Cursos', url: '/cursos', expectedTitle: 'Cursos' },
            { name: 'Mentorías', url: '/mentoria-1-1-con-pato', expectedTitle: 'Mentoría personalizada de avance de carrera para testers de software'},
            { name: 'Eventos', url: '/eventos-en-vivo', expectedTitle: 'Eventos' },
            { name: 'Blog', url: '/blog', expectedTitle: 'Free Range Testers' },
            { name: 'Recursos', url: '/recursos', expectedTitle: 'Recursos' },
            // Add more sections if necessary
        ];

        for(const section of sections)
            {
                test(`Validate Link redirection "${section.name}" works as expected`, async ({ page }) => {
                    await test.step("Being in main page", async () => {
                        await page.goto('');
                        await expect(page).toHaveTitle('Free Range Testers');
                    });
        
                    await test.step(`When clicking on ${section.name} link`, async () => {
                        page.getByTestId('header-container').
                            getByRole('link', { name: section.name, exact: true }).click();
                        await page.waitForURL(`**${section.url}`);
                    });
        
                    await test.step(`redirected to '${section.name}' section`, async () => {
                        await expect(page).toHaveTitle(section.expectedTitle);
                    });
                });
            }
    });
})();

function getByTestId(arg0: string) {
    throw new Error('Function not implemented.');
}
