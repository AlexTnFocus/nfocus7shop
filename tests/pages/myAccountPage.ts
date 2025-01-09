import { Locator, Page } from "@playwright/test";

export class MyAccountPage{
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly dismissButton: Locator;
    readonly logoutButton: Locator;
    readonly orderLink: Locator;

    constructor (page: Page){
        this.page = page;
        this.usernameField = page.getByLabel('Username or email address *');
        this.passwordField = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.dismissButton = page.getByRole('link', { name: ' Dismiss' });
        this.logoutButton = page.getByRole('link', { name: 'Log out' });
        this.orderLink = page.getByRole('link', { name: ' Orders' });
    }

    async login(username, password){
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
    async dismissBanner(){
        await this.dismissButton.click();
    }
    async logout(){
        await this.logoutButton.click();
    }
    async goOrders(){
        await this.orderLink.click();
    }
}