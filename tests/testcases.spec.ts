import { test, expect } from '@playwright/test';
import { MyAccountPage } from './pages/myAccountPage';
import { NavigationPage } from './pages/navigationPage';
import { ShopPage } from './pages/shopPage';
import { CartPage } from './pages/cartPage';
import { CheckoutPage } from './pages/checkoutPage';
import { OrderRecievedPage } from './pages/orderReceivedPage';
import { OrderPage } from './pages/orderPage';


    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.edgewordstraining.co.uk/demo-site/my-account/');
        const myAccountPage = new MyAccountPage(page);
        await myAccountPage.dismissBanner();
        //1- Log in to an account
        await myAccountPage.login('magmortar@pmail.com', 'octoberComic0n!?');
        console.log('Logged In');
        //2- Enter the shop
        const navigationPage = new NavigationPage(page);
        await navigationPage.goShop();
        console.log('Navigated to shop page');
        //3- Add a clothing item to the cart
        const shopPage = new ShopPage(page);
        await shopPage.addBeltToCart();
        console.log('Added belt item to cart');
        //4- View the cart
        await navigationPage.goCart();
        console.log('Navigated to cart page');  
    });

    test.afterEach(async ({ page }) => {
        //Finally, log out
        const myAccountPage = new MyAccountPage(page);
        const navigationPage = new NavigationPage(page);
        await navigationPage.goMyAccount();
        console.log('Navigated to my account page');
        await myAccountPage.logout();
        console.log('Logged out, end of test');
    });




    test('Test Case 1', async ({ page }) => {
        const myAccountPage = new MyAccountPage(page);
        const navigationPage = new NavigationPage(page);
        const cartPage = new CartPage(page);
        await cartPage.applyCouponCode('edgewords');
        console.log('Applied the coupon: edgewords');
        //6- Check that the coupon is valid for a 15% discount
        let rawText1 = await cartPage.discountAmount.textContent();
        let rawText2 = await cartPage.subtotalAmount.textContent();
        let rawText3 = await cartPage.shippingAmount.textContent();
        let discountAmount = await cartPage.getPrice(rawText1);
        let subtotalAmount = await cartPage.getPrice(rawText2);
        let shippingAmount = await cartPage.getPrice(rawText3);
        let actualDiscount = await cartPage.getActualDiscount(subtotalAmount, discountAmount);
        console.log('The expected discount is 15%, the actual discount is ' + (100 - (actualDiscount*100)) + '%');
        await expect(actualDiscount).toEqual(0.85);
        console.log('Discount is valid for 15 percent off');
        //7- Check that the total after shipping has been calculated correctly
        let rawText4 = await cartPage.totalAmount.textContent();
        let actualTotal = await cartPage.getActualTotal(subtotalAmount, discountAmount, shippingAmount);
        rawText4 = await cartPage.preserveNumbers(rawText4);
        console.log('The total after shipping is listed as £' + rawText4 + ' and the actual total after shipping is £' + actualTotal);
        await expect(actualTotal).toEqual(parseFloat(rawText4));
        console.log('The total after shipping is calculated correctly');
    }),  

    test('Test Case 2', async ({ page }) => {
        const myAccountPage = new MyAccountPage(page);
        const navigationPage = new NavigationPage(page);
        const cartPage = new CartPage(page);
        //5- Proceed to checkout
        await navigationPage.goCheckout();
        console.log('Navigated to checkout');
        //6- Enter Billing Details
        //7- Select “check payments” for payment method
        //8- Place the order
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.enterBillingDetails('John', 'Nameson', '1 Streetsville', 'Citytown', 'SA44 4NE', '01234567890');
        console.log('Entered billing details, clicked check payment and placed the order');
        //9- Capture the order number
        const orderRecievedPage = new OrderRecievedPage(page);
        let orderNum1 = await orderRecievedPage.orderNumber.textContent();
        orderNum1 = await cartPage.preserveNumbers(orderNum1);
        console.log('The order number for the placed order is #' + orderNum1);
        //10- Navigate to my account-> orders
        await navigationPage.goMyAccount();
        console.log('Navigated to my account');
        await myAccountPage.goOrders();
        console.log('Navigated to orders');
        //11- Check the same order appears
        const orderPage = new OrderPage(page);
        let orderNum2 = await orderPage.getOrderNumber();
        orderNum2 = await cartPage.preserveNumbers(orderNum2);
        console.log('The top order on the order history page is #' + orderNum2);
        await expect(orderNum1).toEqual(orderNum2);
        console.log('The order numbers match');
    });

