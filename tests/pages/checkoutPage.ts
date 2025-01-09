import { Locator, Page } from "@playwright/test";

export class CheckoutPage{
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly billAddrOne: Locator;
    readonly billCity: Locator;
    readonly billPostcode: Locator;
    readonly billPhone: Locator; 
    readonly checkPaymentButton: Locator; 
    readonly placeOrderButton: Locator;
    readonly myAccountLink: Locator; 
    readonly checkoutOrderNum: Locator;

    constructor(page: Page){
        this.page = page;
        //this.firstNameField = page.getByRole('textbox', { name: 'First name *' });
        this.firstNameField = page.locator('#billing_first_name');
        this.lastNameField = page.locator('#billing_last_name');
        this.billAddrOne = page.getByRole('textbox', { name: 'Street address *' });
        this.billCity = page.getByRole('textbox', { name: 'Town / City *' });
        this.billPostcode = page.getByRole('textbox', { name: 'Postcode *' });
        this.billPhone = page.getByLabel('Phone *');
        this.checkPaymentButton = page.getByText('Check payments');
        this.placeOrderButton = page.getByRole('button', { name: 'Place order' });
    }

    async enterBillingDetails(firstName, lastName, streetAddr, townCity, postcode, phone){
        await this.firstNameField.clear();
        await this.lastNameField.clear();
        await this.billAddrOne.clear();
        await this.billCity.clear();
        await this.billPostcode.clear();
        await this.billPhone.clear();

        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.billAddrOne.fill(streetAddr);
        await this.billCity.fill(townCity);
        await this.billPostcode.fill(postcode);
        await this.billPhone.fill(phone);
        await this.checkPaymentButton.click();
        await this.placeOrderButton.click();
    }
}