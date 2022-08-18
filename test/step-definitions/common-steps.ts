import Page from "../page-objects/page";
import HomePage from "../page-objects/home.page";
import CryptoTable from "../page-objects/cryptoTable";
import {Given, When, Then} from "@wdio/cucumber-framework";

const page = new Page()

const pages: any = {
    home: HomePage,
    cryptoTable: CryptoTable
}

Given(/^I reset the webcontainer$/, async function () {
    const currentSession = await browser.sessionId;
    await console.log(`current sessionId = ${currentSession}`);
    await browser.waitUntil(async () => await (currentSession && true),
        {timeout: 30000, timeoutMsg: `Browse sessionId did not update within ${30000} seconds`});
    await browser.maximizeWindow();
})

When(/^I goto "(.*)" page$/, async function (pageName) {
    await page.navigateTo(pageName);
});

When(/^I goto LANDING page$/, async function () {
    await page.navigateTo("LANDING");
    await pages["home"].waitForCryptoPriceTable()
});

When(/^I remove any popup in homepage$/, async function () {
    await pages["home"].waitForCryptoPriceTable()
    await pages["home"].removeHomePagePopUps()

});