import Page from "./page";

class HomePage extends Page {
    get $cryptoPriceTableHeader() {
        return browser.$(`//h1[contains(text(), "Today's Cryptocurrency Prices by Market Cap")]`)
    }

    async waitForCryptoPriceTable() {
        await this.waitForElementToBeVisible(await this.$cryptoPriceTableHeader)
    }

    async removeHomePagePopUps() {
        const searchFeatureCross = await browser.$('div.gv-close')
        if (await searchFeatureCross.isDisplayed()) {
            await searchFeatureCross.click()
        }
        const cookiesBannerCross = await browser.$('div.cmc-cookie-policy-banner__close')
        if (await cookiesBannerCross.isDisplayed()) {
            await cookiesBannerCross.click()
        }
        const signupTrackCrypto = await browser.$('div.enlptp-0.hYAjiB.popped')
        if (await signupTrackCrypto.isDisplayed()) {
            await browser.$(`div.buttons > button:nth-child(2)`).click()
        }
    }
}

export default new HomePage()