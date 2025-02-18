import { test, expect } from '@playwright/test';
import { MyAccountPage } from './pages/myAccountPage';
import { NavigationPage } from './pages/navigationPage';
import { ShopPage } from './pages/shopPage';
import { CartPage } from './pages/cartPage';
import { CheckoutPage } from './pages/checkoutPage';
import { OrderRecievedPage } from './pages/orderReceivedPage';
import { OrderPage } from './pages/orderPage';
import { HelperLib } from './pages/helperlib';

test('Check that the past three orders in the order history have sequential numbering', async ({ page }) => {
    await page.goto('https://www.edgewordstraining.co.uk/demo-site/my-account/');
    const myAccountPage = new MyAccountPage(page);
    await myAccountPage.dismissBanner();        //Dismisses the banner that appears at the bottom of the page as it can interfere with selecting elements
    //1. Log in
    await myAccountPage.login('magmortar@pmail.com', 'octoberComic0n!?');       //Logs the user in
    console.log('Logged In');
    //2. Navigate to order history
    await myAccountPage.goOrders();         //Navigates to the My Account -> Orders page
    //3. Fetch the last three order numbers
    //Consolidate this step to use a function for fetching items from the order history table to cut down on code
    //
    const helperLib = new HelperLib(page);
    let orderNum1 = await page.locator("tbody tr:nth-child(1) td:nth-child(1) a:nth-child(1)").textContent();
    orderNum1 = await helperLib.preserveNumbers(orderNum1);
    let orderInt1 = await Number(orderNum1);
    console.log(orderInt1);
    let orderNum2 = await page.locator("tbody tr:nth-child(2) td:nth-child(1) a:nth-child(1)").textContent();
    orderNum2 = await helperLib.preserveNumbers(orderNum2);
    let orderInt2 = await Number(orderNum2);
    console.log(orderInt2);
    let orderNum3 = await page.locator("tbody tr:nth-child(3) td:nth-child(1) a:nth-child(1)").textContent();
    orderNum3 = await helperLib.preserveNumbers(orderNum3);
    let orderInt3 = await Number(orderNum3);
    console.log(orderInt3);
    //4. Check that the order numbers use a sequential numbering system
    await expect(orderInt1).toEqual(orderInt2 + 1);
    //5. Navigate to my account
    const navigationPage = new NavigationPage(page);
    await navigationPage.goMyAccount();
    //6. Finally, logout
    await myAccountPage.logout();
});

