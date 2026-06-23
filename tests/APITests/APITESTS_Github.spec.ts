import { test, expect } from '@playwright/test';

const REPO = 'Playwright_Training_Create';
const USER = 'SilviStani';

test.beforeAll(async ({ request }) => {
    const response = await request.post('user/repos', {
        data: {
            name: REPO
        }
    });
    console.log(`Repo created: ${await response.json()}`);
    expect(response.ok()).toBeTruthy();
})


test('I can create a bug in the repo', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Bug] This is a demo bug',
            body: 'This is a demo bug description.',
        }
    });
    expect(newIssue.ok()).toBeTruthy();

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Bug] This is a demo bug',
        body: 'This is a demo bug description.'
    }));
});

test('I can create a feature request', async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] I want it to make ice cream',
            body: 'It would be great if the repo could make ice cream 🍦',
        }
    });
    expect(newIssue.ok()).toBeTruthy();

    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Feature] I want it to make ice cream',
        body: 'It would be great if the repo could make ice cream 🍦'
    }));
});

test.afterAll(async ({ request }) => {
    const response = await request.delete(`/repos/${USER}/${REPO}`);
    expect(response.ok()).toBeTruthy();
});