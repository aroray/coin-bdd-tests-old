export default class Page {
    constructor() {
    }
    async navigateTo(pageName:string) {
        // @ts-ignore
        const targetPageUrl = `${browser.config.baseUrl}${browser.config.environmentSetup.pagesPaths[pageName]}`
        await console.log("Target url is :" + targetPageUrl)
        browser.url(targetPageUrl)
    }

    async waitForElementToBeVisible(element:WebdriverIO.Element) {
        await browser.waitUntil(async () => await (element.isDisplayed()),
            // @ts-ignore
            {timeout: browser.config.environmentSetup.ajaxTimeout, timeoutMsg: `Element with selector '${element}' is NOT visible`})
    }

    async waitForElementToBeInVisible(element:WebdriverIO.Element) {
        await browser.waitUntil(async () => !await element.isDisplayed(),
            // @ts-ignore
            {timeout: browser.config.environmentSetup.ajaxTimeout, timeoutMsg: `Element with selector '${element}' still visible`})
    }

    async scrollPageToElement(element:WebdriverIO.Element) {
        const x = await element.getLocation('x')
        await browser.execute(`window.scrollTo(${x}, 0);`);
    }

}