import { Locator, Page } from "@playwright/test";

export class NavigationPage{
    readonly page: Page;
    readonly myAccountLink: Locator;
    readonly cartLink: Locator;
    readonly shopLink: Locator;
    readonly checkoutLink: Locator;

    constructor (page: Page){
        this.page = page;
        this.myAccountLink = page.locator('#menu-item-46').getByRole('link', { name: 'My account' });
        this.cartLink = page.getByRole('link', { name: 'View cart ' });
        this.shopLink = page.locator('#menu-item-43').getByRole('link', { name: 'Shop' });
        this.checkoutLink = page.locator('#menu-item-45').getByRole('link', { name: 'Checkout' })
    }

    async goMyAccount(){
        await this.myAccountLink.click();
    }
    async goCart(){
        await this.cartLink.click();
    }
    async goShop(){
        await this.shopLink.click();
    }
    async goCheckout(){
        await this.checkoutLink.click();
    }
}