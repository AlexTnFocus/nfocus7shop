import { test, expect } from '@playwright/test';
import { MyAccountPage } from './pages/myAccountPage';
import { NavigationPage } from './pages/navigationPage';
import { ShopPage } from './pages/shopPage';
import { CartPage } from './pages/cartPage';


    test('Test Case 1', async ({ page }) => {
        //Setup
        await page.goto('https://www.edgewordstraining.co.uk/demo-site/my-account/');
        const myAccountPage = new MyAccountPage(page);
        await myAccountPage.dismissBanner();
        //1- Log in to an account
        await myAccountPage.login('magmortar@pmail.com', 'octoberComic0n!?');
        //2- Enter the shop
        const navigationPage = new NavigationPage(page);
        await navigationPage.goShop();
        //3- Add a clothing item to the cart
        const shopPage = new ShopPage(page);
        await shopPage.addBeltToCart();
        //4- View the cart
        await navigationPage.goCart();
        //5- Apply a coupon 'edgewords'
        const cartPage = new CartPage(page);
        await cartPage.applyCouponCode('edgewords');
        //6- Check that the coupon is valid for a 15% discount
        let rawText1 = await cartPage.discountAmount.textContent();
        let rawText2 = await cartPage.subtotalAmount.textContent();
        let rawText3 = await cartPage.shippingAmount.textContent();
        let discountAmount = await cartPage.getPrice(rawText1);
        let subtotalAmount = await cartPage.getPrice(rawText2);
        let shippingAmount = await cartPage.getPrice(rawText3);
        let actualDiscount = await cartPage.getActualDiscount(subtotalAmount, discountAmount);
        await expect(actualDiscount).toEqual(0.85);
        //7- Check that the total after shipping has been calculated correctly
        let rawText4 = await cartPage.totalAmount.textContent();
        let actualTotal = await cartPage.getActualTotal(subtotalAmount, discountAmount, shippingAmount);
        rawText4 = await cartPage.preserveNumbers(rawText4);
        await expect(actualTotal).toEqual(parseFloat(rawText4));
        //8- Log out
        await navigationPage.goMyAccount();
        await myAccountPage.logout();
    }),  

    test('Test Case 2', async ({ page }) => {
        //Setup
        await page.goto('https://www.edgewordstraining.co.uk/demo-site/my-account/');
        const myAccountPage = new MyAccountPage(page);
        await myAccountPage.dismissBanner();
        //1- Log in to an account
        await myAccountPage.login('magmortar@pmail.com', 'octoberComic0n!?');
        //2- Enter the shop
        const navigationPage = new NavigationPage(page);
        await navigationPage.goShop();
        //3- Add a clothing item to the cart
        const shopPage = new ShopPage(page);
        await shopPage.addBeltToCart();
        //4- View the cart
        await navigationPage.goCart();
        //5- Proceed to checkout

        //6- Enter Billing Details
        //7- Select “check payments” for payment method
        //8- Place the order
        //9- Capture the order number
        //10- Navigate to my account-> orders
        //11- Check the same order appears
        //12- Logout


    });

