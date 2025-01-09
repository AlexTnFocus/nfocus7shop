import { Locator, Page } from "@playwright/test";

export class CartPage{
    readonly page: Page;
    readonly couponField: Locator;
    readonly couponButton: Locator;
    readonly discountAmount: Locator;
    readonly subtotalAmount: Locator;
    readonly shippingAmount: Locator;
    readonly totalAmount


    constructor (page: Page){
        this.page = page;
        this.couponField = page.getByPlaceholder('Coupon code');
        this.couponButton = page.getByRole('button', { name: 'Apply coupon' });
        this.discountAmount = page.getByRole('cell', { name: /-£\d+(\.\d{1,2})? \[Remove\]/ });
        this.subtotalAmount = page.getByRole('row', { name: 'Subtotal £' }).locator('bdi');
        this.shippingAmount = page.getByText('Flat rate: £');
        this.totalAmount = page.locator("tr.order-total bdi:nth-child(1)");
    }

    async applyCouponCode(coupon){
        await this.couponField.fill(coupon);
        await this.couponButton.click();
    }

    async getPrice(rawText) {
        let output = await rawText.replace(/[^0-9.]/g, "");
        return output;
    }

    async getActualDiscount(_subtotal, _discount){
        const subtotal = parseFloat(_subtotal);
        const discount = parseFloat(_discount);
        return (subtotal - discount) / subtotal;
    }

    async getActualTotal(_subtotal, _discount, _shipping){
        const subtotal = parseFloat(_subtotal);
        const discount = parseFloat(_discount);
        const shipping = parseFloat(_shipping);

        return (subtotal - discount) + shipping;
    }
    
    async preserveNumbers(rawText) {
        let output = rawText.replace(/[^0-9.]/g, ""); // Removes anything that's not a digit or decimal point
        return output;
    }
    
    
}