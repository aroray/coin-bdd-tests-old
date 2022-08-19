import Page from "./page";
import * as assert from "assert";

const Currency = require("../helper/Currency")

let currencyNames1 = [],
    currencyNames2 = []

class CryptoTable extends Page {
    get $cryptoTable() {
        return browser.$(`//div[contains(@class,'h7vnx2-1 bFzXgL')]/table`)
    }

    get $rowDropDown() {
        return browser.$(`[class='sc-16r8icm-0 sc-4r7b5t-1 entgiO'] div`)
    }

    get $filters() {
        return browser.$(`//div/button[contains(@class,'table-control-filter')]`)
    }

    get $filterAlgorithm() {
        return browser.$(`//span/button[contains(text(),'Algorithm')]`)
    }

    get oneMoreFilter() {
        return browser.$(`//button[text() = '1 More Filter' or text() = 'Add Filter']`)
    }

    get moreFilters() {
        return browser.$(`//h4[text()= 'More Filters']`)
    }

    get allCryptocurrenciesMoreFilters() {
        return browser.$(`//button[contains(@class,'cmc-filter-button')][text()='All Cryptocurrencies']`)
    }

    get $priceMoreFilters() {
        return browser.$(`//button[contains(@class,'cmc-filter-button')][text()='Price']`)
    }

    get $closeButtonMoreFilters() {
        return browser.$(`//button[contains(@class,'cmc-filter-button')][text()='Close']`)
    }

    get $showResultsButtonMoreFilters() {
        return browser.$(`//button[contains(@class,'cmc-filter-button')][text()='Apply Filter' or text()='Show results']`)
    }

    async $filterAlgorithmInput(filValue: string) {
        await browser.$(".cmc-input.fAWiaZ.ykm2vq-1").setValue(filValue)
    }

    async numberOfPagesAvailable() {
        let numOfPages = 1
        if (browser.$(`//div[contains(@class,'sc-4r7b5t-3 bvcQcm')]/div/ul/li[contains(@class,'next')]`).isDisplayed()) {
            const numOfPagesSt = await browser.$(`//div[contains(@class,'sc-4r7b5t-3 bvcQcm')]/div/ul/li[contains(@class,'next')]/preceding-sibling::li[1]`).getText()
            numOfPages = parseInt(numOfPagesSt)
        }
        return numOfPages
    }

    async filterAlgorithm(value: string) {
        await this.$filters.click();
        await this.$filterAlgorithm.waitForDisplayed({timeout: 3000})
        await this.$filterAlgorithm.click()
        await this.$filterAlgorithmInput(value)
        await browser.$(`//div[contains(@class,'sc-1cm3a78-0')]/div/ul/li[text()="${value}"]`).click()
    }

    async selectOneMoreFilter() {
        await this.oneMoreFilter.waitForDisplayed({timeout: 3000})
        await this.oneMoreFilter.click()
        await this.moreFilters.waitForDisplayed({timeout: 3000})
    }

    async openMoreFiltersWindow() {
        await this.selectOneMoreFilter()
    }

    async switchMinableButtonMOreFilters() {
        await browser.$(`label#mineable`).scrollIntoView()
        await browser.$(`label#mineable`).click()
    }

    async selectPriceRangeMoreFiltersOption(min: number, max: number) {
        await this.$priceMoreFilters.click()
        await browser.$(`//div[contains(@class, 'cmc-input-row')]/input[1]`).setValue(min)
        await browser.$(`//div[contains(@class, 'cmc-input-row')]/input[2]`).setValue(max)
    }

    async selectALlCryptoMoreFiltersOption(value: string) {
        await this.allCryptocurrenciesMoreFilters.click()
        await browser.$(`//button[contains(@class,'cmc-option-button')][text()='${value}']`).click()
    }

    async showsRows(rowsNumber: number) {
        await this.$rowDropDown.waitForDisplayed({timeout: 3000})
        await this.$rowDropDown.click()
        await browser.$(`//button[contains(@class,'x0o17e-0')][text()='${rowsNumber}']`).click();
    }

    async getColValuesForTable(rowsNumber: number) {
        await this.showsRows(rowsNumber)
        await console.log("Reading Table Rows Values")
        const tableRowsAr = await browser.$$(`//div[contains(@class,'h7vnx2-1 bFzXgL')]/table/tbody/tr`)
        const tableColAr = await browser.$$(`//div[contains(@class,'h7vnx2-1 bFzXgL')]/table/thead/tr/th`)
        let numOfRows = await tableRowsAr.length
        let numOfCol = await tableColAr.length
        await console.log("Number of rows are :" + numOfRows)
        await console.log("Number of columns are :" + numOfCol)
        let arr = []

        for (let i = 1; i < numOfRows; i++) {
            let currency = {
                number: "",
                name: "",
                price: "",
                marketCap: "",
                volume: ""
            }
            for (let j = 2; j < numOfCol; j++) {
                let cellVal = undefined
                try {
                    cellVal = await browser.$(`//div[contains(@class,'h7vnx2-1 bFzXgL')]/table/tbody/tr[${i}]/td[${j}]`).getText()
                } catch (e) {
                    cellVal = undefined
                }
                if (j === 2) currency.number = cellVal
                if (j === 3 && cellVal.includes("\n")) {
                    currency.name = cellVal.split("\n")[0]
                }
                if (j === 4) currency.price = cellVal
                if (j === 8 && cellVal.includes("$")) {
                    currency.marketCap = cellVal.split("$")[1]
                }
                if (j === 9 && cellVal.includes("$")) {
                    currency.volume = cellVal.split("$")[1]
                }
            }
            arr.push(currency)
            currencyNames1.push(currency.name)
        }
    }

    async noteCurrentPriceNames() {
        currencyNames2 = [...currencyNames1]
        currencyNames1 = []
        await console.log(`Current Table Currency names are : ${JSON.stringify(currencyNames2)}`)
    }

    async verifyCommonCurrencyName() {
        let isAnyMatch = false;
        for (let i = 0; i < currencyNames2.length; i++) {
            for (let j = 0; j < currencyNames1.length; j++) {
                if (await currencyNames2[i] === currencyNames1[j]) {
                    isAnyMatch = true
                }
            }
        }
        await assert(isAnyMatch, "No match found")
    }
}

export default new CryptoTable()
