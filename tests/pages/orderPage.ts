import { Locator, Page } from "@playwright/test";

export class OrderPage{
    readonly page: Page;
    readonly orderNumber: Locator;


    constructor(page: Page){
        this.page = page;
        this.orderNumber = page.locator("tbody tr:nth-child(1) td:nth-child(1) a:nth-child(1)");
    }


    async getOrderNumber(){
        return this.orderNumber.textContent();
    }
}
