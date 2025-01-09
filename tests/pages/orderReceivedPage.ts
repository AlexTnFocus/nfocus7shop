import { Locator, Page } from "@playwright/test";

export class OrderRecievedPage{
    readonly page: Page;
    readonly orderNumber: Locator;


    constructor(page: Page){
        this.page = page;
        this.orderNumber = page.getByText('Order number:');
    }
}