import { test, expect } from '@playwright/test';
import { MyAccountPage } from './pages/myAccountPage';
import { NavigationPage } from './pages/navigationPage';
import { ShopPage } from './pages/shopPage';
import { CartPage } from './pages/cartPage';
import { CheckoutPage } from './pages/checkoutPage';
import { OrderRecievedPage } from './pages/orderReceivedPage';
import { OrderPage } from './pages/orderPage';

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
    let orderNum1 = page.locator("tbody tr:nth-child(1) td:nth-child(1) a:nth-child(1)");
    let orderNum2 = page.locator("tbody tr:nth-child(1) td:nth-child(1) a:nth-child(1)");
    //4. Check that the order numbers use a sequential numbering system
    //5. Navigate to my account
    //6. Finally, logawait page.getByRole('link', { name: ' Dismiss' }).click();
    await page.getByLabel('Username or email address *').click();
    await page.getByLabel('Username or email address *').click();
    await page.locator('#password').click();
    await page.getByRole('link', { name: ' Orders' }).click();
    await page.getByRole('cell', { name: 'Order' }).click();
    await page.getByRole('cell', { name: '#15587' }).click();
    await page.getByRole('cell', { name: '#15586' }).click();
    await page.getByRole('cell', { name: '#15570' }).click();

});

