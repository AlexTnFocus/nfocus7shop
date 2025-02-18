import { Locator, Page } from "@playwright/test";

export class HelperLib{
    readonly page: Page;

    constructor (page: Page){
        this.page = page;
    }

    async preserveNumbers(rawText) {
        let output = rawText.replace(/[^0-9.]/g, ""); // Removes anything that's not a digit or decimal point
        return output;
    }
}