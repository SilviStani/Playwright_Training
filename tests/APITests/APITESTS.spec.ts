import { test, expect } from '@playwright/test';

const REPO = "Playwright_Training";
const USER = "SilviStani";

test.beforeAll(async ({ request }) => {
    const response = await request.post('user/repos', {
        data: {
            name: REPO
        }
    });
    console.log(`Repo created: ${await response.json()}`);
    expect(response.ok()).toBeTruthy();
})
test("Create an Issue on Github repository", async ({ request }) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: "[BUG] New Issue from Playwright",
            body: "This is a new bug/issue created from Playwright test"
        }
    });

    expect(newIssue.status()).toBe(201);
    console.log("Issue created:", await newIssue.json());

    // Pequeño delay para que GitHub sincronice
    await new Promise(resolve => setTimeout(resolve, 1000));

    const issues = await request.get(`/repos/${USER}/${REPO}/issues?state=all`);
    const issuesData = await issues.json();
    console.log("Issues found:", issuesData);
    console.log("Total issues:", issuesData.length);

    expect(issuesData).toContainEqual(expect.objectContaining({
        title: "[BUG] New Issue from Playwright",
        body: "This is a new bug/issue created from Playwright test"
    }));
})


test("Create a Feature on Github repository", async({request}) => {
    const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`,{
        data:{
            title: "[Feature] New Issue from Playwright",
            body: "This is a new feature created from Playwright test"
        }
    }); 
    
    expect(newIssue.status()).toBe(201);
    
    const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: "[Feature] New Issue from Playwright",
        body: "This is a new feature created from Playwright test"
    }));
})
test.afterAll(async ({ request }) => {
    const response = await request.delete(`/repos/${USER}/${REPO}`);
    expect(response.ok()).toBeTruthy();
});
/*
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
*/