import Page from "../page-objects/page";
import {Given, When, Then} from "@wdio/cucumber-framework";
import HomePage from "../page-objects/home.page";
import CryptoTable from "../page-objects/cryptoTable";

const pages: any = {
    home: HomePage,
    cryptoTable: CryptoTable
}

When(/^I can see cryptocurrency price table$/, async function () {
    await pages["home"].waitForCryptoPriceTable()
});

When(/^I filter table to (\w+) rows$/, async function (rowsNumber: number) {
    await pages["home"].waitForCryptoPriceTable()
    await pages["cryptoTable"].showsRows(rowsNumber)
    await pages["cryptoTable"].$cryptoTable.scrollIntoView()
});

When(/^I browse crypto table and capture page contents$/, async function () {
    //await browser.pause(1000)
    //await pages["cryptoTable"].numberOfPagesAvailable()
    await pages["cryptoTable"].getColValuesForTable(20)
});

When(/^I note currency names from current table$/, async function () {
    await pages["cryptoTable"].noteCurrentPriceNames()
});

When(/^I filter Algorithm crypto table with value (.*)$/, async function (filterValue) {
    await pages["cryptoTable"].filterAlgorithm(filterValue)
    await browser.pause(2000)
});

When(/^I open More Filters window$/, async function () {
    await pages["cryptoTable"].openMoreFiltersWindow()
});

When(/^I toggle Mineable option in More Filters$/, async function () {
    await pages["cryptoTable"].switchMinableButtonMOreFilters()
});

When(/^I select option (.*) for Cryptocurrencies in More Filters$/, async function (value: string) {
    await pages["cryptoTable"].selectALlCryptoMoreFiltersOption(value)
});

When(/^I select minimum price to (\w+) and maximum price to (\w+) in More Filters$/, async function (minPrice: number, maxPrice: number) {
    await pages["cryptoTable"].selectPriceRangeMoreFiltersOption(minPrice, maxPrice)
});

When(/^I close More Filters window$/, async function () {
    await pages["cryptoTable"].$showResultsButtonMoreFilters.click()
    if (await pages["cryptoTable"].$showResultsButtonMoreFilters.isDisplayed()) {
        await pages["cryptoTable"].$showResultsButtonMoreFilters.click()
    }
    await browser.waitUntil(async () => (!await pages["cryptoTable"].moreFilters.isDisplayed()))
});

Then(/^I do see common currency name with noted ones in the new list$/, async function () {
    await pages["cryptoTable"].verifyCommonCurrencyName()
});

