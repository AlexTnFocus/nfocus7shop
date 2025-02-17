import { expect } from '@playwright/test';
import { MyAccountPage } from './pages/myAccountPage';
import { NavigationPage } from './pages/navigationPage';
import { ShopPage } from './pages/shopPage';
import { CartPage } from './pages/cartPage';
import { CheckoutPage } from './pages/checkoutPage';
import { OrderRecievedPage } from './pages/orderReceivedPage';
import { OrderPage } from './pages/orderPage';
import { test as base } from '@playwright/test';


    type MyFixtures = {
        cartPage: CartPage;
        navigationPage: NavigationPage;
        orderRecievedPage: OrderRecievedPage;
        checkoutPage: CheckoutPage;
        myAccountPage: MyAccountPage;
        orderPage: OrderPage;
    };

    export const test = base.extend<MyFixtures>({
        cartPage: async ({page}, use) =>{
            //Set up fixture
            await page.goto('https://www.edgewordstraining.co.uk/demo-site/my-account/');   //baseURL
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
            console.log('Navigated to cart page');  // put lines 12 to 28 within each test, then work to implement fixtures
            const cartPage = new CartPage(page);
            
            //Use statement below
            await use(cartPage);

            //Finally, log out
            await navigationPage.goMyAccount();
            console.log('Navigated to my account page');
            await myAccountPage.logout();
            console.log('Logged out, end of test');
        },
        navigationPage: async ({page}, use) =>{
            const navigationPage = new NavigationPage(page);
            await use(navigationPage);
        },
        orderRecievedPage: async ({page}, use) =>{
            const orderRecievedPage = new OrderRecievedPage(page);
            await use(orderRecievedPage);
        },
        checkoutPage: async ({page}, use) =>{
            const checkoutPage = new CheckoutPage(page);
            await use(checkoutPage);
        },
        myAccountPage: async ({page}, use) =>{
            const myAccountPage = new MyAccountPage(page);
            await use(myAccountPage);
        },
        orderPage: async ({page}, use) =>{
            const orderPage = new OrderPage(page);
            await use(orderPage);
        }

    });
    export { expect } from '@playwright/test';

    // test.beforeEach(async ({ page }) => {
    //     await page.goto('https://www.edgewordstraining.co.uk/demo-site/my-account/');   //baseURL
    //     const myAccountPage = new MyAccountPage(page);
    //     await myAccountPage.dismissBanner();
    //     //1- Log in to an account
    //     await myAccountPage.login('magmortar@pmail.com', 'octoberComic0n!?');
    //     console.log('Logged In');
    //     //2- Enter the shop
    //     const navigationPage = new NavigationPage(page);
    //     await navigationPage.goShop();
    //     console.log('Navigated to shop page');
    //     //3- Add a clothing item to the cart
    //     const shopPage = new ShopPage(page);
    //     await shopPage.addBeltToCart();
    //     console.log('Added belt item to cart');
    //     //4- View the cart
    //     await navigationPage.goCart();
    //     console.log('Navigated to cart page');  // put lines 12 to 28 within each test, then work to implement fixtures
    // });

    // test.afterEach(async ({ page }) => {
    //     //Finally, log out
    //     const myAccountPage = new MyAccountPage(page);
    //     const navigationPage = new NavigationPage(page);
    //     await navigationPage.goMyAccount();
    //     console.log('Navigated to my account page');
    //     await myAccountPage.logout();
    //     console.log('Logged out, end of test');
    // });




    test('Test Case 1', async ({ cartPage}, testInfo) => {     //add cartPage instead of Page, implement POM that way
        //const cartPage = new CartPage(page);        
        await cartPage.applyCouponCode('edgewords');
        console.log('Applied the coupon: edgewords');
        //6- Check that the coupon is valid for a 15% discount
        let discountRawText = await cartPage.discountAmount.textContent();
        let subtotalRawText = await cartPage.subtotalAmount.textContent();
        let shippingRawText = await cartPage.shippingAmount.textContent();
        let discountAmount = await cartPage.getPrice(discountRawText);
        let subtotalAmount = await cartPage.getPrice(subtotalRawText);
        let shippingAmount = await cartPage.getPrice(shippingRawText);
        let actualDiscount = await cartPage.getActualDiscount(subtotalAmount, discountAmount);
        console.log('The expected discount is 15%, the actual discount is ' + (100 - (actualDiscount*100)) + '%');
        //await page.screenshot({path: 'couponSS.png', fullPage: true});
        //await testInfo.attach('Screenshot of after coupon code is applied', {path: 'couponSS.png'});
        await expect(actualDiscount).toEqual(0.85);
        console.log('Discount is valid for 15 perce nt off');
        //7- Check that the total after shipping has been calculated correctly
        let totalRawText = await cartPage.totalAmount.textContent();
        let actualTotal = await cartPage.getActualTotal(subtotalAmount, discountAmount, shippingAmount);
        let totalAmount = await cartPage.preserveNumbers(totalRawText);
        console.log('The total after shipping is listed as £' + totalAmount + ' and the actual total after shipping is £' + actualTotal);
        //await page.screenshot({path: 'totalCartValue.png', fullPage: true});
        //await testInfo.attach('Screenshot of the shipping, subtotal and discount costs', {path: 'totalCartValue.png'});
        await expect(actualTotal).toEqual(parseFloat(totalAmount));
        console.log('The total after shipping is calculated correctly');
    }),  

    test('Test Case 2', async ({ cartPage, navigationPage, orderRecievedPage, checkoutPage, myAccountPage, orderPage }, testInfo) => {
        // const myAccountPage = new MyAccountPage(page);
        // const navigationPage = new NavigationPage(page);
        // const cartPage = new CartPage(page);
        //5- Proceed to checkout
        await navigationPage.goCheckout();
        console.log('Navigated to checkout');
        //6- Enter Billing Details
        //7- Select “check payments” for payment method
        //8- Place the order
        //const checkoutPage = new CheckoutPage(page);
        await checkoutPage.enterBillingDetails('John', 'Nameson', '1 Streetsville', 'Citytown', 'SA44 4NE', '01234567890');
        console.log('Entered billing details, clicked check payment and placed the order');
        //9- Capture the order number
        let orderNumFromOrder = await orderRecievedPage.orderNumber.textContent();
        orderNumFromOrder = await cartPage.preserveNumbers(orderNumFromOrder);
        console.log('The order number for the placed order is #' + orderNumFromOrder);
        //await page.screenshot({path: 'orderNum1.png', fullPage: true});
        //await testInfo.attach('Screenshot of the order number generated by placing an order', {path: 'orderNum1.png'});
        //10- Navigate to my account-> orders
        await navigationPage.goMyAccount();
        console.log('Navigated to my account');
        await myAccountPage.goOrders();
        console.log('Navigated to orders');
        //11- Check the same order appears
        let orderNumFromHistory = await orderPage.getOrderNumber();
        orderNumFromHistory = await cartPage.preserveNumbers(orderNumFromHistory);
        console.log('The top order on the order history page is #' + orderNumFromHistory);
        //await page.screenshot({path: 'orderNum2.png', fullPage: true});
        //await testInfo.attach('Screenshot of the order history', {path: 'orderNum2.png'});
        expect(orderNumFromOrder).toEqual(orderNumFromHistory);
        console.log('The order numbers match');
    });


