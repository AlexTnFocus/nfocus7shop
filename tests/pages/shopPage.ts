import { Locator, Page } from "@playwright/test";

export class ShopPage{
    readonly page: Page;
    readonly beltItem: Locator;


    constructor (page: Page){
        this.page = page;
        this.beltItem = page.getByLabel('Add “Belt” to your cart');
    }

    async addBeltToCart(){
        await this.beltItem.click();
    }
    
}